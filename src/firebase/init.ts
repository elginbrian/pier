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

function assertFirebaseConfig(cfg: Record<string, any>) {
  const missing = Object.entries(cfg)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length && typeof window !== "undefined") {
    console.warn(`[firebase] missing env vars: ${missing.join(", ")}. Set NEXT_PUBLIC_FIREBASE_* in your environment.`);
  }
}

let app: any = null;
let auth: any = null;

if (typeof window !== "undefined") {
  assertFirebaseConfig(firebaseConfig);

  try {
    if (process.env.NODE_ENV !== "production") {
      const pid = firebaseConfig.projectId ?? "<missing>";
      const api = typeof firebaseConfig.apiKey === "string" ? firebaseConfig.apiKey.slice(0, 8) + "..." : "<missing>";
      console.debug(`[firebase][dev] projectId=${pid} apiKeyPrefix=${api}`);
    }
  } catch (e) {
    // silent
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig as any);
  }
  app = getApp();
  auth = getAuth(app);
}

export { app, auth };
