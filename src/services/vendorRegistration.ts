"use client";

import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseApp } from "../firebase/init"; // gunakan helper

let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

// inisialisasi hanya jika di client
if (typeof window !== "undefined") {
  const app = getFirebaseApp();
  db = getFirestore(app);
  storage = getStorage(app);
}

async function uploadFile(file: File, path: string): Promise<string> {
  if (!storage) throw new Error("Firebase Storage belum diinisialisasi");
  const r = storageRef(storage, path);
  const snapshot = await uploadBytes(r, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

// fungsi submit
export async function submitVendorRegistration(payload: any, files?: Record<string, File | null>) {
  if (!db) throw new Error("Firestore belum diinisialisasi");

  const fileUploads: Partial<Record<string, string>> = {};

  if (files) {
    for (const [key, file] of Object.entries(files)) {
      if (file) {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const userId = payload.userId ? `${payload.userId}_` : "anon_";
        const path = `vendor-registrations/${timestamp}_${userId}${key}_${safeName}`;
        fileUploads[key] = await uploadFile(file, path);
      }
    }
  }

  const doc: any = {
    tipeVendor: payload.tipeVendor,
    emailVendor: payload.emailVendor,
    namaVendor: payload.namaVendor,
    noNpwpVendor: payload.noNpwpVendor,
    status: "pending",
    createdAt: serverTimestamp(),
    ...fileUploads,
    ...(payload.userId ? { userId: payload.userId } : {}),
  };

  const col = collection(db, "vendor_registrations");
  const ref = await addDoc(col, doc);
  return { id: ref.id, ...doc };
}

export default {
  submitVendorRegistration,
};
