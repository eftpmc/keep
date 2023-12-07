import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type CardFormProps = {
  onSubmit: (title: string, file: File | null, link?: string, description?: string) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLinkChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  newTitle: string;
  newLink: string;
  newDescription: string;
  inputKey: number;
};

const CardForm: React.FC<CardFormProps> = ({ onSubmit, onTitleChange, onImageChange, onLinkChange, onDescriptionChange, onClose, newTitle, newLink, newDescription, inputKey }) => {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e);
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFormSubmit = () => {
    setError('');

    if (newTitle.trim().length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    }

    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    onSubmit(newTitle, selectedFile, newLink, newDescription);
  };

  return (
    <div className="bg-background p-4 rounded-md mx-auto min-w-[300px]">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          className="form-input px-4 py-2 w-full md:w-1/3 bg-gray-700 text-white rounded-md"
          type="text"
          value={newTitle}
          onChange={onTitleChange}
          placeholder="Enter title"
        />
        <input
          className="form-input px-4 py-2 w-full md:w-1/3 bg-gray-700 text-white rounded-md file:bg-gray-600 file:border-none file:text-white"
          key={inputKey}
          type="file"
          onChange={handleFileChange}
        />
        <input
          className="form-input px-4 py-2 w-full md:w-1/3 bg-gray-700 text-white rounded-md"
          type="url"
          value={newLink}
          onChange={onLinkChange}
          placeholder="Enter link (optional)"
        />
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <input
          className="form-input px-4 py-2 w-full bg-gray-700 text-white rounded-md"
          type="text"
          value={newDescription}
          onChange={onDescriptionChange}
          placeholder="Enter description (optional)"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={handleFormSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Add Card
        </button>
        <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CardForm;
