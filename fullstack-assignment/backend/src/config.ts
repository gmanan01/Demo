import "dotenv/config";

export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
export const DB_DATABASE = process.env.DB_DATABASE || "test";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
