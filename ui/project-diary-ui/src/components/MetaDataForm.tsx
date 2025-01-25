import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fi } from "date-fns/locale";
import { FormFieldMetadata } from "../config/Metadata";

registerLocale("fi", fi);

interface MetaDataFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  formMetadata: FormFieldMetadata;
  isEdit: boolean;
  editableObject: { [key: string]: any };
}

const MetaDataForm: React.FC<MetaDataFormProps> = ({
  onSubmit,
  onClose,
  formMetadata,
  isEdit,
  editableObject,
}) => {
  const initialFormData = Object.keys(formMetadata).reduce((acc, key) => {
    if (isEdit && editableObject) {
      acc[key] = editableObject[key];
    } else {
      acc[key] = formMetadata[key].type === "date" ? new Date() : "";
    }
    return acc;
  }, {} as { [key: string]: any });
  const [formData, setFormData] = useState<{ [key: string]: any }>(
    initialFormData
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value),
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      date,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formMetadata).map((key) => {
        const metadata = formMetadata[key as keyof typeof formMetadata];
        if (metadata.type === "textarea") {
          return (
            <div key={metadata.id} className="form-group">
              <label htmlFor={metadata.id}>{metadata.id}</label>
              <textarea
                id={metadata.id}
                name={metadata.name}
                placeholder={metadata.placeholder}
                rows={metadata.rows}
                maxLength={metadata.maxLength}
                onChange={handleChange}
                value={formData[metadata.name] || ""}
                required={metadata.required}
              />
            </div>
          );
        } else if (metadata.type === "date") {
          return (
            <div key={metadata.id} className="form-group">
              <label htmlFor={metadata.id}>{metadata.id}</label>
              <DatePicker
                locale="fi"
                selected={formData[metadata.name]}
                onChange={handleDateChange}
                onSelect={(date) => handleDateChange(date)}
                placeholderText={metadata.placeholder}
                value={formData[metadata.name]}
                required={metadata.required}
              />
            </div>
          );
        } else {
          return (
            <div key={metadata.id} className="form-group">
              <label htmlFor={metadata.id}>{metadata.id}</label>
              <input
                id={metadata.id}
                name={metadata.name}
                type={metadata.inputType}
                placeholder={metadata.placeholder}
                onChange={handleChange}
                value={formData[metadata.name] || ""}
                required={metadata.required}
              />
            </div>
          );
        }
      })}
      <div className="button-container">
        <button
          className="form-submit-btn cancel-btn"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
        <button className="form-submit-btn" type="submit">
          {isEdit ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default MetaDataForm;
