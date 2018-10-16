const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const port = process.env.PORT || 5000;
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// Static files (might not get to setting up a client, but just in case)
app.use( express.static('public/static') );

const Pool = pg.Pool;
const pool = new Pool({
    database: 'bookstore', // database name (this will change)
    host: 'localhost', // where to find the database
    port: 5432,        // port for finding the database
    max: 10,           // max number of connections for the pool
    idleTimeoutMillis: 30000 // 30 seconds before timeout/cancel query
});

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
   const sqlText = `INSERT INTO books (author, title, published) VALUES 
   ($1, $2, $3)`;
   // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
   // the $1, $2, etc get substituted with the values from the array below
   pool.query(sqlText, [newBook.author, newBook.title, newBook.published])
     .then( (result) => {
       console.log(`Added song to the database`, newBook);
       res.sendStatus(201);
     })
     .catch( (error) => {
       console.log(`Error making database query ${sqlText}`, error);
       res.sendStatus(500); // Good server always responds
     })
 })

 app.listen( port, () => {
  console.log('up and running on port ', port);
});