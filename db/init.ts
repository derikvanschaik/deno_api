// this creates the db data for the readonly authors 
import connectToDB from "./connect.ts";
import { AuthorSchema } from "./db.ts";

const client = await connectToDB();

const db = client.database("test");
const authors = db.collection<AuthorSchema>("authors");

const jsonResponse = await fetch("https://type.fit/api/quotes");
const jsonData = await jsonResponse.json();

const distinct = {};
for(let {author, text} of jsonData){
    author = author === null? 'Unknown' : author;
    if(!distinct[author]){
        distinct[author] = { author, quotes: []}
    }
    distinct[author].quotes.push(text);
}
await authors.insertMany([...Object.keys(distinct)].map( auth => {
    const author = {
        author: auth, 
        quotes: distinct[auth].quotes,
        image: ''
    }
    return author;
}))

await client.close();


