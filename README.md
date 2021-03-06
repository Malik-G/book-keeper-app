# Book Keeper
This app allows the user to create and edit a list of books. These entries are saved to a database.

## Technologies
```
,________,         .------,          .------,         .------.
|________|       ,'_____,'|        ,'_____,'|        (        )
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | ;        | ____ | ;        |~------~|
|________|       |______|'         |______|'         `.______.'
 HTML/CSS          jQuery        Node / Express      PostgreSQL
```

## Database Setup
If you wish to fork and/or clone, make sure to setup a postgreSQL database named `bookstore`.  

Add a `books` table with columns for:
 - `title`: the name of the book - required, allow up to 250 characters
 - `author`: the author of the book - required, allow up to 100 characters
 - `published`: the date originally published - optional 

## My Process
- [ ] Express server setup w/ static files
- [ ] GET route to send back all books 
- [ ] POST route to add a book
- [ ] `index.html` page shows all books (Ajax GET)
- [ ] Page allows you to add a new book (Ajax POST)
- [ ] Clear form on sucessful add of new book
- [ ] Page should refresh with up to date data after a book is added or deleted

## Stretch Goals
- Fix book editing
