// this creates the db data for the readonly authors 
import connectToDB from "./connect.ts";

interface QuoteSchema {
    author: string;
    quote: string;
}

const client = await connectToDB();

const db = client.database("test");
const quotes = db.collection<QuoteSchema>("quotes");

const jsonResponse = await fetch("https://type.fit/api/quotes");
const jsonData = await jsonResponse.json();

await quotes.insertMany(
    jsonData.map( ({ author, text }) => {
        const quote = {
            author: author === null? 'Unknown' : author,
            quote: text,
        };
        return quote;
         
    })
);

await client.close();


