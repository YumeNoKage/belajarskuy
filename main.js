// Add Variable

const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

// Generate
function generateId() {
  return +new Date();
}

// Kriteria 1: Mampu Menambahkan Data Buku
// fungsi Generate ID Book
function generateBookObject(id, book, author, year, isComplete) {
  return {
    id: +new Date(),
    book,
    author,
    year,
    isComplete,
  };
}

// Fungsi Buat Buku
function buatBuku(bookObject) {
  const textJudul = document.createElement("h3");
  textJudul.innerText = bookObject.book;

  const textPenulis = document.createElement("p");
  textPenulis.innerText = bookObject.author;

  const textTahun = document.createElement("p");
  textTahun.innerText = bookObject.year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("action");
  textContainer.append(textJudul, textPenulis, textTahun);

  const container = document.createElement("div");
  container.classList.add("book_item");
  container.append(textContainer);
  container.setAttribute("id", `todo-${bookObject.id}`);

  const tombolHapus = document.createElement("button");
  tombolHapus.classList.add("red");
  tombolHapus.innerHTML = "           <box-icon name='trash'></box-icon>" + " <p>Hapus buku</p>";
  tombolHapus.addEventListener("click", function () {
    hapusBukuFromCompleted(bookObject.id);
  });

  const btnEditBuku = document.createElement("button");
  btnEditBuku.classList.add("blue");
  btnEditBuku.innerHTML = "<box-icon name='edit-alt'></box-icon>" + "<p>Edit buku</p>";
  btnEditBuku.addEventListener("click", function () {
    const cardEdit = document.querySelector(".editBook");
    cardEdit.style.display = "flex";
    s;
  });
  container.append(btnEditBuku);

  // Kondisi buku
  if (bookObject.isComplete) {
    const tombolUndo = document.createElement("button");
    tombolUndo.classList.add("green");
    tombolUndo.innerHTML = "<box-icon name='x'></box-icon>" + "<p>Belum selesai dibaca</p>";
    tombolUndo.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    container.append(tombolUndo, tombolHapus);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("green");
    checkButton.innerHTML = "<box-icon name='check' ></box-icon>" + " <p>Selesai Dibaca</p>";
    checkButton.addEventListener("click", function () {
      tambahBukuToCompleted(bookObject.id);
    });
    container.append(checkButton, tombolHapus);
  }

  return container;
}

function tambahBuku() {
  const judulBuku = document.getElementById("inputBookTitle").value;
  const penulis = document.getElementById("inputBookAuthor").value;
  const tahunBuku = document.getElementById("inputBookYear").value;
  const selesaiDiBaca = document.getElementById("inputBookIsComplete").checked;

  const generatedId = generateId();
  const bookObject = generateBookObject(generateId, judulBuku, penulis, +tahunBuku, selesaiDiBaca);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// fungsi tambah Buku
function tambahBukuToCompleted(bookId) {
  const bookTarget = cariBuku(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// fungsi cari buku
function cariBuku(bookId) {
  for (bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function hapusBukuFromCompleted(bookId) {
  const bookTarget = cariBukuIndex(bookId);
  const removeAlert = confirm("Apakah anda yakin menghapus buku ini? ");

  if (removeAlert == true) {
    bookTarget === -1;
    books.splice(bookTarget, 1);
    saveData();
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
}

function undoBookFromCompleted(bookId) {
  const bookTarget = cariBuku(bookId);
  if (bookTarget == null) return;
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Fungsi search
function cariBukuIndex(bookId) {
  for (index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

document.addEventListener(RENDER_EVENT, function () {
  // rak 1 (belum selesai)
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  incompleteBookshelfList.innerHTML = "";
  // rak 2 selesai
  const completeBookshelfList = document.getElementById("completeBookshelfList");
  completeBookshelfList.innerHTML = "";

  for (bookItem of books) {
    const bookElement = buatBuku(bookItem);
    if (bookItem.isComplete) {
      completeBookshelfList.append(bookElement);
    } else {
      incompleteBookshelfList.append(bookElement);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");

  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    tambahBuku();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung ya gaes ya");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (book of data) {
      books.push(book);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// Search book
const searchButton = document.getElementById("searchSubmit");
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const bookList = document.getElementById("searchBookTitle").value;
  const filter = document.querySelectorAll(".book_item");
  for (buku of filter) {
    const judul = buku.innerText;

    if (judul.includes(bookList)) {
      buku.style.display = "block";
    } else {
      buku.style.display = "none";
    }
  }
});

const clearSearch = document.querySelector(".clearSearch");
clearSearch.addEventListener("click", function () {
  const inputValue = document.querySelector("#searchBookTitle");
  inputValue.value = "";
  const bookList = document.getElementById("searchBookTitle").value;

  const filter = document.querySelectorAll(".book_item");
  for (buku of filter) {
    const judul = buku.innerText;

    if (judul.includes(bookList)) {
      buku.style.display = "block";
    } else {
      buku.style.display = "none";
    }
  }
});

// -------------- card edit ------------
const editKembali = document.querySelector(".editBook .btn-kembali");
editKembali.addEventListener("click", function () {
  const cardEdit = document.querySelector(".editBook");
  cardEdit.style.display = "none";
});

const simpanEdit = document.querySelector(".btn-simpan");
simpanEdit.addEventListener("click", function (bookId) {
  const cardEdit = document.querySelector(".editBook");
  cardEdit.style.display = "none";

  EditBuku(bookId);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
});

function EditBuku(bookId) {
  for (bookItem of books) {
    if (bookItem.id === bookId) {
      // tangkap value inputEdit
      const titleBaru = document.querySelector("#inputEditBookTitle").value;
      const authorBaru = document.querySelector("#inputEditBookAuthor").value;
      const yearBaru = document.querySelector("#inputEditBookYear").value;
      // replace value
      bookItem.book = titleBaru;
      bookItem.author = authorBaru;
      bookItem.year = yearBaru;
      // const generatedId = generateId();
      // const bookObject = generateBookObject(judulBuku, penulis, +tahunBuku, selesaiDiBaca);
      // books.push(bookObject);

      // document.dispatchEvent(new Event(RENDER_EVENT));
      // saveData();
    }
  }
  return null;
}
