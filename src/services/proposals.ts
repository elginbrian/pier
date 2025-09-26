"use client";

import { app } from "../firebase/init";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
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

  const docPayload: any = {
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

  if (payload.userId) docPayload.userId = payload.userId;

  if (fileUploads["proposalHarga"]) docPayload.proposalHargaUrl = fileUploads["proposalHarga"];
  if (fileUploads["companyDeed"]) docPayload.companyDeedUrl = fileUploads["companyDeed"];
  if (fileUploads["businessLicense"]) docPayload.businessLicenseUrl = fileUploads["businessLicense"];
  if (fileUploads["portfolio"]) docPayload.portfolioUrl = fileUploads["portfolio"];

  const col = collection(db, "proposals");
  const ref = await addDoc(col, docPayload);
  return { id: ref.id, ...docPayload };
}

export async function getAllProposals(statusFilter?: string[]) {
  const col = collection(db, "proposals");
  try {
    if (!statusFilter || statusFilter.length === 0) {
      const q = query(col);
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }

    const results: any[] = [];
    for (const status of statusFilter) {
      const q = query(col, where("status", "==", status));
      const snap = await getDocs(q);
      snap.docs.forEach((d) => results.push({ id: d.id, ...d.data() }));
    }
    return results;
  } catch (e) {
    console.error("Failed to fetch proposals", e);
    throw e;
  }
}

export async function getProposalById(proposalId: string): Promise<any | null> {
  try {
    console.log("[proposals] Getting proposal by ID:", proposalId);

    const proposalDoc = doc(db, "proposals", proposalId);
    const proposalSnapshot = await getDoc(proposalDoc);

    if (!proposalSnapshot.exists()) {
      console.log("[proposals] Proposal not found:", proposalId);
      return null;
    }

    const data = proposalSnapshot.data();
    const proposal = {
      id: proposalSnapshot.id,
      ...data,
    };

    console.log("[proposals] Found proposal:", proposal);
    return proposal;
  } catch (error) {
    console.error("[proposals] Error getting proposal by ID:", error);
    return null;
  }
}

export function subscribeToProposals(onUpdate: (proposals: any[]) => void, statusFilter?: string[]) {
  const col = collection(db, "proposals");

  const q = statusFilter && statusFilter.length > 0 ? query(col, where("status", "in", statusFilter)) : query(col);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const proposals: any[] = [];
    snapshot.forEach((d) => {
      proposals.push({ id: d.id, ...d.data() });
    });

    proposals.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
    });
    onUpdate(proposals);
  });

  return unsubscribe;
}

export async function updateProposalStatus(proposalId: string, status: string, reviewerId?: string | null, reviewComment?: string | null) {
  try {
    const d = doc(db, "proposals", proposalId);
    const payload: any = {
      status,
      updatedAt: serverTimestamp(),
    };
    if (reviewerId) payload.reviewerId = reviewerId;
    if (reviewComment) payload.reviewComment = reviewComment;

    if (status === "under_review" || status === "approved" || status === "rejected") {
      payload.reviewedAt = serverTimestamp();
    }

    await updateDoc(d, payload);
    return true;
  } catch (e) {
    console.error("Failed to update proposal status", e);
    throw e;
  }
}

export default {
  submitProposal,
  getProposalById,
};
