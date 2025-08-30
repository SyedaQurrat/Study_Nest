
'use client';

import React, { useState, useEffect, type ReactNode, useCallback } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        
        // Use onSnapshot for real-time updates
        const unsubProfile = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                setUserProfile(doc.data() as UserProfile);
            } else {
                // This case can happen if a user is authenticated but their profile doc is deleted
                setUserProfile(null);
            }
            setLoading(false);
        });

        // Cleanup profile listener on unmount
        return () => unsubProfile();

      } else {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    router.push('/login');
  }, [router]);

  const value = {
    user,
    userProfile,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
