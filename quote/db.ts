import connectToDB from "../db/connect.ts";
import { replaceQueryPlaceholders } from "../utils.ts";

// this database service
export interface QuoteService {
    getQuotesByAuthor: (authorName: string) => Promise<any>;
    getQuotes: (page: number, limit: number, includes: string) => Promise<any>;
}
const getQuotesByAuthor = async (authorName: string) => {
    const client = await connectToDB();
    const query = `
    SELECT 
        author_name, quote 
    FROM 
        quotes 
    JOIN 
        authors on authors.author_id = quotes.author_id
    WHERE author_name=$1
    `
    const result = await client.queryObject(query, [authorName])
    await client.end();
    return result.rows;
}

const getQuotes = async (page: number, limit: number, includes: string) =>{
    const client = await connectToDB();

    let query = 'SELECT author_name, quote FROM quotes JOIN authors on authors.author_id = quotes.author_id';
    const params = [];
    if(includes !== undefined){
        query += " WHERE quote ~* ?"
        params.push(includes);
    }
    if(limit !== undefined){
        query += ' LIMIT ? '
        params.push(limit)
    }
    if(page !== undefined){
        query += ' OFFSET ?'
        const lim = limit ?? 50;
        params.push((page * lim) );
    }
    query = replaceQueryPlaceholders(query, params)

    let result: any;
    if(params.length === 0){
        result = await client.queryObject(query)
    }else{
        result = await client.queryObject(query, params)
    }
    await client.end()
    return result.rows;
}

const service:QuoteService = { getQuotes, getQuotesByAuthor }
export default service

