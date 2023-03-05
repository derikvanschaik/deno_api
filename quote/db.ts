import {
    ObjectId
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import connectToDB from "../db/connect.ts";


// Defining schema 
export interface QuoteSchema {
    _id: ObjectId;
    author: string;
    quote: string;
}
// this database service
export interface QuoteService {
    getQuotes: (authorName: string, page: number, limit: number, includes: string) => Promise<any>;
}

const getQuotes = async (authorName: string, page: number, limit: number, includes: string) =>{
    const client = await connectToDB();
    const db = client.database("test");
    const quotes = db.collection<QuoteSchema>("quotes");

    const query = authorName !== undefined? { author: authorName} : {}
    
    let result;

    if(includes !== undefined){
        result = await quotes.find({...query,  quote : {'$regex' : includes, '$options' : 'i' }})
    }else{
        result = await quotes.find(query);

    }
    if(page !== undefined && limit !== undefined){
        result.skip(page * limit);
        result.limit(limit);
    }
    result = await result.toArray();
    await client.close();
    return result;

}

const service:QuoteService = { getQuotes }
export default service

