import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URI = process.env.MONGODB_URI as string

let cached = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB(){
  // Return cached connection if it exists
  if(cached.conn) {return cached.conn}
  
  if(!cached.promise){
    cached.promise = mongoose.connect(MONGODB_URI).then((e) => {e})
  }

  cached.conn = await cached.promise
  return cached.conn
}