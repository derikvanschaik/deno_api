import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

export default function createRouter(db: any){
    const router = new Router();
    const { getQuotes, getQuotesByAuthor } = db;

    router.get('/quotes', async (ctx) => {
      let { page, limit, includes } = helpers.getQuery(ctx);
      let pageParam: number | undefined;
      let limitParam: number | undefined;

      if( page !== undefined){
          pageParam = parseInt(page)
          if(pageParam < 0 ){
              ctx.response.status = 400;
              ctx.response.body = { message : "invalid param value"}
              return;
          }
      }
      if( limit !== undefined){
        limitParam = parseInt(limit)
        if(limitParam < 0 ){
            ctx.response.status = 400;
            ctx.response.body = { message : "invalid param value"}
            return;
        }
      }
      const quotes = await getQuotes(pageParam, limitParam, includes);
      ctx.response.body = quotes;
    });
    
    router.get('/quotes/:authorName', async (ctx) =>{
        const quotes = await getQuotesByAuthor(ctx.params.authorName);
        ctx.response.body = quotes;
    })
    return router;

}

