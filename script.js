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
    const div = document.createElement("div");
    const table = document.createElement("table");
    const tBody = document.createElement("tbody");
    const button = document.createElement("button");
    button.textContent = "X";
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
function addBooks(Event) {
  Event.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  const genre = form.genre.value;
  const pages = form.pages.value;
  const description = form.description.value;
  const image = form.image.value;
  const status = form.status.value;
  addBookToLibrary(title, author, genre, pages, description, image, status);

  modal.style.display = "none";
  bookCards.textContent = "";
  displayBooks();
}
addBooks();

function removeBooks(arr, id) {
  const objectIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objectIndex, 1);
  return arr;
}
