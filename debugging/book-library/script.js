let myLibrary = [];

function Book(title, author, pages, wasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.wasRead = wasRead;
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("check");
const message = document.getElementById("message");
const bookList = document.getElementById("book-list");
const addBookButton = document.getElementById("add-book");

function setup() {
  addDefaultBooks();
  render();
}

function addDefaultBooks() {
  if (myLibrary.length === 0) {
    myLibrary.push(new Book("Robinson Crusoe", "Daniel Defoe", 252, true));
    myLibrary.push(
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
  }
}

function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);

  if (!title || !author || !pagesInput.value) {
    alert("Please fill all fields!");
    return;
  }
  if (isNaN(pages) || pages <= 0) {
    alert("Pages must be a valid number!");
    return;
  }
  myLibrary.push(new Book(title, author, pages, readInput.checked));
  render();
}

function render() {
  bookList.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = bookList.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const readButton = document.createElement("button");

    readButton.className = "btn btn-success";
    readButton.textContent = myLibrary[i].wasRead ? "Yes" : "No";

    wasReadCell.appendChild(readButton);

    readButton.addEventListener("click", function () {
      myLibrary[i].wasRead = !myLibrary[i].wasRead;
      render();
    });

    const deleteButton = document.createElement("button");

    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";

    deleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      const deleteTitle = myLibrary[i].title;

      myLibrary.splice(i, 1);
      render();
      message.textContent = `You've deleted title: ${deleteTitle}`;
    });
  }
}

window.addEventListener("load", setup);

addBookButton.addEventListener("click", addBook);
