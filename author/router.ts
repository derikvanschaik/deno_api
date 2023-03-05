import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

export default function createRouter(db: any){

    const router = new Router();
    const { getAuthor, getAuthors } = db;
    
    router.get('/authors', async (ctx) => {
      let {sort, page, limit, includes } = helpers.getQuery(ctx);
      if( page !== undefined && limit !== undefined){
          [page, limit] = [parseInt(page), parseInt(limit)]
      }
      if( sort !== undefined){
          sort = parseInt(sort)
      }
      const authors = await getAuthors(page, limit, sort, includes);
      ctx.response.body = authors;
    });
    
    router.get('/authors/:authorName', async (ctx) =>{
        const author = await getAuthor(ctx.params.authorName)
        ctx.response.body = { author }
    })
    return router;

}
