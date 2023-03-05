import "https://deno.land/x/dotenv/load.ts";
import authorService from './author/db.ts';
import quoteService from './quote/db.ts'
import createApp from './app/createApp.ts';


const port = Deno.env.get("PORT") || 3000;
const app = await createApp({ authorService, quoteService });

app.addEventListener('listen', () => {
  console.log(`Listening on port ${port}`);
});

await app.listen({ port });