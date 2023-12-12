import React from 'react';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/utils"

type DatePickerProps = {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, setSelectedDate }) => {

    const formatDate = (date: Date | undefined) => {
        return date ? date.toLocaleDateString() : new Date().toLocaleDateString();
    };

    const getDate = () => {
        return new Date();
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{formatDate(selectedDate)}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change date</DialogTitle>
                    <DialogDescription>
                        Change the date to view past and future cards.
                    </DialogDescription>
                </DialogHeader>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => setSelectedDate(date || getDate())}
                        />
                    </PopoverContent>
                </Popover>
            </DialogContent>
        </Dialog>
    )
}

export default DatePicker;