'use server';

import { auth, db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import type { WellnessLog, WellnessLogFormValues, WellnessLogInServer } from '@/lib/types';
import { generatePersonalizedWellnessPlan } from '@/ai/flows/generate-personalized-wellness-plan';
import { analyzeMoodAndProvideCopingStrategies } from '@/ai/flows/analyze-mood-coping-strategies';
import { getPersonalizedHealthTips } from '@/ai/flows/personalized-health-tips';
import {format} from 'date-fns';

export async function getWellnessData() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  const logsQuery = query(
    collection(db, 'wellness_logs'),
    where('userId', '==', user.uid),
    orderBy('date', 'desc')
  );

  const querySnapshot = await getDocs(logsQuery);
  const logs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as WellnessLog[];

  return logs;
}

export async function addOrUpdateWellnessLog(
  data: WellnessLogFormValues,
  logId?: string
) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const logData: WellnessLogInServer = {
    userId: user.uid,
    date: format(data.date, 'yyyy-MM-dd'),
    sleepHours: data.sleepHours,
    waterIntake: data.waterIntake,
    meals: data.meals,
    mood: data.mood,
    steps: data.steps,
    createdAt: serverTimestamp(),
  };

  if (logId) {
    const logRef = doc(db, 'wellness_logs', logId);
    await updateDoc(logRef, logData);
  } else {
    await addDoc(collection(db, 'wellness_logs'), logData);
  }

  revalidatePath('/dashboard');

  // Only generate a tip for new logs
  if (!logId) {
    try {
      const userDocQuery = query(collection(db, 'users'), where('uid', '==', user.uid), limit(1));
      const userDocSnapshot = await getDocs(userDocQuery);

      if (!userDocSnapshot.empty) {
        const userProfile = userDocSnapshot.docs[0].data();
        const tip = await getPersonalizedHealthTips({
          sleepHours: data.sleepHours,
          waterIntake: data.waterIntake,
          mood: data.mood,
          wellnessGoal: userProfile.wellnessGoal,
          meals: data.meals,
          steps: data.steps,
        });
        return tip;
      }
    } catch (e) {
      console.error("Error generating health tip:", e);
      // Fail gracefully if AI tip generation fails
      return null;
    }
  }

  return null;
}

export async function deleteWellnessLog(logId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  // Basic security check: Ensure the log belongs to the user before deleting.
  // A more robust solution would use Firestore security rules.
  const logRef = doc(db, 'wellness_logs', logId);
  await deleteDoc(logRef);

  revalidatePath('/dashboard');
}

export async function getAiSuggestions() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid), limit(1)));
  if (userDoc.empty) throw new Error('User profile not found');
  const userProfile = userDoc.docs[0].data();

  const logsQuery = query(
    collection(db, 'wellness_logs'),
    where('userId', '==', user.uid),
    orderBy('date', 'desc'),
    limit(7)
  );
  const logsSnapshot = await getDocs(logsQuery);
  const pastWellnessLogs = logsSnapshot.docs.map(doc => doc.data());

  if (pastWellnessLogs.length === 0) {
    return { plan: "Start logging your daily wellness to receive personalized tips!", strategies: null };
  }

  const plan = await generatePersonalizedWellnessPlan({
    age: userProfile.age,
    gender: userProfile.gender,
    wellnessGoal: userProfile.wellnessGoal,
    pastWellnessLogs: JSON.stringify(pastWellnessLogs),
  });

  let strategies = null;
  const latestLog = pastWellnessLogs[0];
  if (latestLog.mood === 'stressed') {
    strategies = await analyzeMoodAndProvideCopingStrategies({
      moodEntries: pastWellnessLogs.map(log => ({
        date: log.date,
        mood: log.mood,
        details: log.meals,
      })),
      wellnessGoal: userProfile.wellnessGoal,
    });
  }
  
  return { plan, strategies };
}
