import React, { useState } from "react";
import { Markup } from "../classes/Project";

interface AddMarkupFormProps {
  onSubmit: (markup: Markup) => void;
}

const AddMarkupForm: React.FC<AddMarkupFormProps> = ({ onSubmit }) => {
  const [hours, setHours] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const markup: Markup = {
      date: new Date(),
      hours: hours || 0,
      description: description,
    };
    onSubmit(markup);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="hours">Hours:</label>
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          placeholder="Enter used hours"
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          maxLength={1024}
          placeholder="Enter description"
        />
      </div>
      <button type="submit">Add Markup</button>
    </form>
  );
};

export default AddMarkupForm;
