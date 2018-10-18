$(document).ready(readyNow);

let newBook = {
   title: '',
   author: '',
   published: ''
}

function readyNow(){
   console.log('JS connected');
   getCollection();
   $('#addButton').on('click', addBook);
   $('#bookTable').on('click', '.deleteBtn', deleteBook);
   $('#bookTable').on('click', '.editBtn', editBook);
}

function addBook(event){
   event.preventDefault();
   getInputs();
   if(newBook.title === '' || newBook.author === '' || newBook.published === ''){
    alert('Missing information!');
    return;
  }
   $.ajax({
      method: 'POST',
      url: '/books',
      data: newBook
   }).then( function(response) {
      console.log('POST successful');
      getCollection();
   }).catch( function(response) {
      console.log('Error posting to server');
   })
}

function getInputs(){
   newBook.title = $('#titleInput').val();
   newBook.author = $('#authorInput').val();
   newBook.published = $('#dateInput').val();
}

function getCollection(){
   $.ajax({
      method: 'GET',
      url: '/books',
   }).then( function(response) {
      console.log('Data successfully received from server/database', response);
      appendBookData(response);
   }).catch( function(response) {
      console.log('Error receiving data from server/database');
   })
}

function appendBookData(arrOfObjs){
   $('#bookTable').empty();
   for(let obj of arrOfObjs){
     let newRow = $(`<tr>
      <td>${obj.title} <br> <input class="hide" type="text"> </td>
      <td>${obj.author} <br> <input class="hide" type="text"> </td>
      <td>${obj.published.substring(0,10)} <br> <input class="hide" type="text"> </td>
      <td><button class="deleteBtn">Delete</button>
      <button class="editBtn">Edit</button></td>
      <tr`);
      $('#bookTable').append(newRow);
      newRow.data('book_id', obj.book_id);
   }
}

function deleteBook(){
   let rowClicked = $(this).closest('tr');
   let bookId = rowClicked.data('book_id');
   $.ajax({
      method: 'DELETE',
      url: `/books/${bookId}`
   }).then(function(response){
      console.log('Successfully deleted from database');
      getCollection();
   })
}

function editBook(){
   let rowClicked = $(this).closest('tr');
   rowClicked.find('input').toggleClass('hide');
   
}