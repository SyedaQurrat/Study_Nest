
'use server';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';

type UpdateData = Omit<UserProfile, 'uid' | 'email'>;

export async function updateUserProfile(uid: string, data: UpdateData) {
  if (!uid) {
    throw new Error('User is not authenticated.');
  }
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, { ...data });
}
