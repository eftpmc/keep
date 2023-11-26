"use client"

import React, { useState } from 'react';
import Card from '@/components/Card';
import CardForm from '@/components/CardForm';

type CardType = {
  title: string;
  imageUrl: string;
};

const Home: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addCard = () => {
    const newCard: CardType = { title: newTitle, imageUrl: newImage };
    setCards([...cards, newCard]);
    setNewTitle('');
    setNewImage('');
    setInputKey(Date.now());
    setIsModalOpen(false);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, cardIndex) => cardIndex !== index));
  };

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={showModal} className="p-2 bg-blue-500 text-white rounded">Add Card</button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="absolute z-60">
            <CardForm
              onSubmit={addCard}
              onTitleChange={(e) => setNewTitle(e.target.value)}
              onImageChange={handleImageChange}
              onClose={hideModal}
              newTitle={newTitle}
              inputKey={inputKey}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} onRemove={() => removeCard(index)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
