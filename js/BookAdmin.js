const cardImg = document.getElementById("cardImg");
const bookInfo = document.getElementById("bookInfo");
const authorInfo = document.getElementById("authorInfo");
const log_out_link = document.getElementById("log_out_link");
const booksData = JSON.parse(localStorage.getItem("data"));
import { getCurrentUser } from "./homeUser.js";

// get book id from url
const params = new URLSearchParams(window.location.search);
const bookId = Number(params.get("id"));

const book = booksData.find((book) => book.id == bookId);

getCurrentUser();

// check if book is favourite and display favourite icon
document.addEventListener("DOMContentLoaded", () => {
  // display book Img
  cardImg.innerHTML = `<img src="../${book.imgUrl}" alt="Book" />`;
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
          <button id="delete-btn" class="delete-btn">Delete</button>
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
              src="../../images/author.jpeg"
              alt="Author Photo"
            />
          </div>
          <p>
           ${book.about_author}
          </p>
`;
  // add event listener to borrow button
  const deleteBtn = document.getElementById("delete-btn");

  // add event listener to delete button
  deleteBtn.addEventListener("click", () => {
    const isConfirmed = confirm("Are You sure you want to delete this book?");

    if (isConfirmed) {
      const filteredData = booksData.filter((book) => book.id !== bookId);
      localStorage.setItem("data", JSON.stringify(filteredData));
      window.location.assign("../Admin/HomeAdmin.html");
    }
  });

  log_out_link.addEventListener("click", () => {
    localStorage.removeItem("currentAccount");
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  });
});
