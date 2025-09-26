"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { colors } from "@/design-system";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { getProposalById } from "@/services/proposals";
import AiAnalysisPanel from "@/components/AiAnalysisPanel";
import VendorInfoCard from "@/components/VendorInfoCard";
import { useToasts } from "@/components/ToastProvider";
import { FiCheck, FiSend, FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { updateProposalStatus } from "@/services/proposals";

const HukumDetailByIdPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = (params as any)?.id as string | undefined;

  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToasts();
  const [busy, setBusy] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  useEffect(() => {
    const loadProposal = async () => {
      if (!id) {
        setError("ID proposal tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const proposalData = await getProposalById(id);
        setProposal(proposalData);
      } catch (err) {
        setError("Gagal memuat data proposal");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProposal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">{error}</p>
          <button onClick={() => router.back()} className="px-4 py-2 rounded bg-gray-100">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Proposal tidak ditemukan.</p>
      </div>
    );
  }

  const createdAt = proposal.createdAt && proposal.createdAt.toDate ? proposal.createdAt.toDate().toLocaleString() : proposal.createdAt || "-";

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <span className="font-medium" style={{ color: colors.base[700] }}>
            Detail Pengajuan - {proposal.proposalTitle || proposal.companyName}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left/main column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: colors.primary[600] }}>
              <div className="flex items-center justify-between" style={{ color: "#ffffff" }}>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🏢</span>
                    <h2 className="text-xl font-bold">{proposal.companyName || "-"}</h2>
                  </div>
                  <p className="text-sm opacity-90 mb-1">Vendor ID: {proposal.userId || "-"}</p>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: proposal.status === "approved" || proposal.status === "active" ? colors.success[300] : proposal.status === "rejected" ? colors.error[300] : colors.warning[300],
                      }}
                    ></div>
                    <span className="text-sm" style={{ color: colors.base[100] }}>
                      {proposal.status || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                className="px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto transition-colors"
                style={{
                  border: `1px solid ${colors.primary[300]}`,
                  backgroundColor: "transparent",
                  color: colors.primary[600],
                }}
                href={proposal.proposalHargaUrl || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Lihat Proposal Lengkap</span>
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
                <div className="flex items-center space-x-2">
                  <div>
                    <h3 className="font-semibold" style={{ color: colors.base[700] }}>
                      Draft Kontrak Otomatis
                    </h3>
                    <p className="text-sm" style={{ color: colors.base[500] }}>
                      (AI Generated)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-lg font-bold mb-2" style={{ color: colors.base[700] }}>
                      {proposal.proposalTitle || "KONTRAK PENGADAAN"}
                    </h2>
                    <p className="text-sm" style={{ color: colors.base[600] }}>
                      Tanggal Pengajuan: {createdAt}
                    </p>
                  </div>

                  <div className="text-sm space-y-4" style={{ color: colors.base[700] }}>
                    <AiAnalysisPanel id={id} proposal={proposal} showHeader={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <VendorInfoCard proposal={proposal} />

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4" style={{ color: colors.base[700] }}>
                Ringkasan Proposal
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium" style={{ color: colors.base[600] }}>
                    Jenis Layanan:
                  </span>
                  <p style={{ color: colors.base[700] }}>{proposal.serviceType || "-"}</p>
                </div>
                <div>
                  <span className="font-medium" style={{ color: colors.base[600] }}>
                    Nilai Kontrak:
                  </span>
                  <p className="font-bold" style={{ color: colors.success[600] }}>
                    {proposal.contractValue || "-"}
                  </p>
                </div>
                <div>
                  <span className="font-medium" style={{ color: colors.base[600] }}>
                    Status:
                  </span>
                  <p style={{ color: colors.base[700] }}>{proposal.status || "-"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div style={{ backgroundColor: colors.primary[100] }} className="px-6 py-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold" style={{ color: colors.base[700] }}>
                    Review & Komentar
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-3" style={{ color: colors.base[700] }}>
                    Checklist Review
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">- Informasi vendor</p>
                    <p className="text-sm">- Ruang lingkup</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <button
                      onClick={async () => {
                        if (!user) return;
                        setBusy(true);
                        try {
                          await updateProposalStatus(proposal.id, "approved", user.uid, null);
                          showToast("success", "Proposal disetujui");
                        } catch (e) {
                          console.error(e);
                          showToast("error", "Gagal menyetujui proposal");
                        } finally {
                          setBusy(false);
                        }
                      }}
                      disabled={busy}
                      className="w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 shadow-sm"
                      style={{ backgroundColor: colors.primary[400] }}
                    >
                      <FiCheck /> <span>Terima Draft</span>
                    </button>

                    <button
                      onClick={async () => {
                        showToast("info", "Permintaan revisi dikirim ke vendor");
                      }}
                      className="w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 shadow-sm"
                      style={{ backgroundColor: colors.secondary[300] }}
                    >
                      <FiSend /> <span>Kirim Revisi ke Vendor</span>
                    </button>

                    <button
                      onClick={() => showToast("info", "Draft disimpan")}
                      className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: colors.base[100],
                        color: colors.base[600],
                        border: `1px solid ${colors.base[300]}`,
                      }}
                    >
                      <FiSave /> <span>Simpan Draft</span>
                    </button>

                    <div className="mt-2">
                      <button
                        onClick={() => setConfirmReject(true)}
                        className="w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                        style={{ backgroundColor: "transparent", color: colors.error[700], border: `1px solid ${colors.error[300]}` }}
                      >
                        <FiX /> <span>Tolak Proposal</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmReject && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-start space-x-3">
              <FiAlertCircle size={22} className="text-yellow-500" />
              <div>
                <h3 className="font-semibold">Konfirmasi Tolak Proposal</h3>
                <p className="text-sm text-gray-600">Apakah Anda yakin ingin menolak proposal ini? Tindakan ini tidak dapat diurungkan.</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setConfirmReject(false)} className="px-3 py-2 rounded" style={{ border: `1px solid ${colors.base[300]}` }}>
                Batal
              </button>
              <button
                onClick={async () => {
                  if (!user) return;
                  setBusy(true);
                  try {
                    await updateProposalStatus(proposal.id, "rejected", user.uid, "Ditolak oleh tim hukum");
                    showToast("success", "Proposal ditolak");
                    setConfirmReject(false);
                  } catch (e) {
                    console.error(e);
                    showToast("error", "Gagal menolak proposal");
                  } finally {
                    setBusy(false);
                  }
                }}
                className="px-3 py-2 rounded text-white"
                style={{ backgroundColor: colors.error[600] }}
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HukumDetailByIdPage;
