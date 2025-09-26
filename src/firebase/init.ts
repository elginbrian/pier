"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inisialisasi app hanya di client
let app: ReturnType<typeof getApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (typeof window !== "undefined") {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  auth = getAuth(app);
}

// Helper function supaya aman dipakai
export function getFirebaseApp() {
  if (!app) throw new Error("Firebase app belum diinisialisasi.");
  return app;
}

export function getFirebaseAuth() {
  if (!auth) throw new Error("Firebase Auth belum diinisialisasi.");
  return auth;
}

export { app, auth };
