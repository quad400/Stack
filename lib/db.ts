import mongoose, { Mongoose } from "mongoose";


interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}


let cached: MongooseConn = (global as any).mongoose;


if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URI!, {
      bufferCommands: false,
      connectTimeoutMS: 3000,
    });

    cached.conn = await cached.promise;

    return cached.conn;
};
