import { db, auth } from '@/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const getUserDocRef = () => doc(db, 'users', auth.currentUser?.uid || '');

export const addToWatchHistory = async (movieObj: any) => {
  const userDocRef = getUserDocRef();
  const docSnap = await getDoc(userDocRef);

  let history = docSnap.exists() ? docSnap.data().watchHistory || [] : [];

  // Remove any existing entry with the same id
  history = history.filter((item: any) => item.id !== movieObj.id);

  // Add the new movie
  history.push(movieObj);

  // Sort by watchedAt DESC 
  history.sort(
    (a: any, b: any) =>
      new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime()
  );

  // Limit to 20 items
  if (history.length > 20) {
    history = history.slice(0, 20);
  }

  // Save the updated array
  await updateDoc(userDocRef, { watchHistory: history });
};

export const getWatchHistory = async (): Promise<any[]> => {
  const docSnap = await getDoc(getUserDocRef());
  return docSnap.exists() ? docSnap.data().watchHistory || [] : [];
};
