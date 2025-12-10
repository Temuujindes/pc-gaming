import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
  pcNumber: number;
  caféName: string;
}

export function ReservationForm({
  isOpen,
  onClose,
  pcNumber,
  caféName,
}: ReservationFormProps) {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    duration: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.startTime || !formData.duration) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(
      `Reservation created for PC #${pcNumber} at ${caféName} on ${formData.date}`,
    );
    onClose();
    setFormData({
      date: "",
      startTime: "",
      duration: "1",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book PC #{pcNumber}</DialogTitle>
          <DialogDescription>{caféName}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <select
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-white text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((hours) => (
                <option key={hours} value={hours}>
                  {hours} hour{hours !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Price Summary */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Price:
              </span>
              <span className="text-lg font-bold text-primary">
                ₮{(parseInt(formData.duration) * 3000).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ₮3,000 per hour
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
