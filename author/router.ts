import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

export default function createRouter(db: any){

    const router = new Router();
    const { getAuthors } = db;
    
    router.get('/authors', async (ctx) => {
      let {sort, sortBy, page, limit, includes } = helpers.getQuery(ctx);
      let pageParam: number | undefined;
      let limitParam: number | undefined;
      let sortParam: number | undefined;

      if(page !== undefined){
          pageParam = parseInt(page)
          if(pageParam < 0 ){
            ctx.response.status = 400;
            ctx.response.body = { message : "invalid param value"}
            return;
        }
      }
      if(limit !== undefined){
          limitParam = parseInt(limit)
          if(limitParam < 0 ){
            ctx.response.status = 400;
            ctx.response.body = { message : "invalid param value"}
            return;
        }
      }
      if( sort !== undefined){
          sortParam = parseInt(sort)
      }
      const authors = await getAuthors(pageParam, limitParam, sortParam, sortBy, includes);
      ctx.response.body = authors;
    });

    return router;

}
