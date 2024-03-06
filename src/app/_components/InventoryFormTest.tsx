/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
"use client";

import * as z from "zod";

import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SetStateAction, useEffect, useState } from "react";
import { TbCaretUpDownFilled, TbTrashX } from "react-icons/tb";
import {
  createCheckoutOrder,
  fetchCategories,
  fetchEvents,
  fetchItems,
  fetchLocations,
  fetchVolunteers,
} from "../monday/actions";
import { format, parse, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { CiSquareMinus } from "react-icons/ci";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { signInWithEmailAndPassword } from "../auth/actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Confetti from "react-confetti";
import ConfettiComponent from "./Confetti";

interface Item {
  id: string;
  name: string;
  open: boolean;
}

interface FormValues {
  type: string;
  items: {
    category: {
      title: string;
      id: string;
    };
    id: string;
    name: string;
    quantity: number;
  }[];
  volunteer: {
    name: string;
    email: string;
  };
  location: {
    id: string;
    name: string;
  };
  event: {
    id: string;
    name: string;
  };
}

export interface InventoryFormProps {
  categories: Category[];
  items: unknown;
  events: unknown;
  locations: unknown;
}

const FormSchema = z.object({
  type: z.string({
    required_error: "Please select a form type.",
  }),
  volunteer: z.object({
    name: z
      .string({
        required_error: "Please enter your name.",
      })
      .min(1, "Please enter your name."),
    email: z
      .string({
        required_error: "Please enter your email.",
      })
      .email()
      .min(1, "Please enter your email."),
  }),
  event: z.object({
    id: z.string({
      required_error: "Please select an Event.",
    }),
    name: z.string({
      required_error: "Please select an Event.",
    }),
  }),
  location: z.object({
    id: z.string({
      required_error: "Please select an Event.",
    }),
    name: z.string({
      required_error: "Please select an Event.",
    }),
  }),
  items: z.array(
    z.object({
      category: z.object({
        id: z.string({
          required_error: "Please select an Event.",
        }),
        title: z.string({
          required_error: "Please select an Event.",
        }),
      }),
      id: z.string({
        required_error: "Please select an Event.",
      }),
      name: z.string({
        required_error: "Please select an Event.",
      }),
      quantity: z.string({
        required_error: "Please select an Event.",
      }),
    }),
  ),
});

export default function InventoryForm({
  categories,
  items,
  events,
  locations,
}: InventoryFormProps) {
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  // const onSubmit = (data) => console.log(data);
  // console.log("clientCategories", categories);
  // console.log("clientItems", items);
  const eventsArray = Object.values(events);
  console.log("eventsArray", eventsArray);

  // Handler to open or close popovers
  const handleOpenChange = (popoverId: string) => {
    setOpenPopover((current) => (current === popoverId ? null : popoverId));
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      volunteer: {
        name: "",
        email: "",
      },
      // location: {
      //   id: null,
      //   name: null,
      // },
      event: {},
      items: [],
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

  const showConfirmationModal = (data: object) => {
    // Store the validated form data for later submission or use it directly in the submit function
    setFormData(data); // Assuming you have a state to temporarily hold the validated data
    setIsModalOpen(true); // Show the modal for confirmation
  };

  function confirmAndSubmit() {
    console.log("Form data:", formData);
    // Submit formData here
    const result = createCheckoutOrder(formData);
    form.reset();
    setIsModalOpen(false);
    // Show confetti
    setIsConfettiVisible(true);

    // Hide confetti after 5 seconds
    setTimeout(() => setIsConfettiVisible(false), 5000);

    //Show Toast
    toast({
      title: "Sucessfully Submitted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          Sucessfully Submitted:
          <ConfettiComponent />
          {/* <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code> */}
        </pre>
      ),
    });
  }

  function onDelete(index: number) {
    console.log("onDeleteIndex", index);
    // Save it!
    console.log("form submitted", index);
    remove(index);
    toast({
      title: "Sucessfully Deleted Item:",
    });
  }

  // useEffect(() => {
  //   console.log("openPopover", openPopover);
  // }, [openPopover]);

  useEffect(() => {
    const loadFilteredItems = () => {
      if (selectedCategory) {
        try {
          console.log("selectedCategory", selectedCategory);
          const newFilteredItems = items.filter(
            (item) => item.group.id === selectedCategory,
          );
          setFilteredItems(newFilteredItems);
          console.log("filteredItems", filteredItems);
        } catch (error) {
          console.error("Failed to fetch filtered data:", error);
          // Handle error or set data to null/empty state
        }
      } else {
        setFilteredItems([]);
      }
    };
    void loadFilteredItems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className="flex flex-1 flex-col space-y-20 md:w-3/5 md:p-5">
      {/* <Button className="self-end">Search Previous Check-out Orders</Button> */}
      <div className="mb-20 w-full rounded-md border p-3 shadow-md">
        <div className="mb-5 text-center text-lg font-medium">
          D5 Office of Safety Resource Inventory Form
        </div>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(showConfirmationModal)}
            onSubmit={form.handleSubmit(showConfirmationModal)}
            className="w-full space-y-10"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>

                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="data-[placeholder]:font-medium data-[placeholder]:text-muted-foreground">
                        <SelectValue placeholder="Select form type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="checkout">Check-out</SelectItem>
                      <SelectItem value="checkin">Check-in</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volunteer.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volunteer Name</FormLabel>
                  <FormDescription>Please enter your name.</FormDescription>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="volunteer.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volunteer Email</FormLabel>
                  <FormDescription>Please enter your email.</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="name@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`event`}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="flex items-start justify-between">
                    Event
                  </FormLabel>
                  <FormDescription>Please select an event.</FormDescription>
                  <Popover
                    open={openPopover === `${field.name}`}
                    onOpenChange={() => handleOpenChange(`${field.name}`)}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.name && "text-muted-foreground",
                          )}
                          aria-required
                        >
                          {field.value?.name ?? "Select event"}
                          <TbCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search events..."
                          className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <ScrollArea className="h-[200px]">
                          {eventsArray.map((group) => (
                            <div key={group.groupId}>
                              <CommandGroup heading={group.title}>
                                {group.items.map((event) => {
                                  const formattedDate = event.column_values[0]
                                    .date
                                    ? event.column_values[0].date
                                        .split("-")
                                        .slice(1)
                                        .join("/")
                                    : "N/A";
                                  return (
                                    <CommandItem
                                      value={event.name}
                                      key={event.id}
                                      onSelect={() => {
                                        form.setValue(`event`, {
                                          name: event.name,
                                          id: event.id,
                                        });
                                        setOpenPopover(false);
                                      }}
                                    >
                                      {formattedDate && ` ${formattedDate} - `}
                                      {event.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          event.id === field.value?.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </div>
                          ))}
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`location`}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="flex items-start justify-between">
                    Pickup Location
                  </FormLabel>

                  <Popover
                    open={openPopover === `${field.name}`}
                    onOpenChange={() => handleOpenChange(`${field.name}`)}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? locations.find(
                                (location) => location.id === field.value.id,
                              )?.name
                            : "Select pickup location"}
                          <TbCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search locations..."
                          className="h-9"
                        />
                        <CommandEmpty>No location found.</CommandEmpty>
                        <ScrollArea className="h-[200px]">
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                value={location.name}
                                key={location.id}
                                onSelect={() => {
                                  form.setValue(`location`, {
                                    name: location.name,
                                    id: location.id,
                                  });
                                  setOpenPopover(false);
                                }}
                              >
                                {location.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    location.id === field.value?.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <hr />
              <h3 className="mt-5 font-medium">Item Selection</h3>
            </div>

            {itemFields.map((field, index) => (
              <div
                key={field.id}
                className="z-50 flex w-full flex-col flex-wrap"
              >
                <span className="p-3">{`Item ${index + 1}`}</span>

                <div className="space-y-3 rounded-md bg-slate-100 p-3">
                  <FormField
                    control={form.control}
                    name={`items.${index}.category`}
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="flex items-start justify-between">
                          Category
                        </FormLabel>

                        <Popover
                          open={openPopover === `${field.name}`}
                          onOpenChange={() => handleOpenChange(`${field.name}`)}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? categories.find(
                                      (category) =>
                                        category.id === field.value.id,
                                    )?.title
                                  : "Select category"}
                                <TbCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search categories..."
                                className="h-9"
                              />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <ScrollArea className="h-[200px]">
                                <CommandGroup>
                                  {categories.map((category) => (
                                    <CommandItem
                                      value={category.title}
                                      key={category.id}
                                      onSelect={() => {
                                        form.setValue(
                                          `items.${index}.category`,
                                          {
                                            title: category.title,
                                            id: category.id,
                                          },
                                        );
                                        form.setValue(
                                          `items.${index}.name`,
                                          undefined,
                                        );
                                        setSelectedCategory(category.id);
                                        setOpenPopover(false);
                                      }}
                                    >
                                      {category.title}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          category.id === field.value?.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex w-[100%] flex-col">
                        <FormLabel>Product</FormLabel>

                        <Popover
                          open={openPopover === `${field.name}`}
                          onOpenChange={() => handleOpenChange(`${field.name}`)}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                                disabled={
                                  !form.watch(`items.${index}.category`)
                                }
                              >
                                {field.value.name
                                  ? field.value.name
                                  : !form.watch(`items.${index}.category`)
                                  ? "Select a category first"
                                  : "Select Product"}

                                <TbCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command
                              filter={(value, search) => {
                                if (value.includes(search)) return 1;
                                return 0;
                              }}
                            >
                              <CommandInput
                                placeholder="Search products..."
                                className="h-9"
                              />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <ScrollArea className="h-[300px]">
                                <CommandGroup>
                                  {filteredItems.map((item) => (
                                    <CommandItem
                                      value={item.name.replace(/"/g, '\\"')}
                                      key={item.id}
                                      className="text-base font-medium"
                                      onSelect={() => {
                                        form.setValue(
                                          `items.${index}.name`,
                                          item.name,
                                        );
                                        form.setValue(
                                          `items.${index}.id`,
                                          item.id,
                                        );
                                        setOpenPopover(false);
                                      }}
                                    >
                                      <div className="flex items-center gap-x-5">
                                        <Image
                                          className="min-w-[120px]"
                                          src={
                                            item.assets[0]?.public_url ??
                                            "https://static.thenounproject.com/png/261694-200.png"
                                          }
                                          alt="product image"
                                          width={100}
                                          height={100}
                                        />
                                        {item.name}
                                      </div>

                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          item.id === field.value?.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="flex w-[30%] flex-col">
                          <FormLabel>Quantity</FormLabel>

                          <Input
                            {...field}
                            type="number"
                            min="1" // Ensure quantity is at least 1
                            placeholder="Quantity"
                            className="" // Adjust width as necessary
                            disabled={!form.watch(`items.${index}.category`)}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          className=" h-10 w-10 self-end bg-red-700 p-1 text-white"
                        >
                          <TbTrashX className="h-7 w-7 !text-white" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="flex w-11/12 flex-col gap-y-5 space-y-5 rounded-md sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete?
                          </DialogTitle>
                          <DialogDescription>
                            This will permanently delete the item from your
                            order.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-between space-x-5">
                          <DialogClose asChild>
                            <Button className="w-full" type="button">
                              Go Back
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant={"destructive"}
                              className="w-full"
                              type="submit"
                              onClick={() => onDelete(index)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
            <Button
              className="self-end"
              type="button"
              onClick={() =>
                append({
                  quantity: "1",
                })
              }
            >
              Add Item
            </Button>

            <Button
              className="w-full"
              type="submit"
              onClick={form.handleSubmit(showConfirmationModal)}
            >
              Submit
            </Button>
          </form>
        </Form>
        {/* {isModalOpen && ( */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="flex flex-col gap-y-5 space-y-5">
            <DialogHeader>
              <DialogTitle>Are you sure you are ready to submit?</DialogTitle>
              <DialogDescription>
                This will submit the form and refresh the page.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between space-x-5">
              <DialogClose asChild>
                <Button
                  className="w-full"
                  type="button"
                  variant={"destructive"}
                >
                  Go Back
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="w-full"
                  type="submit"
                  onClick={confirmAndSubmit}
                >
                  Submit
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        {/* )} */}
      </div>
    </div>
  );
}
