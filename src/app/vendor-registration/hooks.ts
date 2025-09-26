"use client";

import { useCallback, useState } from "react";
import { FormData, INITIAL_FORM_DATA } from "./constants";
import vendorService from "../../services/vendorRegistration";

type FieldKey = keyof FormData;

export type FormErrors = Partial<Record<FieldKey, string>>;

const ALLOWED_TYPES = ["application/pdf"];

export const useVendorForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = useCallback((field: FieldKey, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFile = useCallback((field: FieldKey, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  }, []);

  const validateField = useCallback(
    (field: FieldKey, value?: any): string | null => {
      const v = value === undefined ? (formData as any)[field] : value;

      switch (field) {
        case "tipeVendor":
          if (!v || (typeof v === "string" && v.trim() === "")) return "Pilih tipe vendor.";
          return null;

        case "emailVendor":
          if (!v) return "Email wajib diisi.";
          if (typeof v === "string") {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(v)) return "Format email tidak valid.";
          }
          return null;

        case "namaVendor":
          if (!v) return "Nama vendor wajib diisi.";
          return null;

        case "noNpwpVendor":
          if (!v) return "No. NPWP / Phone wajib diisi.";
          return null;

        case "dokumenAdmin":
        case "dokumenLegal":
        case "dokumenTeknikal":
        case "dokumenFinansial":
          if (!v) return "Silakan lampirkan dokumen ini (PDF).";
          if (v instanceof File) {
            if (!ALLOWED_TYPES.includes(v.type)) return "Hanya file PDF yang diperbolehkan.";
            if (v.size > 5 * 1024 * 1024) return "Ukuran file maksimal 5MB.";
          }
          return null;

        default:
          return null;
      }
    },
    [formData]
  );

  const validateAll = useCallback((): { valid: boolean; errors: FormErrors } => {
    const next: FormErrors = {};
    (Object.keys(formData) as FieldKey[]).forEach((k) => {
      const err = validateField(k);
      if (err) next[k] = err;
    });
    setErrors(next);
    return { valid: Object.keys(next).length === 0, errors: next };
  }, [formData, validateField]);

  const markTouched = useCallback((field: FieldKey) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
  }, []);

  const isValid = Object.keys(errors).length === 0;

  const submit = useCallback(
    async (opts?: { userId?: string | null }) => {
      const { valid, errors: allErrors } = validateAll();
      if (!valid) return { ok: false, errors: allErrors };

      setSubmitting(true);
      try {
        const files: Record<string, File | null> = {
          dokumenAdmin: (formData as any).dokumenAdmin,
          dokumenLegal: (formData as any).dokumenLegal,
          dokumenTeknikal: (formData as any).dokumenTeknikal,
          dokumenFinansial: (formData as any).dokumenFinansial,
        };

        const payload = {
          tipeVendor: (formData as any).tipeVendor,
          emailVendor: (formData as any).emailVendor,
          namaVendor: (formData as any).namaVendor,
          noNpwpVendor: (formData as any).noNpwpVendor,
          userId: opts?.userId ?? null,
        };

        const result = await vendorService.submitVendorRegistration(payload, files);
        setSubmitting(false);
        return { ok: true, result };
      } catch (e: any) {
        setSubmitting(false);
        return { ok: false, error: e };
      }
    },
    [formData, validateAll]
  );

  return {
    formData,
    setField,
    setFile,
    validateField,
    validateAll,
    errors,
    touched,
    markTouched,
    resetForm,
    isValid,
    submit,
    submitting,
  };
};
