"use client";

import React from 'react';

// --- SVG Icon Components ---
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const WarningIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

const BarChartIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
);

const AiIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.9 4.2-4.3.4 3.3 2.9-.9 4.2 3.8-2.3 3.8 2.3-.9-4.2 3.3-2.9-4.3-.4L12 3z" />
        <path d="M5 21v-3" />
        <path d="M19 21v-3" />
        <path d="M12 21v-4" />
    </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

// --- Child Components ---
const StatCard = ({ icon, value, title, subtitle, colorClass }: {
    icon: React.ReactNode;
    value: string;
    title: string;
    subtitle: string;
    colorClass: string;
}) => (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-3xl font-bold text-slate-800 text-end">{value}</p>
        <p className="text-md font-semibold text-slate-600">{title}</p>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
);

const TimelineBar = ({ id, progress, time, color }: {
    id: string;
    progress: number;
    time: string;
    color: string;
}) => (
    <div className="flex items-center gap-4 py-2">
        <span className="text-sm font-medium text-slate-500">{id}</span>
        <div className="flex-1 bg-slate-200 rounded-full h-4">
            <div className={`${color} h-4 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        <span className="w-28 text-sm text-right text-slate-500">{time}</span>
    </div>
);

const NotificationItem = ({ icon, text, subtext, colorClass }: {
    icon: React.ReactNode;
    text: string;
    subtext: string;
    colorClass: string;
}) => (
    <div className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${colorClass}`}>
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-grow">
            <p className="text-slate-700">{text}</p>
            <p className="text-xs text-slate-500">{subtext}</p>
        </div>
        <button className="text-slate-400 hover:text-indigo-600">
            <ExternalLinkIcon className="w-5 h-5" />
        </button>
    </div>
);


// --- Main Dashboard Component ---
export default function ManagementContractMonitoringPage() {
    type NotificationType = 'warning' | 'error' | 'success';

    const contractTimelines = [
        { id: 'Kontrak #2025-04', progress: 75, time: '75% - 14 hari lagi', color: 'bg-green-500' },
        { id: 'Kontrak #2025-05', progress: 45, time: '45% - 6 bulan lagi', color: 'bg-green-500' },
        { id: 'Kontrak #2025-06', progress: 92, time: '92% - 3 hari lagi', color: 'bg-orange-500' },
    ];

    const notifications: Array<{ type: NotificationType; text: string; subtext: string }> = [
        { type: 'warning', text: 'Kontrak #2025-04 dengan Vendor A mendekati jatuh tempo (14 hari lagi).', subtext: 'Diprediksi oleh AI • 2 jam yang lalu' },
        { type: 'error', text: 'Milestone 2 kontrak #2025-05 belum terpenuhi (deadline 7 hari lalu).', subtext: 'Analisis AI • 5 jam yang lalu' },
        { type: 'error', text: 'Potensi risiko kepatuhan: SLA laporan bulanan terlambat 2 kali.', subtext: 'Deteksi AI Pattern • 1 hari yang lalu' },
        { type: 'success', text: 'Kontrak #2025-03 dengan Vendor B berjalan sesuai timeline.', subtext: 'Update AI • 3 jam yang lalu' },
    ];
    
    const notificationConfig: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
        warning: { icon: <WarningIcon className="w-6 h-6 text-yellow-500" />, color: 'bg-yellow-50 border-yellow-400' },
        error: { icon: <ErrorIcon className="w-6 h-6 text-red-500" />, color: 'bg-red-50 border-red-400' },
        success: { icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />, color: 'bg-green-50 border-green-400' }
    };

    return (
        <div className="font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<CheckCircleIcon className="w-8 h-8 text-green-500" />} value="24" title="Kontrak Aktif" subtitle="Berjalan normal" colorClass="border-green-500" />
                    <StatCard icon={<WarningIcon className="w-8 h-8 text-yellow-500" />} value="7" title="Mendekati Jatuh Tempo" subtitle="< 30 hari" colorClass="border-yellow-500" />
                    <StatCard icon={<ErrorIcon className="w-8 h-8 text-red-500" />} value="3" title="Expired" subtitle="Perlu tindakan" colorClass="border-red-500" />
                    <StatCard icon={<BarChartIcon className="w-8 h-8 text-blue-500" />} value="89%" title="Tingkat Kepatuhan" subtitle="SLA performance" colorClass="border-blue-500" />
                </div>

                {/* Timeline Graph */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Grafik Timeline Kontrak</h2>
                    <div className="space-y-2">
                        {contractTimelines.map(item => <TimelineBar key={item.id} {...item} />)}
                    </div>
                </div>

                {/* AI Notifications Panel */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800">Panel Notifikasi Otomatis (AI-Powered)</h2>
                        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                            <AiIcon className="w-5 h-5" />
                            <span>AI Monitoring Active</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {notifications.map((notif, index) => (
                           <NotificationItem 
                                key={index} 
                                icon={notificationConfig[notif.type].icon}
                                colorClass={notificationConfig[notif.type].color}
                                text={notif.text}
                                subtext={notif.subtext}
                           />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
