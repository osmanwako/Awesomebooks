let books = [{ listid: '', title: '', author: '' }];
const bookform = document.getElementById('form-asm-bookid');
const booklist = document.getElementById('awesomebookslist');

let books = [{ listid: '', title: '', author: '' }];
const bookform = document.getElementById('form-asm-bookid');
const booklist = document.getElementById('awesomebookslist');

function isbookstored() {
  return localStorage.getItem('awesomebookslist');
}

function storebook() {
  localStorage.setItem('awesomebookslist', JSON.stringify(books));
}

function DeleteBook(event) {
  const parent = event.target.parentElement;
  const id = ${event.target.id};
  // console.log(event.target.id, books);
  books = books.filter((book) => book.listid !== id);
  storebook();
  if (parent) parent.remove();
}
function createbtn(id) {
  const button = document.createElement('input');
  button.type = 'submit';
  button.name = 'removebtn';
  button.value = 'Remove';
  button.id = id;
  button.addEventListener('click', DeleteBook);
  return button;
}

function createpar(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

function createInterface(id, title, author) {
  const container = document.createElement('div');
  const hrline = document.createElement('hr');
  container.append(createpar(title), createpar(author), createbtn(id), hrline);
  booklist.append(container);
}

function createBook(event) {
  const title = event.target.elements[0].value ?? '';
  const author = event.target.elements[1].value ?? '';
  const listid = book${Date.now()};
  if (isbookstored()) {
    books = [...books, { listid, title, author }];
  } else {
    books[0].title = title;
    books[0].author = author;
    books[0].listid = listid;
  }
  storebook();
  createInterface(listid, title, author);
  event.preventDefault();
  event.target.reset();
}

function start() {
  if (!isbookstored()) {
    return;
  }
  books = JSON.parse(localStorage.getItem('awesomebookslist'));
  books.forEach((book) => {
    createInterface(book.listid, book.title, book.author);
  });
}
bookform.addEventListener('submit', createBook);
start();
