import React from 'react';

type CardProps = {
  card: {
    title: string;
    imageUrl: string;
  };
  onRemove: () => void;
};

const Card: React.FC<CardProps> = ({ card, onRemove }) => {
  if (!card) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      {card.imageUrl && (
        <div className="w-full bg-gray-200 flex justify-center items-center">
          <img src={card.imageUrl} alt={card.title} className="w-full" />
        </div>
      )}
      <div className="mt-2 text-center">{card.title}</div>
      <button onClick={onRemove} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
        Remove
      </button>
    </div>
  );
};

export default Card;

