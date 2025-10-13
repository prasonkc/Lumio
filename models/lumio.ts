import mongoose, { Schema, Document } from 'mongoose';

export interface LumioUser {
  _id?: string;
  username: string;
  password: string;
  email: string;
}

const LumioUserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:    { type: String, required: true, unique: true }
});

export default mongoose.model<LumioUser>('LumioUser', LumioUserSchema);