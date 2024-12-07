// db.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const DB_CONNECTION_STRING: string | undefined = process.env.DATABASEPG;

if (!DB_CONNECTION_STRING) {
  throw new Error("Database connection string is not provided.");
}

// Create a pool for connection reuse
const pool = new Pool({
  connectionString: DB_CONNECTION_STRING,
});

// Function to query the database
const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export { query };
