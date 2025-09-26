"use client";

import { app } from "../firebase/init";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export type ProposalPayload = {
  companyName: string;
  contactPerson: string;
  proposalTitle: string;
  serviceType: string;
  technicalSpec: string;
  startDate: string;
  endDate: string;
  contractValue: string;
  paymentTerms: string;
  proposalHargaUrl?: string;
  companyDeedUrl?: string;
  businessLicenseUrl?: string;
  portfolioUrl?: string;
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

export async function submitProposal(payload: ProposalPayload, files?: Record<string, File | null>) {
  const fileUploads: Partial<Record<string, string>> = {};

  if (files) {
    const entries = Object.entries(files);
    for (const [key, file] of entries) {
      if (file) {
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const userId = payload.userId ? `${payload.userId}_` : "anon_";
        const path = `proposals/${timestamp}_${userId}${key}_${safeName}`;
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
    companyName: payload.companyName,
    contactPerson: payload.contactPerson,
    proposalTitle: payload.proposalTitle,
    serviceType: payload.serviceType,
    technicalSpec: payload.technicalSpec,
    startDate: payload.startDate,
    endDate: payload.endDate,
    contractValue: payload.contractValue,
    paymentTerms: payload.paymentTerms,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  if (payload.userId) doc.userId = payload.userId;

  if (fileUploads["proposalHarga"]) doc.proposalHargaUrl = fileUploads["proposalHarga"];
  if (fileUploads["companyDeed"]) doc.companyDeedUrl = fileUploads["companyDeed"];
  if (fileUploads["businessLicense"]) doc.businessLicenseUrl = fileUploads["businessLicense"];
  if (fileUploads["portfolio"]) doc.portfolioUrl = fileUploads["portfolio"];

  const col = collection(db, "proposals");
  const ref = await addDoc(col, doc);
  return { id: ref.id, ...doc };
}

export async function getProposalById(proposalId: string): Promise<any | null> {
  try {
    console.log("[proposals] Getting proposal by ID:", proposalId);
    
    const proposalDoc = doc(db, 'proposals', proposalId);
    const proposalSnapshot = await getDoc(proposalDoc);
    
    if (!proposalSnapshot.exists()) {
      console.log("[proposals] Proposal not found:", proposalId);
      return null;
    }
    
    const data = proposalSnapshot.data();
    const proposal = {
      id: proposalSnapshot.id,
      ...data
    };
    
    console.log("[proposals] Found proposal:", proposal);
    return proposal;
    
  } catch (error) {
    console.error("[proposals] Error getting proposal by ID:", error);
    return null;
  }
}

export default {
  submitProposal,
  getProposalById,
};