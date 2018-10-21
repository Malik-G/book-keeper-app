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
   $('#bookTable').on('click', '.acceptBtn', acceptEdits);
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

function deleteBook(){
   let rowClicked = $(this).closest('tr');
   let bookId = rowClicked.data('book_id');
   $.ajax({
      method: 'DELETE',
      url: `/books/${bookId}`
   }).then(function(response){
      console.log('Successfully deleted from database');
      getCollection();
   }).catch(function(error) {
      console.log('Error response from database:', error);
  })
}

function editBook(){
  let rowClicked = $(this).closest('tr');
  toggleEditFields(rowClicked);
}

function acceptEdits(){
  console.log('In makeEdits()');
  let rowClicked = $(this).closest('tr');
  let bookId = rowClicked.data('book_id');
  newBook.title = rowClicked.find('.input1').val();
  newBook.author = rowClicked.find('.input2').val();
  newBook.published = rowClicked.find('.input3').val();
  console.log('New edits:', newBook.title, '-', newBook.author, '-', newBook.published);
  $.ajax({
    method: 'PUT',
    url:`/books/update/${bookId}`,
    data:{
      title: newBook.title,
      author: newBook.author,
      published: newBook.published
    }
  }).then(function(response){
    console.log('Response from the sever:', response);
    getCollection();
  }).catch(function(error){
    console.log('Error updating database entry:', error);
  })
}

function getInputs(){
  newBook.title = $('#titleInput').val();
  newBook.author = $('#authorInput').val();
  newBook.published = $('#dateInput').val();
}

function appendBookData(arrOfObjs){
  $('#bookTable').empty();
  for(let obj of arrOfObjs){
    let newRow = $(`<tr>
     <td>${obj.title} <br> <input class="input1 hide" type="text"> </td>
     <td>${obj.author} <br> <input class="input2 hide" type="text"> </td>
     <td>${obj.published.substring(0,10)} <br> <input class="input3 hide" type="text"> </td>
     <td><button class="deleteBtn">Delete</button>
     <button class="editBtn">Edit</button>
     <button class="acceptBtn hide">Accept</button></td>
     <tr`);
     $('#bookTable').append(newRow);
     newRow.data('book_id', obj.book_id);
  }
}

function toggleEditFields(targetRow){
  targetRow.find('input').toggleClass('hide');
  targetRow.find('.acceptBtn').toggleClass('hide');
}
