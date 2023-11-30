"use client"

import React, { useState } from 'react';
import Card from '@/components/Card';
import CardForm from '@/components/CardForm';

type CardType = {
  title: string;
  imageUrl: string;
};

const Home: React.FC<{ isModalOpen: boolean; hideModal: () => void }> = ({ isModalOpen, hideModal }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());
  const currentDate = new Date().toLocaleDateString();

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
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, cardIndex) => cardIndex !== index));
  };


  return (
    <div className="flex-1 flex flex-col relative justify-center items-center">
      <div className="absolute top-0 left-0 m-4">
        {currentDate}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent z-50 flex justify-center items-center">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
        {cards.map((card, index) => (
          <Card key={index} card={card} onRemove={() => removeCard(index)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
