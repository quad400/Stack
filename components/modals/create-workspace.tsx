"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ImageUpload from "../image-upload";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Workspace name is required",
  }),
  imageUri: z.string().min(3, {
    message: "Workspace image is required",
  }),
});

const CreateWorkspaceModal = () => {

  const router = useRouter()
  const { type, isOpen, onClose } = useModal();

  const open = type === "createWorkspace" && isOpen;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUri: "",
    },
  });

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>)=> {
      try{
        const {data} = await axios.post("/api/workspaces", values)
        onClose()
        form.reset()
        toast.success("Workspace created successfully")
        router.push(`/dashboard/${data?._id}`)
      }catch(error){
        toast.error("Error creating workspace")
      }
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()} >
      <DialogContent className="w-full p-0 border-0">
        <DialogTitle className="text-center text-xl mt-5 font-bold text-neutral-900">
          Create Workspace
        </DialogTitle>
        <DialogDescription className="text-center -mt-3 text-neutral-500 text-sm font-normal">
          Create a new workspace for your team project
        </DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-4">
            <div className="mx-6 flex flex-col space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-900 text-sm font-semibold uppercase">
                       Name
                    </FormLabel>
                    <FormControl>
                      <Input
                      disabled={isLoading}
                      placeholder="Enter a worksapce name..."
                      className="bg-white ring-1 ring-neutral-200 focus-visible:ring-neutral-300
                         text-neutral-900 focus-visible:ring-offset-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-900 text-sm font-semibold uppercase">
                       Image
                    </FormLabel>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-neutral-100 p-4 w-full">
              <Button disabled={isLoading} variant="primary" className="w-full md:w-auto" size="lg">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
