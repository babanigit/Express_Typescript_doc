// import mongoose from "mongoose";


// declare module "express-session"{
//     interface SessionData{
//         userId:mongoose.Types.ObjectId| undefined;
//     }
// }

import { SessionData } from 'express-session';
import mongoose, { Types } from 'mongoose'; // Import Types from mongoose for ObjectId type

declare module 'express-session' {
  interface SessionData {
    userId: mongoose.Types.ObjectId | undefined; // Assuming userId is of type ObjectId from mongoose
  }
}
