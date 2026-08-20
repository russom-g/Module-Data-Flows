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
  if (!titleInput.value || !authorInput.value || !pagesInput.value) {
    alert("Please fill all fields!");
    return false;
  }
  if (isNaN(pagesInput.value) || Number(pagesInput.value) <= 0) {
    alert("Pages must be a valid number!");
    return false;
  }
  myLibrary.push(
    new Book(
      titleInput.value,
      authorInput.value,
      Number(pagesInput.value),
      readInput.checked
    )
  );
  render();
}

function render() {
  const table = document.getElementById("display");
  const rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const row = table.insertRow(1);

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement("button");

    changeBut.className = "btn btn-success";
    changeBut.textContent = myLibrary[i].wasRead ? "Yes" : "No";

    wasReadCell.appendChild(changeBut);

    changeBut.addEventListener("click", function () {
      myLibrary[i].wasRead = !myLibrary[i].wasRead;
      render();
    });

    //add delete button to every row and render again
    const delButton = document.createElement("button");

    delButton.className = "btn btn-warning";
    delButton.textContent = "Delete";

    deleteCell.appendChild(delButton);

    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}

window.addEventListener("load", setup);
