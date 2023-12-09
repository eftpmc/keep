import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = card.imageUrl;
    link.download = card.title.replace(/\s+/g, '-') + "-image"; // Create a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-0 right-2 px-2 py-1 text-2xl leading-none text-purple hover:text-purple/90">...</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{card.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownload}>
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onRemove}>
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Card;
