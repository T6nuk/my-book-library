// Write a constructor for making “Book” objects

// TODO
// add images to books
//

const myLibrary = [];

// constructor

// function Book(title, author, genre, pages, description, image, status, id) {
//   this.title = title;
//   this.author = author;
//   this.genre = genre;
//   this.pages = pages;
//   this.description = description;
//   this.image = image;
//   this.status = status;
//   this.id = id;

//   this.displayInfo = function () {
//     return [
//       this.title,
//       this.author,
//       this.genre,
//       this.pages,
//       this.description,
//       this.image,
//       this.status,
//     ];
//   };
// }

// class

class Book {
  constructor(title, author, genre, pages, description, image, status, id) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.description = description;
    this.image = image;
    this.status = status;
    this.id = id;
  }

  get bookInfo() {
    return `${this.title}
            ${this.author}
            ${this.genre}
            ${this.pages}
            ${this.description}
            ${this.image}
            ${this.status}
            ${this.id}
            `;
  }
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
  const id = crypto.randomUUID();
  const newBook = new Book(
    title,
    author,
    genre,
    pages,
    description,
    image,
    status,
    id
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
    console.log(book.bookInfo);

    const div = document.createElement("div");
    div.classList.add("book-buttons");
    const table = document.createElement("table");
    const tBody = document.createElement("tbody");
    const button = document.createElement("button");
    button.classList.add("remove-button");
    button.textContent = "X";
    button.addEventListener("click", () => {
      removeBooks(myLibrary, book.id);
      console.log(myLibrary);
      bookCards.textContent = "";
      displayBooks();
    });
    const statusButton = document.createElement("button");
    statusButton.classList.add("status-button");
    statusButton.textContent = "Status";
    statusButton.addEventListener("click", () => {
      toggleStatus(book.id);
      bookCards.textContent = "";
      displayBooks();
    });

    bookCards.appendChild(table);
    table.appendChild(tBody);
    table.appendChild(div);
    div.appendChild(button);
    div.appendChild(statusButton);
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
const btn = document.getElementById("modal-btn");
const span = document.getElementsByClassName("close")[0];

let form = document.querySelector("#book-info");
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
form.addEventListener("submit", addBooks);
const bookStatus = document.querySelector("#status");

function addBooks(Event) {
  Event.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  const genre = form.genre.value;
  const pages = form.pages.value;
  const description = form.description.value;
  const image = form.image.value;
  const status = bookStatus.checked ? "read" : "unread";

  addBookToLibrary(title, author, genre, pages, description, image, status);

  modal.style.display = "none";
  bookCards.textContent = "";

  displayBooks();
}

function removeBooks(arr, id) {
  const objectIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objectIndex, 1);
  return arr;
}
function toggleStatus(bookId) {
  const book = myLibrary.find((b) => b.id === bookId);
  if (book) {
    if (book.status === "read") {
      book.status = "unread";
    } else {
      book.status = "read";
    }
  }
}
