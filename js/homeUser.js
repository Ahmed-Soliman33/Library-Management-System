import { defaultData } from "./defaultData.js";
const booksContainer = document.getElementById("content-books");
const logOutLink = document.getElementById("log_out_link");
const headerSearch = document.getElementById("header-search");
const currentUser = JSON.parse(localStorage.getItem("currentAccount"));
const data = JSON.parse(localStorage.getItem("data"));

getCurrentUser();
// check if user is logged in

// get current user
export function getCurrentUser() {
  if (!currentUser) {
    window.location.assign("/");
  }
  const profileName = document.querySelector(".profile span");
  profileName.innerHTML = `${currentUser.name}`;
}
// display all books
if (booksContainer) {
  booksContainer.innerHTML = `
    ${(data && data.length > 0 ? data : defaultData)
      .map(
        (book) => `
        <a href="../Pages/BookPreview.html?id=${book.id}" class="book-item">
          <img src="${book.imgUrl}" alt="" />
          <div class="book-info">
            <h3>${book.title}</h3>
            <h4>${book.author_date}</h4>
            <p>${book.rate}<span>/5</span></p>
          </div>
        </a>`
      )
      .join("")}
  `;
}

logOutLink.addEventListener("click", () => {
  localStorage.removeItem("currentAccount");
  setTimeout(() => {
    window.location.assign("/");
  }, 1000);
});

console.log({ data });

headerSearch?.addEventListener("change", (event) => {
  const value = event.target.value;

  const newData = data.filter((book) =>
    book.title.toLowerCase().includes(value.toLowerCase())
  );
  if (booksContainer) {
    booksContainer.innerHTML = `
    ${
      newData && newData.length > 0
        ? newData
            .map(
              (book) => `
        <a href="../Pages/BookPreview.html?id=${book.id}" class="book-item">
          <img src="${book.imgUrl}" alt="" />
          <div class="book-info">
            <h3>${book.title}</h3>
            <h4>${book.author_date}</h4>
            <p>${book.rate}<span>/5</span></p>
          </div>
        </a>`
            )
            .join("")
        : `<h1 class="not-found">No books found</h1>`
    }
  `;
  } else {
    // console.error("booksContainer not found in the DOM!");
  }
});
