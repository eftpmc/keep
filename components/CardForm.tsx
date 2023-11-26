import React from 'react';

type CardFormProps = {
  onSubmit: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  newTitle: string;
  inputKey: number;
};

const CardForm: React.FC<CardFormProps> = ({ onSubmit, onTitleChange, onImageChange, onClose, newTitle, inputKey }) => (
  <div className="flex flex-col items-center gap-4 mb-4 p-4 border border-gray-300 rounded-md bg-gray-800">
    <input
      className="form-input px-4 py-2 bg-gray-700 text-white rounded-md"
      type="text"
      value={newTitle}
      onChange={onTitleChange}
      placeholder="Enter title"
    />
    <input
      className="form-input px-4 py-2 bg-gray-700 text-white rounded-md file:bg-gray-600 file:border-none file:text-white"
      key={inputKey}
      type="file"
      onChange={onImageChange}
    />
    <button onClick={onSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Add Item
    </button>
    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
      Close
    </button>
  </div>
);

export default CardForm;
