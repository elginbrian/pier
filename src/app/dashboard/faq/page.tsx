'use client';
import Accordion from '@/components/Accordion';

export default function FAQPage() {
  const faqData = [
    {
      id: '1',
      question: 'Apa itu PIER?',
      answer: 'PIER adalah platform manajemen kontrak berbasis AI yang digunakan PT ILCS untuk mempermudah pengelolaan seluruh siklus hidup kontrak, mulai dari pendaftaran vendor, pengajuan proposal, drafting kontrak, hingga monitoring kontrak secara real-time.'
    },
    {
      id: '2',
      question: 'Mengapa  harus melakukan registrasi vendor pada platform PIER?',
      answer: 'no info...'
    },
    {
      id: '3',
      question: 'Dokumen apa saja yang perlu disiapkan untuk registrasi vendor?',
      answer: 'no info...'
    },
    {
      id: '4',
      question: 'Berapa lama proses verifikasi vendor?',
      answer: 'no info...'
    },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1
          className="text-3xl text-center mb-2"
          style={{ 
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: '700',
            color: '#000000'
          }}
        >
          Pertanyaan Yang Sering Diajukan
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <Accordion 
          items={faqData}
          allowMultiple={false}
        />
      </div>
    </div>
  );
}