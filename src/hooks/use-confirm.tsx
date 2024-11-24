/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 gap-y-2 flex flex-col">
          <Button variant={"outline"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant={"outline"} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
