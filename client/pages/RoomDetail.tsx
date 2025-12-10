import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Users,
  Monitor,
  Cpu,
  Zap,
  ChevronLeft,
  Clock,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface PC {
  id: string;
  number: number;
  status: "available" | "reserved" | "disabled";
  rating: number;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    monitor: string;
  };
  reviews: number;
}

interface Room {
  id: string;
  name: string;
  caféName: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  pcs: PC[];
}

const mockRoom: Room = {
  id: "1",
  name: "VIP Gaming Room",
  caféName: "Phoenix Gaming Hub",
  description:
    "Premium VIP gaming room with the latest high-end systems and comfortable ergonomic seating. Perfect for competitive gaming and streaming.",
  image:
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=400&fit=crop",
  rating: 4.8,
  reviews: 124,
  pcs: [
    {
      id: "1",
      number: 1,
      status: "available",
      rating: 4.9,
      specs: {
        cpu: "Intel i9-13900KS",
        gpu: "RTX 4090",
        ram: "64GB DDR5",
        monitor: "240Hz 4K",
      },
      reviews: 45,
    },
    {
      id: "2",
      number: 2,
      status: "available",
      rating: 4.8,
      specs: {
        cpu: "Intel i9-13900K",
        gpu: "RTX 4080 Ti",
        ram: "64GB DDR5",
        monitor: "240Hz QHD",
      },
      reviews: 38,
    },
    {
      id: "3",
      number: 3,
      status: "reserved",
      rating: 4.7,
      specs: {
        cpu: "Intel i9-13900K",
        gpu: "RTX 4080 Ti",
        ram: "64GB DDR5",
        monitor: "240Hz QHD",
      },
      reviews: 42,
    },
    {
      id: "4",
      number: 4,
      status: "available",
      rating: 4.9,
      specs: {
        cpu: "Intel i9-13900KS",
        gpu: "RTX 4090",
        ram: "64GB DDR5",
        monitor: "240Hz 4K",
      },
      reviews: 51,
    },
    {
      id: "5",
      number: 5,
      status: "disabled",
      rating: 4.6,
      specs: {
        cpu: "Intel i9-12900K",
        gpu: "RTX 4070 Ti",
        ram: "48GB DDR5",
        monitor: "144Hz QHD",
      },
      reviews: 33,
    },
    {
      id: "6",
      number: 6,
      status: "available",
      rating: 4.8,
      specs: {
        cpu: "Intel i9-13900K",
        gpu: "RTX 4080 Ti",
        ram: "64GB DDR5",
        monitor: "240Hz QHD",
      },
      reviews: 40,
    },
  ],
};

export default function RoomDetail() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [room] = useState(mockRoom);

  const availableCount = room.pcs.filter((pc) => pc.status === "available")
    .length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Back Button */}
      <div className="container pt-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cafés
        </Button>
      </div>

      {/* Room Header */}
      <section className="container py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image */}
          <div className="lg:col-span-2">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-xl border border-border p-6 h-fit sticky top-20">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{room.caféName}</p>
                <h1 className="text-2xl font-bold mt-1">{room.name}</h1>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{room.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({room.reviews} reviews)
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-lg font-semibold text-green-700">
                    {availableCount} PCs available now
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {room.pcs.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Total PCs</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      12:00 - 22:00
                    </div>
                    <p className="text-xs text-muted-foreground">Operating Hours</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full gap-2">
                <Clock className="h-4 w-4" />
                Book a PC
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">About This Room</h2>
          <p className="text-muted-foreground">{room.description}</p>
        </div>
      </section>

      {/* PCs Grid */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold mb-8">Available PCs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {room.pcs.map((pc) => (
            <div
              key={pc.id}
              className={`rounded-xl border p-6 transition-all ${
                pc.status === "available"
                  ? "bg-white border-border hover:shadow-lg hover:border-primary/20"
                  : pc.status === "reserved"
                    ? "bg-slate-50 border-border/50 opacity-70"
                    : "bg-slate-50 border-border/50 opacity-50"
              }`}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">PC #{pc.number}</h3>
                <Badge
                  variant={
                    pc.status === "available"
                      ? "default"
                      : pc.status === "reserved"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {pc.status.charAt(0).toUpperCase() + pc.status.slice(1)}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{pc.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({pc.reviews} reviews)
                </span>
              </div>

              {/* Specs */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Cpu className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">CPU</p>
                    <p className="text-sm font-medium">{pc.specs.cpu}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">GPU</p>
                    <p className="text-sm font-medium">{pc.specs.gpu}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Monitor className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">RAM</p>
                    <p className="text-sm font-medium">{pc.specs.ram}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Monitor className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Monitor</p>
                    <p className="text-sm font-medium">{pc.specs.monitor}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                className="w-full"
                disabled={pc.status !== "available"}
                variant={pc.status === "available" ? "default" : "outline"}
              >
                {pc.status === "available"
                  ? "Book Now"
                  : pc.status === "reserved"
                    ? "Reserved"
                    : "Unavailable"}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
