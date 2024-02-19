/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetStateAction, useEffect, useState } from "react";
import {
  createCheckoutOrder,
  fetchEvents,
  fetchItems,
  fetchLocations,
  fetchVolunteers,
} from "../monday/actions";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { CiSquareMinus } from "react-icons/ci";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "../auth/actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface Item {
  id: string;
  name: string;
  open: boolean;
}

interface FormValues {
  type: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    open: boolean;
  }[];
  volunteer: string;
  location: string;
  event: string;
}

// const items = [
//   {
//     id: "123456",
//     name: "Item 1",
//   },
//   {
//     id: "234567",
//     name: "Item 2",
//   },
//   {
//     id: "345678",
//     name: "Item 3",
//   },
// ];

// const locations = [
//   {
//     value: "location_1",
//     label: "Location 1",
//   },
//   {
//     value: "location_2",
//     label: "Location 2",
//   },
//   {
//     value: "location_3",
//     label: "Location 3",
//   },
// ];

export default function InventoryForm() {
  const router = useRouter();
  const [volunteers, setVolunteers] = useState([]);
  const [locations, setLocations] = useState();
  const [events, setEvents] = useState();
  const [items, setItems] = useState();
  const [locationOpen, setLocationOpen] = useState(false);
  const [value, setValue] = useState("");
  const form = useForm<FormValues>({
    defaultValues: {
      items: [],
      location: "5987200311",
    },
  });

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "items", // The key of the field array
  });

  function onSubmit(data: unknown) {
    console.log("form submitted", data);
    const result = createCheckoutOrder(data);

    toast({
      title: "Sucessfully Submitted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          Sucessfully Submitted:
          {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
        </pre>
      ),
    });
    form.reset();
    router.refresh();
  }

  useEffect(() => {
    // Call fetchData only if the user is authenticated
    const loadData = async () => {
      try {
        const fetchedLocations = await fetchLocations();
        const fetchedEvents = await fetchEvents();
        const fetchedItems = await fetchItems();
        const fetchedVolunteers = await fetchVolunteers();
        console.log("locations", fetchedLocations);
        console.log("events", fetchedEvents);
        console.log("items", fetchedItems);
        setLocations(fetchedLocations?.data.boards[0].items_page.items);
        setEvents(fetchedEvents?.data.boards[0].items_page.items);
        setItems(fetchedItems?.data.boards[0].items_page.items);
        setVolunteers(fetchedVolunteers?.data.boards[0].items_page.items);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error or set data to null/empty state
      }
    };

    void loadData();
  }, []);

  return (
    <div className="w-full flex-1 rounded-md border p-5 shadow-md md:w-3/5">
      <p className="text-center font-medium">Inventory Form</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Check-in or Check-out" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checkin">Check-in</SelectItem>
                    <SelectItem value="checkout">Check-out</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="volunteer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Volunteer Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {volunteers?.map((item, index) => (
                      //             // Render each item. Ensure you have a unique key for each child.
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations?.map((item, index) => (
                      //             // Render each item. Ensure you have a unique key for each child.
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event</FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {events?.map((item, index) => (
                      //             // Render each item. Ensure you have a unique key for each child.
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between p-1">
            <span>Items</span>
            <span className="pr-16">Quantity</span>
          </div>
          {itemFields.map((field, index) => (
            <div key={index} className="flex space-x-3">
              <Controller
                key={field.id}
                name={`items.${index}`}
                control={form.control}
                render={({
                  field: { onChange, value: fieldValue },
                  fieldState: { error },
                }) => {
                  const value = fieldValue;
                  return (
                    <Popover
                      modal={true}
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
                          className="w-[70%] justify-between overflow-hidden text-ellipsis whitespace-nowrap text-left"
                        >
                          {value.name || "Select items..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Search items..." />
                          <CommandEmpty>No items found.</CommandEmpty>
                          <ScrollArea className="h-[200px]">
                            <CommandGroup>
                              {items?.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.id}
                                  onSelect={() => {
                                    onChange({
                                      ...value,
                                      name: item.name,
                                      id: item.id,
                                      open: false,
                                    });
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value.id === item.id
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <Image
                                    src="https://static.thenounproject.com/png/261694-200.png"
                                    alt="product image"
                                    width={50}
                                    height={50}
                                  />
                                  {item.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </ScrollArea>
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
              <Button
                className="bg-red-700 p-3 text-white"
                onClick={() => remove(index)}
              >
                <CiSquareMinus className="h-7 w-7 !text-white" />
              </Button>
            </div>
          ))}
          <Button
            className="self-end"
            type="button"
            onClick={() =>
              append({
                id: "",
                name: "",
                open: false,
                quantity: 1,
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
