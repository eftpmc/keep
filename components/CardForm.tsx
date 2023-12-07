"use client"

import React, { useState } from 'react';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export const cardFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  image: z.any(),
  link: z.string()
  .optional()
  .refine((val) => !val || isValidUrl(val), {
    message: "Invalid URL",
  }),
  description: z.string().optional(),
});

export type CardFormData = z.infer<typeof cardFormSchema>;

type CardFormProps = {
  onSubmit: (data: CardFormData) => void;
};

function isValidUrl(string : string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      title: '',
      image: new File([], ""),
      link: '',
      description: '',
    },
  })

  const handleFormSubmit = (values: CardFormData) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>
                This is your cards title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image
              </FormLabel>
              <FormControl>
                <Input
                  className='file:text-white'
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormDescription>Upload an image for your card.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter link (optional)" {...field} />
              </FormControl>
              <FormDescription>
                Include a link for more details.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description (optional)" {...field} />
              </FormControl>
              <FormDescription>
                Add a brief description of your card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CardForm;