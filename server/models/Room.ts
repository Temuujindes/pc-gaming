import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  description: string;
  images: string[];
  ownerId: mongoose.Types.ObjectId;
  type: "VIP" | "Normal" | "Training";
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["VIP", "Normal", "Training"],
      default: "Normal",
    },
  },
  {
    timestamps: true,
  },
);

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
