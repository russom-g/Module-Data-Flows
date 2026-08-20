let myLibrary = [];

function setup() {
  populateStorage();
  render();
}

window.addEventListener("load", setup) 

function populateStorage() {
  if (myLibrary.length === 0) {
    myLibrary.push(new Book("Robinson Crusoe", "Daniel Defoe", "252", true));
    myLibrary.push(new Book("The Old Man and the Sea","Ernest Hemingway", "127", true ));
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

function Book(title, author, pages, wasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = wasRead;
}

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (!title.value || !author.value || !pages.value ) {
    alert("Please fill all fields!");
    return false;
  } 
  if (isNaN(pages.value) || Number(pages.value) <= 0) {
    alert("Pages must be a valid number!");
    return false;
  }
    myLibrary.push(new Book(title.value, author.value, Number(pages.value), check.checked));
    render();
  }

function render() {
  const table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;

  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");

    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    
    let readStatus = "";
    if (myLibrary[i].check == false) {
      readStatus = "No";
    } else {
      readStatus = "Yes";
    }
    changeBut.innerText = readStatus;

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let delButton = document.createElement("button");

    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    
    delButton.innerHTML = "Delete";

    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
