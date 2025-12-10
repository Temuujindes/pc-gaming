import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutGrid,
  Map,
  MapPin,
  Star,
  Search,
  ChevronDown,
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

interface Cafe {
  id: string;
  name: string;
  location: string;
  district: string;
  pcCount: number;
  rating: number;
  reviews: number;
  hourlyRate: number;
  specs: string[];
  image: string;
  color: string;
}

const mockCafes: Cafe[] = [
  {
    id: "1",
    name: "Pro Gaming Hub",
    location: "Downtown District",
    district: "Downtown",
    pcCount: 32,
    rating: 4.8,
    reviews: 324,
    hourlyRate: 8,
    specs: ["RTX 4090", "240Hz Monitors", "Air Conditioned"],
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&h=250&fit=crop",
    color: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    id: "2",
    name: "Phoenix Gaming Hub",
    location: "Sukhbaatar District",
    district: "Sukhbaatar",
    pcCount: 32,
    rating: 4.8,
    reviews: 124,
    hourlyRate: 5,
    specs: ["RTX 4080 Ti", "144Hz Monitors", "Gaming Chairs"],
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=250&fit=crop",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    name: "Cyber Den",
    location: "Peace Avenue",
    district: "Peace",
    pcCount: 24,
    rating: 4.5,
    reviews: 89,
    hourlyRate: 4,
    specs: ["RTX 4070 Ti", "165Hz Monitors", "Comfortable Seating"],
    image:
      "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=500&h=250&fit=crop",
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
  },
  {
    id: "4",
    name: "Pro Station",
    location: "Khan-Uul District",
    district: "Khan-Uul",
    pcCount: 40,
    rating: 4.9,
    reviews: 156,
    hourlyRate: 6,
    specs: ["RTX 4090", "240Hz Monitors", "Streaming Setup"],
    image:
      "https://images.unsplash.com/photo-1575591529603-55e92bda84df?w=500&h=250&fit=crop",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
  },
  {
    id: "5",
    name: "Digital Lounge",
    location: "Bayanzurkh District",
    district: "Bayanzurkh",
    pcCount: 20,
    rating: 4.3,
    reviews: 67,
    hourlyRate: 3,
    specs: ["RTX 3060", "120Hz Monitors", "Budget Friendly"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=250&fit=crop",
    color: "bg-gradient-to-r from-green-500 to-teal-600",
  },
  {
    id: "6",
    name: "Elite Gaming Complex",
    location: "Chingeltei District",
    district: "Chingeltei",
    pcCount: 48,
    rating: 4.7,
    reviews: 143,
    hourlyRate: 7,
    specs: ["RTX 4090", "360Hz Monitors", "Tournament Ready"],
    image:
      "https://images.unsplash.com/photo-1552461388-5ba526aa6f8f?w=500&h=250&fit=crop",
    color: "bg-gradient-to-r from-indigo-500 to-purple-600",
  },
];

export default function Cafes() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("highest");
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredCafes = mockCafes
    .filter(
      (cafe) =>
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.district.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (ratingFilter === "highest") return b.rating - a.rating;
      if (ratingFilter === "lowest") return a.rating - b.rating;
      return 0;
    });

  const handleBookNow = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Gaming Centers</h1>
          <p className="text-muted-foreground">
            {filteredCafes.length} amazing gaming centers ready for you
          </p>
        </div>

        {/* View Toggle Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:flex">
          <Button
            onClick={() => setViewMode("grid")}
            className={`flex-1 sm:flex-none h-12 rounded-lg font-semibold ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "bg-white border border-border text-foreground hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid View
          </Button>
          <Button
            onClick={() => setViewMode("map")}
            className={`flex-1 sm:flex-none h-12 rounded-lg font-semibold ${
              viewMode === "map"
                ? "bg-primary text-primary-foreground"
                : "bg-white border border-border text-foreground hover:bg-slate-50"
            }`}
          >
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search centers..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-white text-sm font-medium hover:bg-slate-50 cursor-pointer"
            >
              <option value="all">All Distances</option>
              <option value="1">Within 1 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-white text-sm font-medium hover:bg-slate-50 cursor-pointer"
            >
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        {/* Content Based on View Mode */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCafes.map((cafe) => (
              <div
                key={cafe.id}
                className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Banner with PC Count */}
                <div className={`${cafe.color} h-32 flex items-end p-4`}>
                  <div className="flex justify-between items-end w-full">
                    <div className="bg-black/40 backdrop-blur px-3 py-2 rounded-lg">
                      <p className="text-white font-semibold text-sm">
                        {cafe.pcCount} Gaming PCs
                      </p>
                    </div>
                    <button className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors">
                      <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Name and Location */}
                  <div>
                    <h3 className="text-xl font-bold">{cafe.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{cafe.location}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-purple-600 text-purple-600"
                        />
                      ))}
                      <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
                    </div>
                    <span className="font-semibold">
                      {cafe.rating} ({cafe.reviews})
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2">
                    {cafe.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Hourly Rate and Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Hourly Rate</p>
                      <p className="text-2xl font-bold text-primary">
                        ${cafe.hourlyRate}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleBookNow(cafe)}
                      className="rounded-lg"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Map View Placeholder
          <div className="rounded-xl border border-border bg-slate-100 h-96 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Map className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                Interactive map view coming soon
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedCafe && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedCafe(null);
          }}
          cafe={selectedCafe}
        />
      )}
    </div>
  );
}
