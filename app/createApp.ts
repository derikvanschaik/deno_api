import { Application } from 'https://deno.land/x/oak/mod.ts';
import createAuthorRouter from '../author/router.ts'
import createQuotesRouter from '../quote/router.ts';

export default async function createApp(services){
    const {authorService, quotesService } = services;
    const app = new Application();
    
    const authorRouter = createAuthorRouter(authorService);
    app.use(authorRouter.allowedMethods());
    app.use(authorRouter.routes());
    
    const quotesRouter = createQuotesRouter(quotesService);
    app.use(quotesRouter.allowedMethods());
    app.use(quotesRouter.routes());
    
    // middleware for json 
    app.use(async (ctx, next) => {
        ctx.response.headers.set("Content-Type", "application/json")
        next();
      });

    return app;

}