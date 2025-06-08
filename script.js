// Write a constructor for making “Book” objects
const myLibrary = [];

function Book(title, author, genre, pages, description, image, status, id) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.description = description;
  this.image = image;
  this.status = status;
  this.id = id;

  this.displayInfo = function () {
    return [
      this.title,
      this.author,
      this.genre,
      this.pages,
      this.description,
      this.image,
      this.status,
    ];
  };
}

function addBookToLibrary(
  title,
  author,
  genre,
  pages,
  description,
  image,
  status
) {
  const newBook = new Book(
    title,
    author,
    genre,
    pages,
    description,
    image,
    status,
    (id = crypto.randomUUID())
  );
  myLibrary.push(newBook);
}
addBookToLibrary(
  "Crime and Punishment",
  "Fyodor Dostoevsky",
  "Literary fiction",
  "527",
  "Description",
  "Image",
  "read"
);
addBookToLibrary(
  "Martin Eden",
  "Jack London",
  "Künstlerroman",
  "393",
  "Description",
  "Image",
  "read"
);
addBookToLibrary(
  "East of Eden",
  "John Steinbeck",
  "Novel",
  "813",
  "Description",
  "image",
  "read"
);
const bookCards = document.getElementById("book-cards");

function displayBooks() {
  myLibrary.forEach((book) => {
    const table = document.createElement("table");
    const tBody = document.createElement("tbody");
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", (Event) => {
      removeBooks(myLibrary, book.id);
      console.log(myLibrary);
      bookCards.textContent = "";
      displayBooks();
    });

    bookCards.appendChild(table);
    table.appendChild(tBody);
    table.appendChild(button);
    table.dataset.id = book.id;
    console.log(book.id);

    Object.keys(book).forEach((key) => {
      const tRow = document.createElement("tr");
      const tHeader = document.createElement("th");
      const tDetail = document.createElement("td");

      const firstLetter = key.charAt(0);
      const firstLetterCap = firstLetter.toUpperCase();
      const remainingLetters = key.slice(1);

      const capitalizedWord = firstLetterCap + remainingLetters;
      if (key === "id" || key === "displayInfo") {
        return;
      } else {
        tBody.appendChild(tRow);
        tRow.appendChild(tHeader);
        tHeader.textContent = ` ${capitalizedWord}`;
        tRow.appendChild(tDetail);
        tDetail.textContent = ` ${book[key]}`;
      }
    });
  });
}
displayBooks();

// adding a book, modal

const modal = document.getElementById("bookform");
const btn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];

// create new Book object from form data
let form = document.querySelector("#book-info");
function addBooks() {
  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  form.addEventListener("submit", (Event) => {
    let bookTitle = document.querySelector("#title");
    let bookAuthor = document.querySelector("#author");
    let bookGenre = document.querySelector("#genre");
    let bookPages = document.querySelector("#pages");
    let bookDescription = document.querySelector("#description");
    let bookImage = document.querySelector("#image");
    let bookStatus = document.querySelector("#status");

    const title = bookTitle.value;
    const author = bookAuthor.value;
    const genre = bookGenre.value;
    const pages = bookPages.value;
    const description = bookDescription.value;
    const image = bookImage.value;
    const status = bookStatus.value;
    addBookToLibrary(title, author, genre, pages, description, image, status);
    bookCards.textContent = "";
    modal.style.display = "none";
    displayBooks();
    Event.preventDefault();
  });
}
addBooks();

function removeBooks(arr, id) {
  const objectIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objectIndex, 1);
  return arr;
}
