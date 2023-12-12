import React, { useState } from 'react';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type CardProps = {
  card: {
    id: number;
    title: string;
    imageUrl: string;
    description?: string;
    link?: string;
  };
  onRemove: () => void;
  onEdit: (id: number, title: string, link: string, description: string) => void;
};

const Card: React.FC<CardProps> = ({ card, onRemove, onEdit }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editLink, setEditLink] = useState(card.link || '');
  const [editDescription, setEditDescription] = useState(card.description || '');

  if (!card) {
    return null;
  }

  const handleFlip = () => {

    setIsFlipped(!isFlipped);

  };

  const handleEdit = async () => {
    setIsLoading(true);
    await onEdit(card.id, editTitle, editLink, editDescription);
    setIsLoading(false);
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
    <Sheet>
      <div className="flip-card flex flex-col items-center">
        <div className={`flip-card-inner "w-full bg-gray-200 flex justify-center items-center cursor-pointer ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-front" onClick={handleFlip}>
            <img src={card.imageUrl} alt={card.title} className="card-image w-full block" />
          </div>
          <div className="flip-card-back flex flex-col items-center justify-evenly" onClick={handleFlip}>
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
                <SheetTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </SheetTrigger>
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
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Edit Card</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <Input
            value={editLink}
            onChange={(e) => setEditLink(e.target.value)}
            placeholder="Link"
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
          />
          <Button onClick={handleEdit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Save Changes"
          )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Card;
