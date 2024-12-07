"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
// db.ts
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_CONNECTION_STRING = process.env.DATABASEPG;
if (!DB_CONNECTION_STRING) {
    throw new Error("Database connection string is not provided.");
}
// Create a pool for connection reuse
const pool = new pg_1.Pool({
    connectionString: DB_CONNECTION_STRING,
});
// Function to query the database
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query(text, params);
        return result;
    }
    catch (error) {
        console.error("Query error:", error);
        throw error;
    }
    finally {
        client.release(); // Release the client back to the pool
    }
});
exports.query = query;
