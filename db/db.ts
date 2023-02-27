import {
    ObjectId
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import connectToDB from "./connect.ts";


// Defining schema 
export interface AuthorSchema {
    _id: ObjectId;
    author: string;
    quotes: string[],
    image: string,
}

const getAuthor = async (authorId: string) =>{
    const client = await connectToDB();
    const db = client.database("test");
    const authors = db.collection<AuthorSchema>("authors");
    const author = await authors.findOne({
        _id: new ObjectId(authorId),
      })
    await client.close();
    return author;
}

const getAuthors= async (page: number, limit: number, sort: number, includes: string) =>{
    const client = await connectToDB();
    const db = client.database("test");
    const authors = db.collection<AuthorSchema>("authors");

    let criteria:any = { author : { $ne: null } };

    if(includes !== undefined){
        // case insensitive 
        criteria = { author : {'$regex' : includes, '$options' : 'i'}}
    }
    let result = await authors.find(criteria);

    if (sort !== undefined){
        result.sort({author: sort == 0? 1: -1});
    }

    if( page !== undefined && limit !== undefined){
        result.skip(page * limit);
        result.limit(limit);
    }
    return await result.toArray();

}

export { getAuthor, getAuthors }

