import mongoose, { Schema, Document, Model } from "mongoose";

export interface LumioUser extends Document {
  _id: string
  email: string;
  password: string;
  username?: string;
}

const LumioUserSchema = new Schema<LumioUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, 
  },
  { timestamps: true }
);

const User: Model<LumioUser> =
  mongoose.models.LumioUser || mongoose.model<LumioUser>("LumioUser", LumioUserSchema);

export default User;
