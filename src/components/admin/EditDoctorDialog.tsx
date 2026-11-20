import { useUpdateDoctor } from "@/hooks/use-doctors";
import { formatPhoneNumber } from "@/lib/utils";
import { Doctor } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}



function EditDoctorDialog({doctor, isOpen, onClose}: EditDoctorDialogProps) {
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);
    const updateDoctorMutation = useUpdateDoctor();
    
    const handlePhoneChange = (value: string) => {
        const formattedPhoneNumber = formatPhoneNumber(value);
        if (editingDoctor) {
            setEditingDoctor({ ...editingDoctor, phone: formattedPhoneNumber });
        }
    };

    const handleSave = () => {
        if (editingDoctor) {
            updateDoctorMutation.mutate({ ...editingDoctor}, { onSuccess: handleClose });
        }
    };

    const handleClose = () => {
        onClose();
        setEditingDoctor(doctor);
    };


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>Update doctor information and status.</DialogDescription>
        </DialogHeader>

        {editingDoctor && (
          <div className="grid gap-4 py-4">
            
            </div>
        )}

      </DialogContent>
    </Dialog>
  )
  
}

export default EditDoctorDialog