import React, { useState } from 'react';

type CardFormProps = {
  onSubmit: (title: string, file: File | null) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  newTitle: string;
  inputKey: number;
};

const CardForm: React.FC<CardFormProps> = ({ onSubmit, onTitleChange, onImageChange, onClose, newTitle, inputKey }) => {
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

    onSubmit(newTitle, selectedFile);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-4 p-4 border border-gray-300 rounded-md bg-background w-full sm:w-auto">
      <input
        className="form-input px-4 py-2 bg-gray-700 text-white rounded-md"
        type="text"
        value={newTitle}
        onChange={onTitleChange}
        placeholder="Enter title"
      />
      {error && <div className="text-red-500">{error}</div>}
      <input
        className="form-input px-4 py-2 bg-gray-700 text-white rounded-md file:bg-gray-600 file:border-none file:text-white"
        key={inputKey}
        type="file"
        onChange={handleFileChange}
      />
      <button onClick={handleFormSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Item
      </button>
      <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
        Close
      </button>
    </div>
  );
};

export default CardForm;
