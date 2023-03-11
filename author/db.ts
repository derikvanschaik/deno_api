import connectToDB from "../db/connect.ts";
import { replaceQueryPlaceholders } from "../utils.ts";

// this database service
export interface AuthorService {
    getAuthors: (page: number, limit: number, sort: number, includes: string) => Promise<any>;
}


const getAuthors= async (page: number, limit: number, sort: number, includes: string) =>{
    const client = await connectToDB();

    const hasFilter = includes !== undefined;
    const hasSort = sort !== undefined;
    const hasLimit = limit !== undefined;
    const hasOffset = page !== undefined;

    let query = `
    SELECT author_name, CAST(count(author_name) AS INT)
    FROM quotes
    JOIN authors ON quotes.author_id = authors.author_id
    ${hasFilter? 'WHERE author_name LIKE ?' : ''}
    GROUP BY author_name
    ${hasSort? 'ORDER BY author_name ' + (sort === 1? 'DESC': 'ASC')  : ''}
    ${hasLimit? 'LIMIT ?': ''}
    ${hasOffset? 'OFFSET ?' : ''}
    `
    const params = [];
    if(hasFilter){
        params.push('%'+ includes+ '%');
    }
    if(hasLimit){
        params.push(limit);
    }
    if(hasOffset){
        params.push(page);
    }
    query = replaceQueryPlaceholders(query, params)
    
    const result = await client.queryArray(query, params)
    await client.end()
    return result.rows;

}

const service: AuthorService = {  getAuthors }
export default service;

