//app/services/firebase/watchHistory.ts
import { db, auth } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const getUserDocRef = () => doc(db, 'users', auth.currentUser?.uid || '');

export const addToWatchHistory = async (movieId: string) => {
  await updateDoc(getUserDocRef(), {
    watchHistory: arrayUnion({
      movieId,
      watchedAt: new Date().toISOString(),
    }),
  });
};

export const getWatchHistory = async (): Promise<any[]> => {
  const docSnap = await getDoc(getUserDocRef());
  return docSnap.exists() ? docSnap.data().watchHistory || [] : [];
};
