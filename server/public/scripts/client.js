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
   //$('#bookCollectionDisplay').append(`<h3>Current Book Collection:</h3>`);
   for(let obj of arrOfObjs){
      $('#bookTable').append(`<tr>
      <td>${obj.title}</td>
      <td>${obj.author}</td>
      <td>${obj.published.substring(0,10)}</td>
      <tr`);
   }
}