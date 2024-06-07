"use client";

import { ElementRef, useRef, useState } from "react";
import z from "zod";
import qs from "query-string";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField } from "../ui/form";
import { Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string(),
});

const BoardHeader = ({ name }: { name: string }) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  const router = useRouter()
  const { boardId } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  const loading = form.formState.isSubmitting;

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl({
      url: "/api/workspaces/board",
      query: {
        boardId: boardId,
      },
    });
    try {
      await axios.patch(url, values);

      router.refresh()
      inputRef.current?.blur();
      toast.success("Board name updated");
    } catch (error) {
      console.log(error);
      toast.error("Error updating board name");
    }
  };

  const handleDelete = async () => {
    const url = qs.stringifyUrl({
      url: "/api/workspaces/board",
      query: {
        boardId: boardId,
      },
    });
    try {
      await axios.delete(url);
      toast.success("Successfully deleted board");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting board");
    }
  };

  return (
    <div className="flex justify-between items-center h-14 w-full bg-neutral-900 opacity-70 py-3 px-5 font-bold text-white text-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex items-center gap-x-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormControl>
                <Input
                  disabled={loading}
                  {...field}
                  ref={inputRef}
                  id="name"
                  defaultValue={name}
                  className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none 
              focus-visible:ring-transparent border-none"
                />
              </FormControl>
            )}
          />
        </form>
      </Form>
      <Button onClick={handleDelete} className="hover:bg-neutral-500/50" variant="ghost" size="icon">
        <Trash className="text-neutral-200 h-6 w-6" />
      </Button>
    </div>
  );
};

export default BoardHeader;
