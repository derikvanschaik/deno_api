import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

export default function createRouter(db: any){
    const router = new Router();
    const { getQuotes } = db;

    router.get('/quotes', async (ctx) => {
      let { page, limit, includes } = helpers.getQuery(ctx);
      let pageParam: number | undefined;
      let limitParam: number | undefined;

      if( page !== undefined && limit !== undefined){
          [pageParam, limitParam] = [parseInt(page), parseInt(limit)]
          if(pageParam < 0 || limitParam < 0){
              ctx.response.status = 400;
              ctx.response.body = { message : "Page and limit query parameters cannot be negative"}
              return;
          }
      }
      const quotes = await getQuotes(undefined, pageParam, limitParam, includes);
      ctx.response.body = quotes;
    });
    
    router.get('/quotes/:authorName', async (ctx) =>{
        let { page, limit, includes } = helpers.getQuery(ctx);
        let pageParam: number | undefined;
        let limitParam: number | undefined;
        if( page !== undefined && limit !== undefined){
            [pageParam, limitParam] = [parseInt(page), parseInt(limit)]
            if(pageParam < 0 || limitParam < 0){
                ctx.response.status = 400;
                ctx.response.body = { message : "Page and limit query parameters cannot be negative"}
                return;
            }
        }
        const quotes = await getQuotes(ctx.params.authorName, pageParam, limitParam, includes);
        ctx.response.body = quotes;
    })
    return router;

}

