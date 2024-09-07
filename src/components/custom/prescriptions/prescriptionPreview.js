"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PrescriptionPreview = ({ open, onClose, prescription }) => {
  if (!prescription) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{prescription.title}</DialogTitle>
          <DialogDescription>
            Detailed Information for {prescription.username}'s Prescription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            <strong>Diagnosis:</strong> {prescription.diagnosis}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {prescription.status === "critical" ? "Critical" : "Normal"}
          </p>
          <p>
            <strong>Created At:</strong> {prescription.createdAt}
          </p>
          <h4>Medicines:</h4>
          <ul>
            {prescription.medicines.map((medicine, index) => (
              <li key={index}>
                {medicine.name} - {medicine.milligram}mg ({medicine.quantity})
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionPreview;
