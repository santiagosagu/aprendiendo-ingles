import React, { createContext } from "react";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

export const FirebaseContext = createContext<any>(null);

const Firebase = ({ children }: any) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <FirebaseContext.Provider
      value={{
        app,
        db,
        collection,
        addDoc,
        getDocs,
        query,
        orderBy,
        onSnapshot,
        Timestamp,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default Firebase;
