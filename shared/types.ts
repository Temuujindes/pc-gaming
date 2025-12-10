export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PC {
  id: string;
  roomId: string;
  number: number;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    monitor: string;
  };
  status: "available" | "reserved" | "disabled";
  ratingAverage: number;
  ratingCount: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  pcId: string;
  userId: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  pcId: string;
  userId: string;
  stars: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  pcId: string;
  userId: string;
  issueType: string;
  description: string;
  status: "open" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}
