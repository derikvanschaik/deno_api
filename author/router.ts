import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { getAuthor, getAuthors } from './db.ts';

const router = new Router();


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

router.get('/authors/:authorID', async (ctx) =>{
    const author = await getAuthor(ctx.params.authorID)
    ctx.response.body = { author }
})

// router.post('/', (ctx) => {
//   ctx.response.body = 'Received a POST HTTP method';
// });

// router.put('/', (ctx) => {
//   ctx.response.body = 'Received a PUT HTTP method';
// });

// router.delete('/', (ctx) => {
//   ctx.response.body = 'Received a DELETE HTTP method';
// });

export default router