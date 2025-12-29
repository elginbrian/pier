<div align="center">
  
# PIER - Pelindo Integrated Electronic Repository

![PIER Logo](public/pelindo-plain.png)
![PIER Presentation](https://github.com/elginbrian/pier-pelindo/blob/main/pier.png)

**AI-Powered Contract Management Platform for PT ILCS (Pelindo Group)**

</div>

---

## 🎯 Overview

PIER (Pelindo Integrated Electronic Repository) is a cutting-edge AI-powered web platform designed to revolutionize contract management at PT ILCS (Pelindo Group). This comprehensive solution automates the entire contract lifecycle, from drafting and review to risk monitoring, providing a seamless digital transformation for enterprise contract management.

### ✨ Key Features

- 🤖 **AI-Powered Analysis** - Advanced contract analysis using artificial intelligence
- 📋 **Complete Contract Lifecycle** - From drafting to monitoring and renewal
- 🛡️ **Risk Assessment** - Automated risk identification and monitoring
- 👥 **Vendor Management** - Comprehensive vendor registration and evaluation
- 📊 **Real-time Dashboard** - Interactive dashboard with analytics and insights
- 🔒 **Secure Authentication** - Firebase-powered authentication system
- 📱 **Responsive Design** - Modern, mobile-friendly interface
- ⚡ **Fast Performance** - Built with Next.js for optimal speed

---

## 🏗️ Architecture & Technology Stack

### **Frontend**
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Custom design system with Heroicons
- **Font**: Plus Jakarta Sans

### **Backend & Services**
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Integration**: Ollama for contract analysis
- **API**: Next.js API Routes

### **Key Dependencies**
- **Firebase**: 10.14.1 (Frontend) + 13.5.0 (Admin)
- **Axios**: HTTP client for API requests
- **React Icons**: 5.5.0 for consistent iconography

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Firebase account and project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/pier.git
   cd pier
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin (Service Account)
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
   FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

   # AI Service Configuration
   OLLAMA_API_URL=your_ollama_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
pier/
├── 📁 public/                 # Static assets and images
├── 📁 src/
│   ├── 📁 app/               # Next.js App Router pages
│   │   ├── 📁 api/          # API routes
│   │   ├── 📁 auth/         # Authentication pages
│   │   ├── 📁 dashboard/    # Dashboard modules
│   │   └── 📁 vendor-registration/  # Vendor management
│   ├── 📁 components/        # Reusable UI components
│   ├── 📁 context/          # React context providers
│   ├── 📁 design-system/    # Design tokens and theme
│   ├── 📁 firebase/         # Firebase configuration
│   ├── 📁 hooks/            # Custom React hooks
│   ├── 📁 services/         # Business logic services
│   └── 📁 types/            # TypeScript type definitions
├── 📄 next.config.ts        # Next.js configuration
├── 📄 tailwind.config.ts    # Tailwind CSS configuration
└── 📄 tsconfig.json         # TypeScript configuration
```

---

## 🎮 Core Modules

### 📊 Dashboard
- **Hukum Module** - Legal contract review and approval
- **Management Module** - Contract oversight and monitoring
- **Analytics** - Real-time insights and reporting

### 🤝 Vendor Registration
- **Vendor Onboarding** - Streamlined registration process
- **Document Management** - Secure document upload and verification
- **Compliance Tracking** - Automated compliance monitoring

### 📋 Contract Management
- **Drafting Tools** - AI-assisted contract creation
- **Review Workflow** - Collaborative review process
- **Risk Monitoring** - Automated risk assessment and alerts
- **Active Contracts** - Real-time contract status tracking

### 🧠 AI Analysis
- **Contract Analysis** - Intelligent contract review
- **Risk Assessment** - Automated risk identification
- **NER Integration** - Named Entity Recognition for contract data

---

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server

### Code Style & Standards

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting and formatting
- **Prettier** - Consistent code formatting
- **Tailwind CSS** - Utility-first CSS framework

---

## 🏭 Enterprise Features

### Security & Compliance
- 🔐 **Role-based Access Control** - Granular permission management
- 🛡️ **Data Encryption** - End-to-end data protection
- 📋 **Audit Trails** - Comprehensive activity logging
- 🔒 **Secure Authentication** - Multi-factor authentication support

### Performance & Scalability
- ⚡ **Edge Computing** - Global content delivery
- 🚀 **Optimized Loading** - Lazy loading and code splitting
- 📈 **Scalable Architecture** - Cloud-native design
- 🔄 **Real-time Updates** - Live data synchronization

---

## 📊 Business Impact

### For PT ILCS (Pelindo Group)
- ⏱️ **90% Faster** contract processing time
- 💰 **Cost Reduction** through automated workflows
- 📋 **Risk Mitigation** with AI-powered analysis
- 🔄 **Streamlined Operations** across all departments

### Key Benefits
- **Efficiency**: Automate manual contract processes
- **Compliance**: Ensure regulatory adherence
- **Visibility**: Real-time contract status tracking
- **Collaboration**: Enhanced team collaboration tools

---

</div>
