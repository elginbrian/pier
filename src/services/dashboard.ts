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
  addDoc,
  updateDoc,
  serverTimestamp,
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

// Extended contract management functions

export interface ContractDetails extends Contract {
  deliverables: string[];
  milestones: Milestone[];
  progress: number;
  slaRequirements: string[];
  technicalSpec: string;
  paymentTerms: string;
  notifications: ContractNotification[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  actualDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  progress: number;
}

export interface ContractNotification {
  id: string;
  type: 'milestone' | 'deadline' | 'payment' | 'sla' | 'general';
  title: string;
  message: string;
  dueDate?: string;
  isRead: boolean;
  createdAt: any;
}

// Get detailed contract information with milestones and progress
export async function getContractDetails(contractId: string): Promise<ContractDetails | null> {
  try {
    console.log("[dashboard] Getting detailed contract:", contractId);
    
    const contractDoc = doc(db, 'contracts', contractId);
    const contractSnapshot = await getDoc(contractDoc);
    
    if (!contractSnapshot.exists()) {
      console.log("[dashboard] Contract not found:", contractId);
      return null;
    }
    
    const data = contractSnapshot.data();
    
    // Get milestones for this contract
    const milestonesQuery = query(
      collection(db, "contract_milestones"),
      where("contractId", "==", contractId)
    );
    
    const milestonesSnapshot = await getDocs(milestonesQuery);
    const milestones: Milestone[] = [];
    
    milestonesSnapshot.forEach((doc) => {
      milestones.push({
        id: doc.id,
        ...doc.data()
      } as Milestone);
    });

    // Get contract notifications
    const notificationsQuery = query(
      collection(db, "contract_notifications"),
      where("contractId", "==", contractId),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    
    const notificationsSnapshot = await getDocs(notificationsQuery);
    const notifications: ContractNotification[] = [];
    
    notificationsSnapshot.forEach((doc) => {
      notifications.push({
        id: doc.id,
        ...doc.data()
      } as ContractNotification);
    });

    // Calculate overall progress
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    const totalMilestones = milestones.length;
    const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

    const contractDetails: ContractDetails = {
      id: contractSnapshot.id,
      title: data.title || data.proposalTitle || "Untitled Contract",
      vendorName: data.companyName || data.vendorName || "Unknown Vendor",
      contractValue: data.contractValue || "0",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      status: data.status || "pending",
      createdAt: data.createdAt,
      deliverables: data.deliverables || [
        "Implementation of integrated logistics management system",
        "Operational team training and maintenance", 
        "Technical documentation and user manual",
        "Support and maintenance for 12 months"
      ],
      milestones,
      progress: Math.round(progress),
      slaRequirements: data.slaRequirements || [
        "System uptime minimum 99.5%",
        "Response time maximum 24 hours",
        "Monthly performance reports"
      ],
      technicalSpec: data.technicalSpec || "",
      paymentTerms: data.paymentTerms || "",
      notifications
    };

    // Calculate days remaining if contract is active
    if (contractDetails.status === 'active' && contractDetails.endDate) {
      const endDate = new Date(contractDetails.endDate);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      contractDetails.daysRemaining = diffDays > 0 ? diffDays : 0;
    }
    
    console.log("[dashboard] Contract details loaded:", contractDetails);
    return contractDetails;
    
  } catch (error) {
    console.error("[dashboard] Error getting contract details:", error);
    return null;
  }
}

// Update contract progress
export async function updateContractProgress(contractId: string, progress: number): Promise<boolean> {
  try {
    const contractDoc = doc(db, 'contracts', contractId);
    await updateDoc(contractDoc, { progress });
    return true;
  } catch (error) {
    console.error("[dashboard] Error updating contract progress:", error);
    return false;
  }
}

// Add milestone to contract
export async function addContractMilestone(contractId: string, milestone: Omit<Milestone, 'id'>): Promise<string | null> {
  try {
    const milestonesCollection = collection(db, 'contract_milestones');
    const docRef = await addDoc(milestonesCollection, {
      ...milestone,
      contractId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("[dashboard] Error adding milestone:", error);
    return null;
  }
}

// Get contract milestones
export async function getContractMilestones(contractId: string): Promise<Milestone[]> {
  try {
    const milestonesQuery = query(
      collection(db, "contract_milestones"),
      where("contractId", "==", contractId)
    );
    
    const querySnapshot = await getDocs(milestonesQuery);
    const milestones: Milestone[] = [];
    
    querySnapshot.forEach((doc) => {
      milestones.push({
        id: doc.id,
        ...doc.data()
      } as Milestone);
    });
    
    return milestones;
  } catch (error) {
    console.error("[dashboard] Error fetching milestones:", error);
    return [];
  }
}

export default {
  getVendorProfile,
  getVendorContracts,
  getContractById,
  getVendorProposals,
  calculateDashboardStats,
  generateNotifications,
  subscribeToVendorData,
  // New contract management functions
  getContractDetails,
  updateContractProgress,
  addContractMilestone,
  getContractMilestones
};