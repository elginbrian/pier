import React from 'react';

// --- SVG Icon Components ---
// These are included directly in the file to maintain the single-file structure.

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DeliverablesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 6H3l-1 5 1 5h12l1-5-1-5z" />
        <path d="M3 11h13" />
        <path d="M19.5 9.5 21 11l-1.5 1.5" />
        <path d="m17 14 1.5 1.5-1.5 1.5" />
    </svg>
);


const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const MilestoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const SlaIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);


// --- Main Component ---
export default function Signature() {
  const deliverables = [
    "Implementation of an integrated logistics management system",
    "Operational team training and maintenance",
    "Technical documentation and user manual",
    "Support and maintenance for 12 months",
  ];

  const quickActions = [
    {
      icon: <DocumentIcon className="w-8 h-8 text-blue-400" />,
      title: "Contract Document",
      subtitle: "View complete contract"
    },
    {
      icon: <MilestoneIcon className="w-8 h-8 text-orange-400" />,
      title: "Milestone",
      subtitle: "Track achievements"
    },
    {
      icon: <SlaIcon className="w-8 h-8 text-green-400" />,
      title: "Monitoring SLA",
      subtitle: "Monitor performance"
    }
  ];

  return (
    <div className="bg-slate-50 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
            Contract Details
          </h1>

          {/* Date & Duration Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Contract Start Date</p>
                <p className="text-lg font-bold text-slate-800">1 January 2025</p>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <ClockIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-orange-700 font-medium">Contract Duration</p>
                <p className="text-lg font-bold text-slate-800">12 Months</p>
              </div>
            </div>
          </div>

          {/* Main Deliverables */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <DeliverablesIcon className="w-6 h-6 text-slate-500 mr-3"/>
                Main Deliverables
            </h2>
            <ul className="space-y-3">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Automatic Notification */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start mb-8">
            <div className="flex-shrink-0 mr-4">
              <BellIcon className="w-6 h-6 text-yellow-500 mt-0.5" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800">Automatic Notifications</h3>
              <p className="text-sm text-yellow-700">The system will send automatic reminders before milestones and contract deadlines.</p>
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
                Contract Progress Timeline
            </h2>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <p className="font-medium text-slate-600">20% Complete</p>
              <p className="text-slate-500">First Milestone Reached</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
                {quickActions.map((action, index) => (
                    <div key={index} className="bg-slate-700 hover:bg-slate-600 transition-colors duration-200 rounded-xl p-4 flex items-center cursor-pointer">
                        <div className="bg-slate-800 p-3 rounded-lg mr-4">
                           {action.icon}
                        </div>
                        <div>
                            <p className="font-semibold text-white">{action.title}</p>
                            <p className="text-sm text-slate-300">{action.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
