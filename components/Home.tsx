"use client"

import React, { useState } from 'react';
import AddButton from '@/components/AddButton';

type Card = {
  title: string;
  imageUrl: string;
};

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addCard = () => {
    const newCard: Card = { title: newTitle, imageUrl: newImage };
    setCards([...cards, newCard]);
    setNewTitle(''); // Reset the title input
    setNewImage(''); // Reset the image input
    setInputKey(Date.now());
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, cardIndex) => cardIndex !== index));
  };


  return (
    <div>
<div className="flex flex-col items-center gap-4 mb-4 p-4 border border-gray-300 rounded-md bg-gray-800">
        <input
          className="form-input px-4 py-2 bg-gray-700 text-white rounded-md"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter title"
        />
        <input
          className="form-input px-4 py-2 bg-gray-700 text-white rounded-md file:bg-gray-600 file:border-none file:text-white"
          key={inputKey}
          type="file"
          onChange={handleImageChange}
        />
            <button onClick={addCard}>
      Add Item
    </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col items-center w-36">
            {card.imageUrl && (
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 flex justify-center items-center">
                <img src={card.imageUrl} alt={card.title} className="max-w-full max-h-full" />
              </div>
            )}
            <div className="mt-2 text-center">{card.title}</div>
            <button
              onClick={() => removeCard(index)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
