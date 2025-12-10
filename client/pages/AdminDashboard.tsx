import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Users,
  Monitor,
  LayoutGrid,
  AlertCircle,
  TrendingUp,
  Plus,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: DashboardTab[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  { id: "rooms", label: "Rooms", icon: <LayoutGrid className="h-4 w-4" /> },
  { id: "pcs", label: "PCs", icon: <Monitor className="h-4 w-4" /> },
  {
    id: "reservations",
    label: "Reservations",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "reports",
    label: "Reports",
    icon: <AlertCircle className="h-4 w-4" />,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total PCs", value: "42", change: "+2 this month" },
    { label: "Today's Bookings", value: "18", change: "+5 from yesterday" },
    { label: "Active Reservations", value: "12", change: "3 hours avg" },
    { label: "Pending Reports", value: "3", change: "2 new today" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your PC café, rooms, PCs, and reservations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-border p-6"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary -mb-[2px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Room
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add New PC
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div>
                        <p className="font-medium text-sm">New reservation</p>
                        <p className="text-xs text-muted-foreground">
                          PC #5 - VIP Room
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div>
                        <p className="font-medium text-sm">New report</p>
                        <p className="text-xs text-muted-foreground">
                          PC #12 - Screen issue
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        4 hours ago
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">PC rating updated</p>
                        <p className="text-xs text-muted-foreground">
                          PC #3 - 4.9★ average
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        1 day ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Bookings This Week
                </h3>
                <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rooms" && (
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Your Rooms</h3>
                <Button size="sm" gap={2}>
                  <Plus className="h-4 w-4" />
                  Add Room
                </Button>
              </div>
              <div className="space-y-4">
                {["VIP Gaming Room", "Normal Room", "Training Room"].map(
                  (room) => (
                    <div
                      key={room}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{room}</p>
                        <p className="text-sm text-muted-foreground">
                          8 PCs • 24 bookings this month
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {activeTab === "pcs" && (
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Your PCs</h3>
                <Button size="sm" gap={2}>
                  <Plus className="h-4 w-4" />
                  Add PC
                </Button>
              </div>
              <div className="space-y-4">
                {["PC #1", "PC #2", "PC #3", "PC #4"].map((pc) => (
                  <div
                    key={pc}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{pc}</p>
                      <p className="text-sm text-muted-foreground">
                        RTX 4090 • i9-13900KS • 4.8★
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reservations" && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold mb-6">
                Recent Reservations
              </h3>
              <div className="space-y-4">
                {[
                  {
                    user: "John Doe",
                    pc: "PC #5",
                    time: "14:00 - 18:00",
                    date: "Today",
                  },
                  {
                    user: "Jane Smith",
                    pc: "PC #2",
                    time: "16:00 - 20:00",
                    date: "Today",
                  },
                  {
                    user: "Mike Johnson",
                    pc: "PC #8",
                    time: "10:00 - 14:00",
                    date: "Tomorrow",
                  },
                ].map((reservation, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{reservation.user}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.pc} • {reservation.time}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {reservation.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold mb-6">Reports & Issues</h3>
              <div className="space-y-4">
                {[
                  { pc: "PC #12", issue: "Screen flickering", status: "Open" },
                  {
                    pc: "PC #7",
                    issue: "Keyboard not working",
                    status: "Resolved",
                  },
                  { pc: "PC #3", issue: "CPU running hot", status: "Open" },
                ].map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{report.pc}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.issue}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        report.status === "Open"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
