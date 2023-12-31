"use client"

import React, { useState, useEffect } from 'react';
import * as z from "zod"
import Card from '@/components/Card';
import CardForm, { cardFormSchema, CardFormData } from '@/components/CardForm';
import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE!);

type CardType = {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
  createdDate?: string;
};

type HomeProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};


type GroupedCardsType = Record<string, CardType[]>;

type SwapState = {
  isSwapping: boolean;
  swapCardId: number | null;
};

const Home: React.FC<HomeProps> = ({ selectedDate, setSelectedDate }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [groupedCards, setGroupedCards] = useState<GroupedCardsType>({});
  const [swapState, setSwapState] = useState<SwapState>({ isSwapping: false, swapCardId: null });

  const startSwap = (cardId: number) => {
    setSwapState({ isSwapping: true, swapCardId: cardId });
  };

  const completeSwap = (targetCardId: number) => {
    if (!swapState.isSwapping || swapState.swapCardId === null) return;

    const newCards = [...cards];
    const index1 = newCards.findIndex(card => card.id === swapState.swapCardId);
    const index2 = newCards.findIndex(card => card.id === targetCardId);

    if (index1 !== -1 && index2 !== -1) {
      [newCards[index1], newCards[index2]] = [newCards[index2], newCards[index1]];
      setCards(newCards);
    }

    setSwapState({ isSwapping: false, swapCardId: null });
  };

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

  const groupCardsByDate = (cards: CardType[]): GroupedCardsType => {
    return cards.reduce((acc, card) => {
      const date = card.createdDate?.split('T')[0] || "Unknown Date"; // Default to "Unknown Date" if createdDate is undefined
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(card);
      return acc;
    }, {} as GroupedCardsType);
  };

  const sortDatesDescending = (dates: string[]) => {
    return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  const sortDatesAscending = (dates: string[]) => {
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  };

  useEffect(() => {
    const fetchCards = async () => {

      const timezoneOffset = new Date().getTimezoneOffset();
      const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset * 60000);
      const formattedDate = adjustedDate.toISOString().split('T')[0];

      try {
        const response = await fetch(`/api/getCards?date=${formattedDate}&timezoneOffset=${timezoneOffset}`);
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

        const fetchedGroupedCards = groupCardsByDate(cardsWithNewImages);

        setGroupedCards(fetchedGroupedCards);
        setCards(cardsWithNewImages);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [selectedDate]);

  const addCard = async (formData: z.infer<typeof cardFormSchema>) => {
    const createdDate = selectedDate.toISOString();
    const { title, image, link, description } = formData;
    const imageUrl = URL.createObjectURL(image)

    const newCard = { title: title, imageUrl: imageUrl, description: description, link: link, createdDate };

    try {
      if (image) {

        const options = {
          maxSizeMB: 1, // (Max file size in MB)
          maxWidthOrHeight: 1920, // (Compressed files are resized to these dimensions)
          useWebWorker: true // (Offload to a web worker)
        };

        try {
          const compressedFile = await imageCompression(image, options);
          const timestamp = Date.now();
          const sanitizedFileName = compressedFile.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() + `-${timestamp}`;

          const { data, error } = await supabase.storage
            .from('card-images')
            .upload(`images/${sanitizedFileName}`, compressedFile, {
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
        } catch (error) {
          console.error('Error during image compression:', error);
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
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleEditCard = async (
    id: number,
    newTitle: string,
    newLink: string,
    newDescription: string
  ) => {
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, title: newTitle, link: newLink, description: newDescription };
      }
      return card;
    });
    setCards(updatedCards);

    try {
      const { error } = await supabase
        .from('cards')
        .update({ title: newTitle, link: newLink, description: newDescription })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating card:', error);
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
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <CardForm onSubmit={addCard} />
        </DialogContent>

        <div className={`masonry-grid ${cards.length === 0 ? 'empty' : ''}`}>
          {cards.map((card, index) => (
            <div key={index} className="masonry-card">
              <Card
                key={card.id}
                card={card}
                isSwapping={swapState.isSwapping}
                onRemove={() => removeCard(index)}
                onEdit={handleEditCard}
                onStartSwap={startSwap}
                onCompleteSwap={completeSwap}
              />
            </div>
          ))}
          {/*           {sortDatesAscending(Object.keys(groupedCards)).map((date) => (
            <div
              key={date}
              style={{ minHeight: '100vh' }} // Set minimum height to full viewport height
              className="pt-4" // Add padding top to create some space
            >
              <h2 className="text-lg font-bold my-4">{date}</h2>
              <div className="masonry-grid">
                {groupedCards[date].map((card, index) => (
                  <div key={card.id} className="masonry-card">
                    <Card
                      card={card}
                      onRemove={() => removeCard(index)}
                      onEdit={handleEditCard}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))} */}
          <DialogTrigger asChild>
            <button className="dialog-trigger mx-auto flex items-center justify-center min-w-[150px] min-h-[150px] border-2 border-dashed border-purple bg-background text-purple rounded-md text-4xl">
              +
            </button>
          </DialogTrigger>
        </div>
      </Dialog>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} card={card} onRemove={() => removeCard(index)} />
        ))}
      </div> */}
    </div>
  );
};

export default Home;