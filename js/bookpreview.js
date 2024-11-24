const cardImg = document.getElementById("cardImg");
const bookInfo = document.getElementById("bookInfo");
const authorInfo = document.getElementById("authorInfo");
import { defaultData } from "./defaultData.js";
import { getCurrentUser } from "./homeUser.js";
getCurrentUser();

// get book id from url
const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

// get book obj from booksData
const book = defaultData.find((book) => book.id == bookId);

// display book Img
cardImg.innerHTML = `<img src="${book.imgUrl}" alt="Book" />
            <div class="icon-item">
              <i style="cursor: pointer" class="fa-regular fa-heart"></i>
              <span>Favourite</span>
`;
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
          <button class="borrow-btn">Borrow</button>
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
