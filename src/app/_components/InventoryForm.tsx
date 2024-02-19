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
import { useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "../auth/actions";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const events = [
  {
    value: "event_1",
    label: "Event 1",
  },
  {
    value: "event_2",
    label: "Event 2",
  },
  {
    value: "event_3",
    label: "Event 3",
  },
];

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is required.",
  }),
  location: z.string(),
  event: z.string(),
});

export default function InventoryForm() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [value, setValue] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "dev1@gmail.com",
      password: "dev1234$",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("form submitted");
    const result = await signInWithEmailAndPassword(data);
    console.log("result", result);
    const { error } = result;

    if (error?.message) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Sucessfully Signed In:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            Sucessfully Registered:
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
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
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event</FormLabel>
                <FormControl className="w-full">
                  <Popover open={eventOpen} onOpenChange={setEventOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={eventOpen}
                        className="w-full justify-between"
                      >
                        {value
                          ? events.find((event) => event.value === value)?.label
                          : "Select event..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput placeholder="Search events..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {events.map((event) => (
                            <CommandItem
                              key={event.value}
                              value={event.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue,
                                );
                                setEventOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === event.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {event.label}
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
          <Button type="submit" className="flex w-full gap-2">
            Submit
            <AiOutlineLoading3Quarters className={cn("animate-spin")} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
