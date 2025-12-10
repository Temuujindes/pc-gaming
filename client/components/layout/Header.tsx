import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GamepadIcon, LayoutGrid, LogOut } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="rounded-lg bg-primary p-2">
            <GamepadIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline text-lg">PCafé Hub</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/cafes"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            PC Cafés
          </Link>
          <Link
            to="/my-reservations"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            My Bookings
          </Link>
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
          <Button variant="outline" size="sm">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Sign In</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
