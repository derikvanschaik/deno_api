import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import createApp from './app/createApp.ts';
// types 
import { AuthorService } from "./author/db.ts";
import { QuoteService } from "./quote/db.ts";

const quoteService:QuoteService = { 
    getQuotes: async function(authorName:any, page:any, limit:any, includes:any){
        return [{ quote: "bla", author: "James Gordo"}]
    }
};
const authorService:AuthorService = {
    getAuthors: async function() {
        return null;
    },
    getAuthor: async function(){
        return null;
    }
};
const app = await createApp({ quoteService, authorService});

Deno.test("quotes/ without params returns a 200 status", async () => {
  const request = await superoak(app);
  await request.get("/quotes").expect(200);
});

Deno.test("quotes/ with valid params returns a 200 status", async () => {
    const request = await superoak(app);
    await request.get("/quotes?sort=0&page=1&limit=10&includes=hello").expect(200);
});

Deno.test("quotes/ with invalid params returns a 400 status", async () => {
    const request = await superoak(app);
    await request.get("/quotes?page=-1&limit=10").expect(400);
});

Deno.test("quotes/:author without params returns a 200 status", async () => {
    const request = await superoak(app);
    await request.get("/quotes/Fake Author").expect(200);
});

Deno.test("quotes/:author with valid params returns a 200 status", async () => {
    const request = await superoak(app);
    await request.get("/quotes/Fake Author?sort=0&page=1&limit=10&includes=hello").expect(200);
});

Deno.test("quotes/:author with invalid params returns a 400 status", async () => {
    const request = await superoak(app);
    await request.get("/quotes/Fake Author?page=-1&limit=-10").expect(400);
});