# PG GET & POST

```
,________,         .------,          .------,         .------.
|________|       ,'_____,'|        ,'_____,'|        (        )
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | |        | ____ | |        |~------~|
|        |       |      | ;        | ____ | ;        |~------~|
|________|       |______|'         |______|'         `.______.'
 HTML/CSS          jQuery        Node / Express      PostgreSQL
```
Let's build a basic bookstore! 

We want to make a page to show all of our books and add new ones.


## Database Setup

Set up a `bookstore` database.  

Add a `books` table with columns for:
 - `title`: the name of the book - required, allow up to 250 characters
 - `author`: the author of the book - required, allow up to 100 characters
 - `published`: the date originally published - optional 


## Base Mode

- [ ] Express server setup w/ static files
- [ ] GET route to send back all books 
- [ ] POST route to add a book
- [ ] `index.html` page shows all books (Ajax GET)
- [ ] page allows you to add a new book (Ajax POST)
- [ ] Clear form on sucessful add of new book
- [ ] Page should refresh with up to date data after new book added

## Stretch Goals

- [ ] Improve the styling of the page -- Bootstrap & CSS
    - [ ] Center the header, table, on the page
    - [ ] Give alternating rows difference in color
    - [ ] Give Labels to the input boxes
    - [ ] Give the form its own area on the page -- make it distinct from the table
    - [ ] Maeke the page responsive -- Bootstrap Containers will be helpful!
- [ ] Add validation to your form

