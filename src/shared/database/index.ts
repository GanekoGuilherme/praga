import mongoose from "mongoose";
import { config } from 'dotenv';

config({ path: './.env' });

mongoose.connect(process.env.MONGO_URL);

export default mongoose;