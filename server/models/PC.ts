import mongoose, { Schema, Document } from "mongoose";

export interface IPC extends Document {
  roomId: mongoose.Types.ObjectId;
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
  ratingIds: mongoose.Types.ObjectId[];
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PCSchema = new Schema<IPC>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    specs: {
      cpu: {
        type: String,
        required: true,
      },
      gpu: {
        type: String,
        required: true,
      },
      ram: {
        type: String,
        required: true,
      },
      monitor: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["available", "reserved", "disabled"],
      default: "available",
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    ratingIds: {
      type: [Schema.Types.ObjectId],
      ref: "Rating",
      default: [],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PC = mongoose.model<IPC>("PC", PCSchema);
