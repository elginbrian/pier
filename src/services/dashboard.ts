"use client";

import { app } from "../firebase/init";
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  orderBy,
  limit,
  onSnapshot,
  Timestamp
} from "firebase/firestore";

const db = getFirestore(app);

export interface VendorProfile {
  id: string;
  namaVendor: string;
  emailVendor: string;
  tipeVendor: string;
  noNpwpVendor: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: any;
}

export interface Contract {
  id: string;
  title: string;
  vendorName: string;
  contractValue: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'active' | 'expired' | 'terminated' | 'rejected';
  daysRemaining?: number;
  createdAt: any;
}

export interface Proposal {
  id: string;
  proposalTitle: string;
  companyName: string;
  serviceType: string;
  contractValue: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  createdAt: any;
}

export interface DashboardStats {
  activeContracts: number;
  pendingProposals: number;
  expiringContracts: number;
  totalValue: number;
}

export interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  createdAt: any;
  read: boolean;
}

// Get vendor profile by user ID
export async function getVendorProfile(userId: string): Promise<VendorProfile | null> {
  try {
    const vendorQuery = query(
      collection(db, "vendor_registrations"),
      where("userId", "==", userId),
      where("status", "==", "verified"),
      limit(1)
    );
    
    const querySnapshot = await getDocs(vendorQuery);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as VendorProfile;
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    throw error;
  }
}

// Get vendor's contracts
export async function getVendorContracts(userId: string): Promise<Contract[]> {
  try {
    // Simplified query without orderBy to avoid index requirement
    const contractsQuery = query(
      collection(db, "contracts"),
      where("vendorUserId", "==", userId)
    );
    
    const querySnapshot = await getDocs(contractsQuery);
    const contracts: Contract[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const contract: Contract = {
        id: doc.id,
        title: data.title || data.proposalTitle || "Untitled Contract",
        vendorName: data.companyName || data.vendorName || "Unknown Vendor",
        contractValue: data.contractValue || "0",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        status: data.status || "pending",
        createdAt: data.createdAt
      };

      // Calculate days remaining if contract is active and has end date
      if (contract.status === 'active' && contract.endDate) {
        const endDate = new Date(contract.endDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        contract.daysRemaining = diffDays > 0 ? diffDays : 0;
      }

      contracts.push(contract);
    });
    
    // Sort client-side by createdAt (most recent first)
    contracts.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
    });
    
    return contracts;
  } catch (error) {
    console.error("Error fetching vendor contracts:", error);
    throw error;
  }
}

export async function getContractById(contractId: string): Promise<Contract | null> {
  try {
    console.log("[dashboard] Getting contract by ID:", contractId);
    
    const contractDoc = doc(db, 'contracts', contractId);
    const contractSnapshot = await getDoc(contractDoc);
    
    if (!contractSnapshot.exists()) {
      console.log("[dashboard] Contract not found:", contractId);
      return null;
    }
    
    const data = contractSnapshot.data();
    const contract: Contract = {
      id: contractSnapshot.id,
      title: data.title || data.proposalTitle || "Untitled Contract",
      vendorName: data.companyName || data.vendorName || "Unknown Vendor",
      contractValue: data.contractValue || "0",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      status: data.status || "pending",
      createdAt: data.createdAt
    };

    // Calculate days remaining if contract is active and has end date
    if (contract.status === 'active' && contract.endDate) {
      const endDate = new Date(contract.endDate);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      contract.daysRemaining = diffDays > 0 ? diffDays : 0;
    }
    
    console.log("[dashboard] Found contract:", contract);
    return contract;
    
  } catch (error) {
    console.error("[dashboard] Error getting contract by ID:", error);
    return null;
  }
}

// Get vendor's proposals
export async function getVendorProposals(userId: string): Promise<Proposal[]> {
  try {
    // Simplified query without orderBy to avoid index requirement
    const proposalsQuery = query(
      collection(db, "proposals"),
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(proposalsQuery);
    const proposals: Proposal[] = [];
    
    querySnapshot.forEach((doc) => {
      proposals.push({
        id: doc.id,
        ...doc.data()
      } as Proposal);
    });
    
    // Sort client-side by createdAt (most recent first)
    proposals.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
    });
    
    return proposals;
  } catch (error) {
    console.error("Error fetching vendor proposals:", error);
    throw error;
  }
}

// Calculate dashboard statistics
export function calculateDashboardStats(contracts: Contract[], proposals: Proposal[]): DashboardStats {
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const pendingProposals = proposals.filter(p => p.status === 'pending').length;
  const expiringContracts = contracts.filter(c => 
    c.status === 'active' && 
    c.daysRemaining !== undefined && 
    c.daysRemaining <= 30
  ).length;
  
  const totalValue = contracts
    .filter(c => c.status === 'active')
    .reduce((sum, c) => {
      const value = parseFloat(c.contractValue.replace(/[^\d]/g, '')) || 0;
      return sum + value;
    }, 0);

  return {
    activeContracts,
    pendingProposals,
    expiringContracts,
    totalValue
  };
}

// Generate notifications based on contracts and proposals
export function generateNotifications(contracts: Contract[], proposals: Proposal[]): Notification[] {
  const notifications: Notification[] = [];
  let notificationId = 1;

  // Contract expiration warnings
  contracts.forEach(contract => {
    if (contract.status === 'active' && contract.daysRemaining !== undefined) {
      if (contract.daysRemaining <= 15 && contract.daysRemaining > 0) {
        notifications.push({
          id: `contract-exp-${notificationId++}`,
          type: 'warning',
          title: `Contract will expire in ${contract.daysRemaining} days`,
          message: `${contract.title} with ${contract.vendorName}`,
          createdAt: Timestamp.now(),
          read: false
        });
      } else if (contract.daysRemaining <= 0) {
        notifications.push({
          id: `contract-expired-${notificationId++}`,
          type: 'error',
          title: 'Contract has expired',
          message: `${contract.title} with ${contract.vendorName}`,
          createdAt: Timestamp.now(),
          read: false
        });
      }
    }
  });

  // Proposal status updates
  const pendingProposals = proposals.filter(p => p.status === 'pending');
  if (pendingProposals.length > 0) {
    notifications.push({
      id: `proposals-pending-${notificationId++}`,
      type: 'info',
      title: 'Proposals awaiting review',
      message: `${pendingProposals.length} proposal${pendingProposals.length > 1 ? 's' : ''} are awaiting review`,
      createdAt: Timestamp.now(),
      read: false
    });
  }

  const underReviewProposals = proposals.filter(p => p.status === 'under_review');
  if (underReviewProposals.length > 0) {
    notifications.push({
      id: `proposals-review-${notificationId++}`,
      type: 'info',
      title: 'Legal review pending approval',
      message: `${underReviewProposals.length} proposal${underReviewProposals.length > 1 ? 's' : ''} are under legal review`,
      createdAt: Timestamp.now(),
      read: false
    });
  }

  return notifications;
}

// Set up real-time listener for vendor data
export function subscribeToVendorData(
  userId: string,
  onDataUpdate: (data: {
    contracts: Contract[];
    proposals: Proposal[];
    stats: DashboardStats;
    notifications: Notification[];
  }) => void
) {
  // Listen to contracts - simplified query without orderBy
  const contractsQuery = query(
    collection(db, "contracts"),
    where("vendorUserId", "==", userId)
  );

  // Listen to proposals - simplified query without orderBy  
  const proposalsQuery = query(
    collection(db, "proposals"),
    where("userId", "==", userId)
  );

  let contracts: Contract[] = [];
  let proposals: Proposal[] = [];

  const updateData = () => {
    // Sort client-side
    contracts.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
    });
    
    proposals.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
    });

    const stats = calculateDashboardStats(contracts, proposals);
    const notifications = generateNotifications(contracts, proposals);
    onDataUpdate({ contracts, proposals, stats, notifications });
  };

  // Subscribe to contracts
  const unsubscribeContracts = onSnapshot(contractsQuery, (snapshot) => {
    contracts = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const contract: Contract = {
        id: doc.id,
        title: data.title || data.proposalTitle || "Untitled Contract",
        vendorName: data.companyName || data.vendorName || "Unknown Vendor",
        contractValue: data.contractValue || "0",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        status: data.status || "pending",
        createdAt: data.createdAt
      };

      if (contract.status === 'active' && contract.endDate) {
        const endDate = new Date(contract.endDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        contract.daysRemaining = diffDays > 0 ? diffDays : 0;
      }

      contracts.push(contract);
    });
    updateData();
  });

  // Subscribe to proposals
  const unsubscribeProposals = onSnapshot(proposalsQuery, (snapshot) => {
    proposals = [];
    snapshot.forEach((doc) => {
      proposals.push({
        id: doc.id,
        ...doc.data()
      } as Proposal);
    });
    updateData();
  });

  // Return unsubscribe function
  return () => {
    unsubscribeContracts();
    unsubscribeProposals();
  };
}

export default {
  getVendorProfile,
  getVendorContracts,
  getVendorProposals,
  calculateDashboardStats,
  generateNotifications,
  subscribeToVendorData
};