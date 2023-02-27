import {
    Bson,
    MongoClient,
    ObjectId
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import "https://deno.land/x/dotenv/load.ts";
  
const uri = `mongodb+srv://${Deno.env.get("DB_USER")}:${Deno.env.get("DB_PASS")}@${Deno.env.get("DB_CLUSTER")}/?authMechanism=SCRAM-SHA-1`;

export default async function connectToDB(){
    const client = new MongoClient();
    await client.connect(uri);
    return client;
}