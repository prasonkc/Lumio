import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  avatarUrl?: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
