import { IoAdd } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewQuoteForm } from "./new-quote-form";

export const NewQuoteDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IoAdd className="mr-2 h-4 w-4" />
          Create New Quote
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Quote</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <NewQuoteForm />
      </DialogContent>
    </Dialog>
  );
};
