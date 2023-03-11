// // this creates the db data for the readonly authors 
// import connectToDB from "./connect.ts";

// const client = await connectToDB();

// await client.queryObject(`
// DROP TABLE IF EXISTS quotes;
// DROP TABLE IF EXISTS authors;

// CREATE TABLE IF NOT EXISTS authors(
//    author_id INT GENERATED ALWAYS AS IDENTITY,
//    author_name VARCHAR(255),
//    PRIMARY KEY(author_id)
// );

// CREATE TABLE IF NOT EXISTS quotes(
//    quote_id INT GENERATED ALWAYS AS IDENTITY,
//    author_id INT,
//    quote text,
//    PRIMARY KEY(quote_id),
//    CONSTRAINT fk_author
//       FOREIGN KEY(author_id) 
// 	  REFERENCES authors(author_id)
// );
// `)
// const jsonResponse = await fetch("https://type.fit/api/quotes");
// const jsonData = await jsonResponse.json();
// const authors = new Map<string, number>();

// // 1673 rows in total so count can help determine your progress
// let count = 0;
// for (let {author , text } of jsonData){
//     console.log("working on author: ", author, "count = ", count++);
//     author = author? author: 'Unknown'
//     if(!authors.has(author)){
//         const result = await client.queryObject(
//             `INSERT INTO authors(author_name) VALUES ($1) RETURNING author_id`, [author])
//         const {author_id} = result.rows[0];
//         authors.set(author, author_id)
//     }
//     const author_id = authors.get(author);
//     await client.queryObject(
//         `INSERT INTO quotes(quote, author_id) VALUES ($1, $2)`, [text, author_id]);
//     client.release();
// }


