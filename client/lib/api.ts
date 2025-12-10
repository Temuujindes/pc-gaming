import { Room, PC, Reservation, Rating, Report, User } from "@shared/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Rooms
  async getRooms(): Promise<Room[]> {
    return this.request("/rooms");
  }

  async getRoom(id: string): Promise<Room> {
    return this.request(`/rooms/${id}`);
  }

  async createRoom(
    data: Omit<Room, "id" | "createdAt" | "updatedAt">,
  ): Promise<Room> {
    return this.request("/rooms", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateRoom(id: string, data: Partial<Room>): Promise<Room> {
    return this.request(`/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteRoom(id: string): Promise<void> {
    return this.request(`/rooms/${id}`, { method: "DELETE" });
  }

  // PCs
  async getPCs(): Promise<PC[]> {
    return this.request("/pcs");
  }

  async getPC(id: string): Promise<PC> {
    return this.request(`/pcs/${id}`);
  }

  async getPCsByRoom(roomId: string): Promise<PC[]> {
    return this.request(`/pcs?roomId=${roomId}`);
  }

  async createPC(
    data: Omit<PC, "id" | "createdAt" | "updatedAt">,
  ): Promise<PC> {
    return this.request("/pcs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePC(id: string, data: Partial<PC>): Promise<PC> {
    return this.request(`/pcs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePC(id: string): Promise<void> {
    return this.request(`/pcs/${id}`, { method: "DELETE" });
  }

  // Reservations
  async createReservation(
    data: Omit<Reservation, "id" | "createdAt" | "updatedAt">,
  ): Promise<Reservation> {
    return this.request("/reservations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return this.request(`/reservations/user/${userId}`);
  }

  async getPCReservations(pcId: string): Promise<Reservation[]> {
    return this.request(`/reservations/pc/${pcId}`);
  }

  async checkAvailability(
    pcId: string,
    startTime: string,
    endTime: string,
  ): Promise<{ available: boolean }> {
    return this.request("/reservations/check-availability", {
      method: "POST",
      body: JSON.stringify({ pcId, startTime, endTime }),
    });
  }

  // Ratings
  async createRating(
    data: Omit<Rating, "id" | "createdAt" | "updatedAt">,
  ): Promise<Rating> {
    return this.request("/ratings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getPCRatings(pcId: string): Promise<Rating[]> {
    return this.request(`/ratings/pc/${pcId}`);
  }

  async getPCAverageRating(
    pcId: string,
  ): Promise<{ average: number; count: number }> {
    return this.request(`/ratings/pc/${pcId}/average`);
  }

  // Reports
  async createReport(
    data: Omit<Report, "id" | "createdAt" | "updatedAt">,
  ): Promise<Report> {
    return this.request("/reports", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getReports(): Promise<Report[]> {
    return this.request("/reports");
  }

  async resolveReport(id: string): Promise<Report> {
    return this.request(`/reports/${id}/resolve`, {
      method: "PUT",
      body: JSON.stringify({ status: "resolved" }),
    });
  }

  // Auth
  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  async logout(): Promise<void> {
    return this.request("/auth/logout", { method: "POST" });
  }

  async getCurrentUser(): Promise<User> {
    return this.request("/auth/me");
  }
}

export const apiClient = new ApiClient();
