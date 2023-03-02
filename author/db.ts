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

const getAuthor = async (authorName: string) =>{
    const client = await connectToDB();
    const db = client.database("test");
    const quotes = db.collection<QuoteSchema>("quotes");
    const author = await quotes.findOne({
        author: authorName
      },
      {projection: {author: 1}})
    await client.close();
    return author;
}

const getAuthors= async (page: number, limit: number, sort: number, includes: string) =>{
    const client = await connectToDB();
    const db = client.database("test");
    const quotes = db.collection<QuoteSchema>("quotes");

    const stages = [];

    if(includes !== undefined){
        stages.push( 
            {"$match": { author : {'$regex' : includes, '$options' : 'i'}}}
        )
    }
    // grouping by author 
    stages.push(
        { "$group": { "_id": "$author" } }
    )
    if (sort === 0 || sort === 1){
        stages.push(
            { "$sort": { "_id": sort === 0? 1 : -1 }}
        )
    }
    if(page !== undefined && limit !== undefined){
        stages.push(
            { "$skip": ( page ) * limit}
        )
        stages.push(
            { "$limit": limit }
        )
    }
    let result = await quotes.aggregate(stages);
    result = await result.toArray();
    await client.close();
    return result;

}

export { getAuthor, getAuthors }

