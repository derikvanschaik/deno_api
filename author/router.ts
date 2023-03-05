import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

export default function createRouter(db: any){

    const router = new Router();
    const { getAuthor, getAuthors } = db;
    
    router.get('/authors', async (ctx) => {
      let {sort, page, limit, includes } = helpers.getQuery(ctx);
      let pageParam: number | undefined;
      let limitParam: number | undefined;
      let sortParam: number | undefined;

      if( page !== undefined && limit !== undefined){
          [pageParam, limitParam] = [parseInt(page), parseInt(limit)]
      }
      if( sort !== undefined){
          sortParam = parseInt(sort)
      }
      const authors = await getAuthors(pageParam, limitParam, sortParam, includes);
      ctx.response.body = authors;
    });
    
    router.get('/authors/:authorName', async (ctx) =>{
        const author = await getAuthor(ctx.params.authorName)
        ctx.response.body = { author }
    })
    return router;

}
