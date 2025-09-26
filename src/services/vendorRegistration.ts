"use client";

import { app } from "../firebase/init";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export type VendorRegistrationPayload = {
  tipeVendor: string;
  emailVendor: string;
  namaVendor: string;
  noNpwpVendor: string;
  dokumenAdminUrl?: string;
  dokumenLegalUrl?: string;
  dokumenTeknikalUrl?: string;
  dokumenFinansialUrl?: string;
  userId?: string | null;
};

const db = getFirestore(app);
const storage = getStorage(app);

async function uploadFile(file: File, path: string): Promise<string> {
  const r = storageRef(storage, path);
  const snapshot = await uploadBytes(r, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export async function submitVendorRegistration(payload: VendorRegistrationPayload, files?: Record<string, File | null>) {
  const fileUploads: Partial<Record<string, string>> = {};

  if (files) {
    const entries = Object.entries(files);
    for (const [key, file] of entries) {
      if (file) {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const userId = payload.userId ? `${payload.userId}_` : "anon_";
        const path = `vendor-registrations/${timestamp}_${userId}${key}_${safeName}`;
        try {
          const url = await uploadFile(file, path);
          fileUploads[key] = url;
        } catch (e) {
          console.error("Failed to upload", key, e);
          throw e;
        }
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
  };

  if (payload.userId) doc.userId = payload.userId;

  if (fileUploads["dokumenAdmin"]) doc.dokumenAdminUrl = fileUploads["dokumenAdmin"];
  if (fileUploads["dokumenLegal"]) doc.dokumenLegalUrl = fileUploads["dokumenLegal"];
  if (fileUploads["dokumenTeknikal"]) doc.dokumenTeknikalUrl = fileUploads["dokumenTeknikal"];
  if (fileUploads["dokumenFinansial"]) doc.dokumenFinansialUrl = fileUploads["dokumenFinansial"];

  const col = collection(db, "vendor_registrations");
  const ref = await addDoc(col, doc);
  return { id: ref.id, ...doc };
}

export default {
  submitVendorRegistration,
};
