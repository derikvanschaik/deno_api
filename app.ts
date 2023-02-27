import { Application } from 'https://deno.land/x/oak/mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import router from './api/author.ts'


const port = Deno.env.get("PORT") || 8000;
const app = new Application();

app.use(router.allowedMethods());
app.use(router.routes());

// middleware for json 
app.use(async (ctx, next) => {
    ctx.response.headers.set("Content-Type", "application/json")
    next();
  });

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });