import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Monitor,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Cafe {
  id: string;
  name: string;
  location: string;
  pcCount: number;
  hourlyRate: number;
  specs: string[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cafe: Cafe;
}

export function BookingModal({ isOpen, onClose, cafe }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("2");
  const [selectedPCs, setSelectedPCs] = useState<string[]>([]);

  const mockPCs = Array.from({ length: Math.min(6, cafe.pcCount) }, (_, i) => ({
    id: `pc-${i + 1}`,
    number: i + 1,
    specs: "Intel i9 • RTX 4080 Ti • 64GB RAM",
  }));

  const totalPrice =
    parseInt(selectedDuration) * cafe.hourlyRate * selectedPCs.length;

  const handleNext = () => {
    if (step === 1 && !selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (step === 2 && !selectedStartTime) {
      toast.error("Please select a start time");
      return;
    }
    if (step === 3 && selectedPCs.length === 0) {
      toast.error("Please select at least one PC");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    toast.success("Booking confirmed! Check your email for details.");
    onClose();
  };

  const togglePC = (pcId: string) => {
    setSelectedPCs((prev) =>
      prev.includes(pcId) ? prev.filter((id) => id !== pcId) : [...prev, pcId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{cafe.name}</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-2 rounded-full transition-colors ${
                  s <= step
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
              <p className="text-xs text-muted-foreground text-center mt-1">
                {s === 1 && "Date"}
                {s === 2 && "Time"}
                {s === 3 && "PCs"}
                {s === 4 && "Review"}
              </p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Select Date</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const dateStr = date.toISOString().split("T")[0];
                  const dayName = date.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const dayNum = date.getDate();

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedDate === dateStr
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:border-primary"
                      }`}
                    >
                      <p className="text-xs font-semibold">{dayName}</p>
                      <p className="text-sm">{dayNum}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Select Time & Duration</h3>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Start Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = 10 + i;
                    const timeStr = `${hour.toString().padStart(2, "0")}:00`;
                    return (
                      <button
                        key={timeStr}
                        onClick={() => setSelectedStartTime(timeStr)}
                        className={`p-3 rounded-lg text-center transition-colors ${
                          selectedStartTime === timeStr
                            ? "bg-primary text-primary-foreground"
                            : "border border-border hover:border-primary"
                        }`}
                      >
                        <p className="text-sm font-medium">{timeStr}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setSelectedDuration(hours.toString())}
                      className={`p-3 rounded-lg transition-colors ${
                        selectedDuration === hours.toString()
                          ? "bg-primary text-primary-foreground"
                          : "border border-border hover:border-primary"
                      }`}
                    >
                      <p className="text-sm font-medium">{hours}h</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Select PCs</h3>
              <p className="text-sm text-muted-foreground">
                Choose which PCs you want to book ({selectedPCs.length} selected)
              </p>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {mockPCs.map((pc) => (
                  <button
                    key={pc.id}
                    onClick={() => togglePC(pc.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedPCs.includes(pc.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedPCs.includes(pc.id)
                            ? "bg-primary border-primary"
                            : "border-border"
                        }`}
                      >
                        {selectedPCs.includes(pc.id) && (
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">PC #{pc.number}</p>
                        <p className="text-xs text-muted-foreground">
                          {pc.specs}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Review Booking</h3>
              <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">
                    {selectedStartTime} - {parseInt(selectedStartTime) + parseInt(selectedDuration)}:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{selectedDuration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PCs Selected:</span>
                  <span className="font-medium">{selectedPCs.length} PC(s)</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold">Total Price:</span>
                  <span className="text-lg font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {cafe.hourlyRate} × {selectedDuration}h × {selectedPCs.length} PC(s)
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {step < 4 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleConfirm} className="gap-2 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4" />
              Confirm Booking
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
