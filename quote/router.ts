import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { getQuotes } from './db.ts';

const router = new Router();


router.get('/quotes', async (ctx) => {
  let { page, limit, includes } = helpers.getQuery(ctx);
  if( page !== undefined && limit !== undefined){
      [page, limit] = [parseInt(page), parseInt(limit)]
  }
  const quotes = await getQuotes(undefined, page, limit, includes);
  ctx.response.body = quotes;
});

router.get('/quotes/:authorName', async (ctx) =>{
    let { page, limit, includes } = helpers.getQuery(ctx);
    if( page !== undefined && limit !== undefined){
        [page, limit] = [parseInt(page), parseInt(limit)]
    }
    const quotes = await getQuotes(ctx.params.authorName, page, limit, includes);
    ctx.response.body = quotes;
})

export default router