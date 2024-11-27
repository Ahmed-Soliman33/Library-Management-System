const cardImg = document.getElementById("cardImg");
const bookInfo = document.getElementById("bookInfo");
const authorInfo = document.getElementById("authorInfo");
const iconContainer = document.getElementById("icon-container");
var currentUser = JSON.parse(localStorage.getItem("currentAccount"));
const booksData = JSON.parse(localStorage.getItem("data"));
import { defaultData } from "./defaultData.js";
import { getCurrentUser } from "./homeUser.js";

// get book id from url
const params = new URLSearchParams(window.location.search);
const bookId = Number(params.get("id"));

const favBooks = currentUser.favouriteBooks;

getCurrentUser();
const book = booksData.find((book) => book.id == bookId);

// check if book is favourite and display favourite icon
document.addEventListener("DOMContentLoaded", () => {
  iconContainer.innerHTML = `
    <i style="cursor: pointer; color: red;" id="favIcon" class="fa-${
      favBooks.some((book) => book.id === bookId) ? "solid" : "regular"
    } fa-heart"></i> `;

  const favIcon = document.getElementById("favIcon");
  // add event listener to favourite icon
  favIcon &&
    favIcon.addEventListener("click", () => {
      const favBooks = currentUser.favouriteBooks;
      console.log("clicked");

      if (favIcon.classList.contains("fa-solid")) {
        favIcon.classList.remove("fa-solid");
        favIcon.classList.add("fa-regular");

        const filteredBooks = favBooks.filter(
          (favBook) => favBook.id !== book.id
        );
        currentUser = { ...currentUser, favouriteBooks: filteredBooks };
      } else {
        favIcon.classList.remove("fa-regular");
        favIcon.classList.add("fa-solid");

        if (!favBooks.find((favBook) => favBook.id === book.id)) {
          favBooks.push(book);
          currentUser = { ...currentUser, favouriteBooks: favBooks };
        }
      }
      localStorage.setItem("currentAccount", JSON.stringify(currentUser));
      const users = JSON.parse(localStorage.getItem("User"));
      const filteredUsers = users.filter(
        (user) =>
          user.id !== JSON.parse(localStorage.getItem("currentAccount")).id
      );
      filteredUsers.push(currentUser);
      localStorage.setItem("User", JSON.stringify(filteredUsers));
    });

  // display book Img
  cardImg.innerHTML = `<img src="${book.imgUrl}" alt="Book" />`;
  // display book info
  bookInfo.innerHTML = ` <h3>${book.title}</h3>
          <span class="T">By <u>${book.author_date}</u></span>
          <br />
          <span class="B">Second Edition</span>
          <div class="rating-section">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <span>${book.rate} Rating · 25 Currently Reading · 119 Have Read</span>
          </div>
          <h5>Status</h5>
          <button class="in-shelf">In-Shelf</button>
          <button id="borrow-btn" class="borrow-btn">Borrow</button>
`;
  // display author Info
  authorInfo.innerHTML = ` <p>
            <span class="about-author"
              ><span class="about">About</span> Author</span
            >
          </p>
          <div>
            <h4>${book.author_date.split(",")[0]}</h4>
            <img
              class="author"
              src="../images/author.jpeg"
              alt="Author Photo"
            />
          </div>
          <p>
           ${book.about_author}
          </p>
`;
  // add event listener to borrow button
  const borrowBtn = document.getElementById("borrow-btn");
  const userData = currentUser.data;
  const isBookExists = userData.some((data) => data.id === book.id);
  if (isBookExists) {
    borrowBtn.textContent = "Return";
    borrowBtn.style.backgroundColor = "red";
  }
  borrowBtn.addEventListener("click", (e) => {
    const userData = currentUser.data;
    if (e.target.textContent === "Borrow") {
      e.target.textContent = "Return";
      e.target.style.backgroundColor = "red";
      userData.push(book);
      currentUser = { ...currentUser, data: userData };
      addIDtobooksData();
    } else {
      e.target.textContent = "Borrow";
      e.target.style.backgroundColor = "";
      const filteredData = userData.filter((data) => data.id !== book.id);
      currentUser = { ...currentUser, data: filteredData };
      removeIDfrombooksData();
    }
    localStorage.setItem("currentAccount", JSON.stringify(currentUser));
    const users = JSON.parse(localStorage.getItem("User"));
    const filteredUsers = users.filter(
      (user) =>
        user.id !== JSON.parse(localStorage.getItem("currentAccount")).id
    );
    filteredUsers.push(currentUser);
    localStorage.setItem("User", JSON.stringify(filteredUsers));
  });
});

const addIDtobooksData = () => {
  booksData.forEach((book) => {
    if (book.id == bookId) {
      book.borrowers.push(currentUser.id);
    }
  });
  localStorage.setItem("data", JSON.stringify(booksData));
};
const removeIDfrombooksData = () => {
  booksData.forEach((book) => {
    if (book.id == bookId) {
      book.borrowers = book.borrowers.filter(
        (borrower) => borrower !== currentUser.id
      );
    }
  });
  localStorage.setItem("data", JSON.stringify(booksData));
};
