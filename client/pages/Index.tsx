import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Zap, Star, ChevronRight } from "lucide-react";

interface Cafe {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  pcCount: number;
  rooms: number;
  availability: string;
}

const mockCafes: Cafe[] = [
  {
    id: "1",
    name: "Phoenix Gaming Hub",
    location: "Sukhbaatar District",
    description:
      "Premium gaming cafe with high-end PC setups and professional tournaments",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    pcCount: 32,
    rooms: 4,
    availability: "18 available now",
  },
  {
    id: "2",
    name: "Cyber Den",
    location: "Peace Avenue",
    description:
      "Modern internet cafe with latest hardware and comfortable seating",
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 89,
    pcCount: 24,
    rooms: 3,
    availability: "12 available now",
  },
  {
    id: "3",
    name: "Pro Station",
    location: "Khan-Uul District",
    description:
      "Esports training center with RTX 4090 systems and streaming setup",
    image:
      "https://images.unsplash.com/photo-1552862750-746b8f6f7f25?w=500&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    pcCount: 40,
    rooms: 5,
    availability: "25 available now",
  },
  {
    id: "4",
    name: "Digital Lounge",
    location: "Bayanzurkh District",
    description: "Casual gaming zone with affordable rates and VIP rooms",
    image:
      "https://images.unsplash.com/photo-1575591529603-55e92bda84df?w=500&h=300&fit=crop",
    rating: 4.3,
    reviewCount: 67,
    pcCount: 20,
    rooms: 2,
    availability: "8 available now",
  },
  {
    id: "5",
    name: "Elite Gaming Complex",
    location: "Chingeltei District",
    description: "Top-tier facility with tournament-grade equipment",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 143,
    pcCount: 36,
    rooms: 4,
    availability: "21 available now",
  },
  {
    id: "6",
    name: "Connect Hub",
    location: "Sogilno District",
    description: "Newly opened cafe with modern design and competitive pricing",
    image:
      "https://images.unsplash.com/photo-1552461388-5ba526aa6f8f?w=500&h=300&fit=crop",
    rating: 4.4,
    reviewCount: 45,
    pcCount: 16,
    rooms: 2,
    availability: "10 available now",
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCafes, setFilteredCafes] = useState(mockCafes);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockCafes.filter(
      (cafe) =>
        cafe.name.toLowerCase().includes(query.toLowerCase()) ||
        cafe.location.toLowerCase().includes(query.toLowerCase()) ||
        cafe.description.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCafes(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="container py-12 sm:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Find the best PC cafés in Ulaanbaatar
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Book Your Perfect{" "}
            <span className="text-primary">Gaming Station</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover premium PC cafés, check real-time availability, and book
            your gaming session instantly.
          </p>

          {/* Search Bar */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or location..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-12">
                Search Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border bg-white">
        <div className="container py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">156+</div>
              <p className="text-sm text-muted-foreground">PC Cafés</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">2.5K+</div>
              <p className="text-sm text-muted-foreground">Gaming PCs</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <p className="text-sm text-muted-foreground">Happy Players</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.6★</div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cafés Grid */}
      <section className="container py-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Available PC Cafés</h2>
            <p className="text-muted-foreground mt-2">
              {filteredCafes.length} cafés found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {filteredCafes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No cafés found matching your search. Try a different query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCafes.map((cafe) => (
                <Link
                  key={cafe.id}
                  to={`/room/${cafe.id}`}
                  className="group rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-slate-200">
                    <img
                      src={cafe.image}
                      alt={cafe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {cafe.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {cafe.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        {cafe.location}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {cafe.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-border">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {cafe.pcCount}
                        </div>
                        <p className="text-xs text-muted-foreground">PCs</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {cafe.rooms}
                        </div>
                        <p className="text-xs text-muted-foreground">Rooms</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {cafe.reviewCount}
                        </div>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-green-700">
                          {cafe.availability}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Own a PC Café?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of café owners managing their inventory and
              bookings on PCafé Hub. Start free today.
            </p>
            <Button size="lg" variant="default">
              <Users className="h-4 w-4 mr-2" />
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-slate-50">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Book Now
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    My Bookings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Partners</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Partner With Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Admin Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 PCafé Hub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
