import * as schema from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "~/env.js";
import postgres from "postgres";

const connectionString = env.DATABASE_URL;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
