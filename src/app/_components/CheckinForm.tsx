/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as z from "zod";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SetStateAction, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "../auth/actions";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface Location {
  value: string;
  label: string;
  open: boolean;
}

interface FormValues {
  items: {
    location: Location;
    quantity?: number;
  }[];
  location: string;
}

const items = [
  {
    value: "item_1",
    label: "Item 1",
  },
  {
    value: "item_2",
    label: "Item 2",
  },
  {
    value: "item_3",
    label: "Item 3",
  },
];

const locations = [
  {
    value: "location_1",
    label: "Location 1",
  },
  {
    value: "location_2",
    label: "Location 2",
  },
  {
    value: "location_3",
    label: "Location 3",
  },
];

export default function CheckinForm() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [value, setValue] = useState("");
  const form = useForm<FormValues>({
    defaultValues: {
      items: [],
      location: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items", // The key of the field array
  });

  function onSubmit(data: unknown) {
    console.log("form submitted", data);

    toast({
      title: "Data:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          Sucessfully Registered:
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-2/5 flex-1 rounded-md border p-5 shadow-md">
      <p className="text-center font-medium">Checkin Order</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl className="w-full">
                  <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={locationOpen}
                        disabled
                        className="w-full justify-between"
                      >
                        {value
                          ? locations.find(
                              (location) => location.value === value,
                            )?.label
                          : "Select pickup location..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput
                          disabled
                          placeholder="Search framework..."
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {locations.map((location) => (
                            <CommandItem
                              key={location.value}
                              value={location.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue,
                                );
                                setLocationOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === location.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {location.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between p-1">
            <span>Items</span>
            <span>Quantity</span>
          </div>
          {fields.map((field, index) => (
            <div key={index} className="flex space-x-3">
              <Controller
                key={field.id}
                name={`items.${index}.location`}
                control={form.control}
                render={({
                  field: { onChange, value: fieldValue },
                  fieldState: { error },
                }) => {
                  const value = fieldValue;
                  return (
                    <Popover
                      open={value?.open || false}
                      onOpenChange={(isOpen) =>
                        onChange({ ...value, open: isOpen })
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={value.open || false}
                          className="w-[70%] justify-between"
                        >
                          {value.label || "Select items..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Search items..." />
                          <CommandEmpty>No items found.</CommandEmpty>
                          <CommandGroup>
                            {items.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                  onChange({
                                    ...value,
                                    label: item.label,
                                    value: item.value,
                                    open: false,
                                  });
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value.value === item.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
              <Controller
                name={`items.${index}.quantity`}
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="1" // Ensure quantity is at least 1
                    placeholder="Quantity"
                    className="w-[30%]" // Adjust width as necessary
                  />
                )}
              />
            </div>
          ))}
          <Button
            className="w-full"
            type="button"
            onClick={() =>
              append({
                location: { value: "", label: "", open: false },
              })
            }
          >
            Add Item
          </Button>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
