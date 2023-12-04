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
  link?: string;
  createdDate?: string;
};

const formatDateForSupabase = (inputDate: Date | string): string => {
  let date = new Date(inputDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

type HomeProps = {
  isFormOpen: boolean;
  hideForm: () => void;
  selectedDate: Date;
};

const Home: React.FC<HomeProps> = ({ isFormOpen, hideForm, selectedDate }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newFile, setNewFile] = useState<File>();
  const [newLink, setNewLink] = useState('');
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

      const formattedDate = formatDateForSupabase(selectedDate);

      try {
        const response = await fetch(`/api/getCards?date=${formattedDate}`);
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
  }, [selectedDate]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setNewFile(file);

      const imageUrl = URL.createObjectURL(event.target.files[0])
      //const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/card-images/${data.path}`;
      setNewImage(imageUrl);
    }
  };

  const addCard = async () => {
    const newCard = { title: newTitle, imageUrl: newImage, link: newLink };

    try {
      if (newFile != undefined) {
        const timestamp = Date.now();
        const sanitizedFileName = newFile.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() + `-${timestamp}`;

        const { data, error } = await supabase.storage
          .from('card-images')
          .upload(`images/${sanitizedFileName}`, newFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (data != null) {
          newCard.imageUrl = data.path
        }

        if (error) {
          console.error('Error uploading image:', error);
          return;
        }
      }


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
      const addedCard = responseData[0];

      const newImageUrl = await fetchImage(addedCard.imageUrl);
      if (newImageUrl) {
        addedCard.imageUrl = newImageUrl;
      }

      setCards([...cards, addedCard]);
      setNewTitle('');
      setNewImage('');
      setNewLink('');
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
      {isFormOpen && (
        <div className="flex w-full z-50 flex justify-center items-center">
          <CardForm
            onSubmit={addCard}
            onTitleChange={(e) => setNewTitle(e.target.value)}
            onImageChange={handleImageChange}
            onLinkChange={(e) => setNewLink(e.target.value)}
            onClose={hideForm}
            newTitle={newTitle}
            newLink={newLink}
            inputKey={inputKey}
          />
        </div>
      )}

      <div className="masonry-grid">
        {cards.map((card, index) => (
          <div key={index} className="masonry-card">
            <Card card={card} onRemove={() => removeCard(index)} />
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} onRemove={() => removeCard(index)} />
        ))}
      </div> */}
    </div>
  );
};

export default Home;