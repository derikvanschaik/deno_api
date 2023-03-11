import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

export default async function connectToDB(){
  const client = new Client(Deno.env.get('DB_PG_URL'));
  await client.connect();
  return client;
}
