const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const url = require('url');
const app = express();
const port = process.env.PORT || 5000;
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
// Static files (might not get to setting up a client, but just in case)
app.use( express.static('server/public') );

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: process.env.DATABASE_NAME || 'bookstore', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

const pool = new pg.Pool(config);
//const Pool = pg.Pool;

// Tests the connection
pool.on('connect', () => {
   console.log('Connected to the database');
 })
 
 pool.on('error', (error) => {
   console.log('Error with database pool', error);
 })

app.get('/books', (req, res) => {
   const sqlText = 'SELECT * FROM books ORDER BY author, title'
   pool.query(sqlText)
      .then((result) =>{
         console.log(result);
         res.send(result.rows);
      })
      .catch((error) =>{
         console.log('Error making query');
         res.sendStatus(500);
      })
})

app.post('/books', (req, res) => {
   const newBook = req.body;
   const sqlText = `INSERT INTO books (title, author, published) VALUES 
   ($1, $2, $3)`;
   // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
   // the $1, $2, etc get substituted with the values from the array below
   pool.query(sqlText, [newBook.title, newBook.author, newBook.published])
     .then( (result) => {
       console.log(`Added song to the database`, newBook);
       res.sendStatus(201);
     })
     .catch( (error) => {
       console.log(`Error making database query ${sqlText}`, error);
       res.sendStatus(500); // Good server always responds
     })
 })

 // req.params refers to the params specified in the the url template,
 // so in this case :id is the param, therefore use req.params.id
 app.delete('/books/:id', (req, res) => {
  let reqId = req.params.id;
  let sqlText = 'DELETE FROM books WHERE book_id=$1';
  pool.query(sqlText, [reqId])
    .then( (result) => {
      console.log(req);
      res.sendStatus(200);
    })
    .catch( (error) => {
      console.log(`Error deleting`);
      res.sendStatus(500); // Good server always responds
    })
 })

 app.listen( port, () => {
  console.log('up and running on port ', port);
});