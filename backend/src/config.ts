import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

export const PORT: number = isNaN(Number(process.env.PORT))
  ? 9000
  : Number(process.env.PORT);
export const MONGO_URI: string = process.env.MONGO_URI || "";
export const SESSION_SECRET: string = process.env.SESSION_SECRET || "";
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const CLIENT_URL: string =
  NODE_ENV === "development"
    ? "http://localhost:5173"
    : process.env.CLIENT_URL || "";
if (!MONGO_URI) {
  throw new Error("Please provide proper env variables");
}
