"use client";

import { auth } from "../firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendEmailVerification as firebaseSendEmailVerification,
} from "firebase/auth";

export type User = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  emailVerified?: boolean;
};

function toUser(user: any | null): User | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
  };
}

export async function signUpWithEmail(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  try {
    await firebaseSendEmailVerification(user);
  } catch (e) {
    console.warn("Failed to send verification", e);
  }
  return toUser(user)!;
}

export async function signInWithEmailLocal(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return toUser(credential.user)!;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function requestPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export function onAuthStateChanged(callback: (user: User | null) => void) {
  return firebaseOnAuthStateChanged(auth, (u: any | null) => callback(toUser(u)));
}
