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
          <DialogTitle>Prescription Details</DialogTitle>
          <DialogDescription>
            Detailed Information for {prescription.user.first_name}{" "}
            {prescription.user.last_name}'s Prescription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <p>
            <strong>Title:</strong> {prescription.title}
          </p>

          {/* Diagnosis */}
          <p>
            <strong>Diagnosis:</strong> {prescription.diagnosis}
          </p>

          {/* Status */}
          <p>
            <strong>Status:</strong> {prescription.status}
          </p>

          {/* Created At */}
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(prescription.created_at).toLocaleString()}
          </p>

          {/* Medicines */}
          {prescription.medicines.length > 0 ? (
            <>
              <h4>Medicines:</h4>
              <ul>
                {prescription.medicines.map((medicine, index) => (
                  <li key={index}>
                    {medicine.name} - {medicine.milligram}mg (
                    {medicine.quantity})
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No medicines prescribed.</p>
          )}

          {/* User Details */}
          <div className="space-y-2">
            <p>
              <strong>Patient:</strong> {prescription.user.first_name}{" "}
              {prescription.user.last_name} ({prescription.user.email})
            </p>
            <p>
              <strong>Created By:</strong> {prescription.created_by.first_name}{" "}
              {prescription.created_by.last_name}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionPreview;
