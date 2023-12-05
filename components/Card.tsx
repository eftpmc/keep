import React, { useState } from 'react';

type CardProps = {
  card: {
    title: string;
    imageUrl: string;
    description?: string;
    link?: string;
  };
  onRemove: () => void;
};

const Card: React.FC<CardProps> = ({ card, onRemove }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  if (!card) {
    return null;
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card flex flex-col items-center" onClick={handleFlip}>
      <div className={`flip-card-inner "w-full bg-gray-200 flex justify-center items-center cursor-pointer ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <img src={card.imageUrl} alt={card.title} className="card-image w-full block" />
        </div>
        <div className="flip-card-back flex flex-col items-center justify-evenly">
          <h1 className='font-bold'>{card.title}</h1>
          {card.description && <p className='overflow-hidden'>{card.description}</p>}
          {card.link && (
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              Link
            </a>
          )}
          <button onClick={onRemove} className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
