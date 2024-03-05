"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  volunteer: z.object({
    name: z
      .string({
        required_error: "Please enter your name.",
      })
      .min(1, "Please enter your name."),
  }),
});

export function DefaultForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      volunteer: {
        name: "",
      },
    },
  });

  const showConfirmationModal = (data: object) => {
    // Store the validated form data for later submission or use it directly in the submit function
    setFormData(data); // Assuming you have a state to temporarily hold the validated data
    setIsModalOpen(true); // Show the modal for confirmation
  };

  function confirmAndSubmit() {
    console.log("Form data:", formData);
    // Submit formData here
    form.reset();
    setIsModalOpen(false);
    return (
      <Dialog open>
        <DialogContent className="flex flex-col gap-y-5 space-y-5">
          <DialogHeader>
            <DialogTitle>Are you sure you are ready to submit?</DialogTitle>
            <DialogDescription>
              This will submit the form and refresh the page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between space-x-5">
            <DialogClose asChild>
              <Button className="w-full" type="button" variant={"destructive"}>
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
    );
    // toast({
    //   title: "Sucessfully Submitted:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       Sucessfully Submitted:
    //       <code className="text-white">
    //         {JSON.stringify(formData, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // });
  }

  // function onSubmit(data: unknown) {
  //   console.log("form submitted", data);

  //   toast({
  //     title: "Sucessfully Submitted:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         Sucessfully Submitted:
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  //   form.reset();
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(showConfirmationModal)}
        className="w-2/3 space-y-6"
      >
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
        <Button
          type="submit"
          onClick={form.handleSubmit(showConfirmationModal)}
        >
          Submit
        </Button>
      </form>

      {isModalOpen && (
        <Dialog open>
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
      )}
    </Form>
  );
}
