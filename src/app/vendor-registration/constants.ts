// Data constants for vendor registration
export const VENDOR_TYPES = [
  "Logistics Service Provider",
  "Goods Supplier",
  "Construction Service Provider",
  "Consulting Service Provider",
  "Maintenance Service Provider",
  "IT Service Provider",
  "Cleaning Service Provider",
  "Security Service Provider",
  "Other",
];

export const DOCUMENT_SECTIONS = [
  {
    id: "administrative",
    title: "Administrative Documents",
    items: [
      "Application letter for selected business actors",
      "Integrity pact",
      "Statement Letter and Committee as Partners in the PT ILCS Area in order to create a Clean Port (Without fraud, Collusion, Corruption and Nepotism) and Negotation (Good Corporate Governance (GCG))",
    ],
  },
  {
    id: "legality",
    title: "Legality Documents",
    items: [
      "Copy (photocopy) of the Deed of Establishment and its amendments (if any) and attached with ratification and/or approval from the Minister of Law and Human Rights",
      "Copy (photocopy) of Company Domicile Certificate",
      "Copy (photocopy) of Company Business License / NIB",
      "Copy (photocopy) of Company Registration Certificate",
      "Copy (photocopy) of Letter of Determination of Taxpayer Identification Number and Taxable Entrepreneur",
      "Integrity pact",
    ],
  },
  {
    id: "technical",
    title: "Technical document",
    items: ["Company Profile", "Job Experience List", "Certification (If any)"],
  },
  {
    id: "financial",
    title: "Financial Documents",
    items: ["Last Year Financial Report", "Copy (Photocopy) of the last Annual Tax Return"],
  },
  {
    id: "additional",
    title: "Additional Information",
    description: [
      "All personal data information provided through this website is confidential and used for purposes that are not in contrary with the applicable laws and regulations and as a fulfillment of the requirements in PT Integrasi Logistik Cipta Solusi. All information collected is only used for the purposes specified on the website, and we will not disclose any personal information to third parties, except with the owner's permission or under special conditions in accordance with applicable laws and regulations",
      "Relevant documents are attached as examples",
      "Vendor registration form consists of vendor identity and upload required documents",
    ],
  },
];

export const DOCUMENT_PREVIEWS = [
  {
    title: "Application letter for selected business actors",
    filename: "surat-permohonan-pelaku-usaha-terseleksi.docx",
    preview: "Application letter preview",
    downloadUrl: "https://firebasestorage.googleapis.com/v0/b/pier-pelindo.firebasestorage.app/o/templates%2Fsurat-permohonan-pelaku-usaha-terseleksi.docx?alt=media&token=2fff5956-ae72-4c4e-9889-e6dbfbe4631d",
  },
  {
    title: "Integrity pact",
    filename: "pakta-integritas.docx",
    preview: "Integrity pact preview",
    downloadUrl: "https://firebasestorage.googleapis.com/v0/b/pier-pelindo.firebasestorage.app/o/templates%2Fpakta-integritas.docx?alt=media&token=6955676d-39e3-4d37-a451-fa15c6195eeb",
  },
  {
    title: "Statement Letter and Committee as Partners in the PT ILCS Area",
    filename: "surat-pernyataan-dan-komiten-sebagai-mitra-di-wilayah-pt-integrasi-logistik-cipta-solusi.docx",
    preview: "Statement letter preview",
    downloadUrl: "https://firebasestorage.googleapis.com/v0/b/pier-pelindo.firebasestorage.app/o/templates%2Fsurat-pernyataan-dan-komiten-sebagai-mitra-di-wilayah-pt-integrasi-logistik-cipta-solusi.docx?alt=media&token=c4de9e3e-9766-4d64-8d09-cf37d8793eed",
  },
];

export interface FormData {
  tipeVendor: string;
  emailVendor: string;
  namaVendor: string;
  noNpwpVendor: string;
  dokumenAdmin: File | null;
  dokumenLegal: File | null;
  dokumenTeknikal: File | null;
  dokumenFinansial: File | null;
}

export const INITIAL_FORM_DATA: FormData = {
  tipeVendor: "",
  emailVendor: "",
  namaVendor: "",
  noNpwpVendor: "",
  dokumenAdmin: null,
  dokumenLegal: null,
  dokumenTeknikal: null,
  dokumenFinansial: null,
};
