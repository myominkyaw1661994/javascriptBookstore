//Book class

class Book {
  constructor(title, author, isbm) {
    this.title = title;
    this.author = author;
    this.isbm = isbm;
  }
}

//UI Class :Hand the UI

class UI {
  static dispalyBooks() {
    const storedBook = Store.getBooks();
    const book = storedBook;
    book.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbm}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        
    `;

    list.appendChild(row);
  }

  static deleteBook(targetElement) {
    if (targetElement.classList.contains("delete")) {
      targetElement.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const span = document.querySelector("#myspan1");

    container.insertBefore(div, span);

    //Vanish in 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbm").value = "";
  }
}

//Store CLass : Hand the store

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    //get book from local Storage
    const books = Store.getBooks();
    //add book to the books array
    books.push(book);
    //Reset the book array
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbm) {
    //get book form local Storage
    const books = Store.getBooks();
    //loop and find the books
    books.forEach((book, index) => {
      if (book.isbm === isbm) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event : Display Book
// When load the page UI.displayBooks function will run
document.addEventListener("DOMContentLoaded", UI.dispalyBooks);

//Event : Add a book
document.querySelector("#book-form").addEventListener("submit", e => {
  //Get form value
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbm = document.querySelector("#isbm").value;

  //validation book
  if (title === "" || author === "" || isbm === "") {
    const message = "Please Enter all file";

    UI.showAlert(message, "danger");
  } else {
    const book = new Book(title, author, isbm);
    // Add Book to UI
    UI.addBookToList(book);

    // Add book to storeage
    Store.addBook(book);

    //Clear fiels
    UI.clearField();
    //show alert
    UI.showAlert("Success", "success");
  }
});

//Event : Remove a book

document.querySelector("#book-list").addEventListener("click", e => {
  // Remove book from UI
  UI.deleteBook(e.target);
  //Remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //Show alert
  UI.showAlert("Book Removed", "success");
});
