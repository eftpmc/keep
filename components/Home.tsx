"use client"

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import CardForm from '@/components/CardForm';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE!);

type CardType = {
  id?: number;
  title: string;
  imageUrl: string;
  createdDate?: string;
};

const Home: React.FC<{ isModalOpen: boolean; hideModal: () => void }> = ({ isModalOpen, hideModal }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());

  const fetchImage = async (imagePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("card-images")
        .download(imagePath);
      if (error) {
        throw error;
      }
      
      const imageUrl = URL.createObjectURL(data);
  
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };  

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/getCards');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedCards = await response.json();
        
        const cardsWithNewImages = await Promise.all(
          fetchedCards.map(async (card: { imageUrl: string; }) => {
            const newImageUrl = await fetchImage(card.imageUrl);
            return { ...card, imageUrl: newImageUrl };
          })
        );
  
        setCards(cardsWithNewImages);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const { data, error } = await supabase.storage
      .from('card-images')
      .upload(`images/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

      //const imageUrl = URL.createObjectURL(event.target.files[0])
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/card-images/${data.path}`;
      setNewImage(data.path);
    }
  };

  const addCard = async () => {
      const newCard = { title: newTitle, imageUrl: newImage };

      try {
        const response = await fetch('/api/addCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCard),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const addedCard =  responseData[0];

        const newImageUrl = await fetchImage(addedCard.imageUrl);
        if (newImageUrl) {
          addedCard.imageUrl = newImageUrl;
        }

        setCards([...cards, addedCard]);
        setNewTitle('');
        setNewImage('');
        setInputKey(Date.now());
      } catch (error) {
        console.error('Error adding card:', error);
      }
    };

    const removeCard = async (index: number) => {
      try {
        const response = await fetch('/api/removeCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cards[index].id),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setCards(cards.filter((_, cardIndex) => cardIndex !== index));
      } catch (error) {
        console.error('Error removing card:', error);
      }
    };


    return (
      <div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cards.map((card, index) => (
            <Card key={index} card={card} onRemove={() => removeCard(index)} />
          ))}
        </div>
      </div>
    );
  };

  export default Home;