import { useState } from 'react';
import { FormData, INITIAL_FORM_DATA } from './constants';

export const useVendorForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleVendorTypeSelect = (option: string) => {
    handleInputChange('tipeVendor', option);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  return {
    formData,
    handleInputChange,
    handleFileChange,
    handleVendorTypeSelect,
    handleSubmit,
    resetForm
  };
};