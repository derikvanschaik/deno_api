import connectToDB from "../db/connect.ts";
import { replaceQueryPlaceholders } from "../utils.ts";

// this database service
export interface AuthorService {
    getAuthors: (page: number, limit: number, sort: number,sortBy: string,  includes: string) => Promise<any>;
}

// (pageParam, limitParam, sortTypeParam, sortByParam, includes)
const getAuthors= async (page: number, limit: number, sort: number,sortBy: string, includes: string) =>{
    const client = await connectToDB();

    const hasFilter = includes !== undefined;
    const hasSort = sort !== undefined;
    const hasLimit = limit !== undefined;
    const hasOffset = page !== undefined;

    let orderByColumnName = sortBy === 'quote_count'? 'quote_count ' : 'author_name ';
    let orderByType = sort === 1? 'DESC': 'ASC'

    let query = `
    SELECT author_name, CAST(count(author_name) AS INT) AS quote_count
    FROM quotes
    JOIN authors ON quotes.author_id = authors.author_id
    ${hasFilter? 'WHERE author_name ~* ?' : ''}
    GROUP BY author_name
    ${hasSort? 'ORDER BY ' + orderByColumnName + ' ' + orderByType  : ''}
    ${hasLimit? 'LIMIT ?': ''}
    ${hasOffset? 'OFFSET ?' : ''}
    `
    const params = [];
    if(hasFilter){
        params.push(includes);
    }
    if(hasLimit){
        params.push(limit);
    }
    if(hasOffset){
        const lim = limit ?? 50;
        params.push((page * lim));
    }
    query = replaceQueryPlaceholders(query, params)
    
    const result = await client.queryArray(query, params)
    await client.end()
    return result.rows;

}

const service: AuthorService = {  getAuthors }
export default service;

