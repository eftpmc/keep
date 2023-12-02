import React from 'react';

type CardProps = {
  card: {
    title: string;
    imageUrl: string;
    link?: string;
  };
  onRemove: () => void;
};

const Card: React.FC<CardProps> = ({ card, onRemove }) => {
  if (!card) {
    return null;
  }

  const imageContent = card.imageUrl ? (
    <img src={card.imageUrl} alt={card.title} className="w-full" />
  ) : null;

  return (
    <div className="flex flex-col items-center">
      {imageContent && (
        <div className="w-full bg-gray-200 flex justify-center items-center">
          {card.link ? (
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              {imageContent}
            </a>
          ) : (
            imageContent
          )}
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


