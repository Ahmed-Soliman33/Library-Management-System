import { defaultData } from "./defaultData.js";
const booksContainer = document.getElementById("content-books");
const logOutLink = document.getElementById("log_out_link");
const users = JSON.parse(localStorage.getItem("User"));
const userId = JSON.parse(localStorage.getItem("currentAccount"));
const data = JSON.parse(localStorage.getItem("data"));

getCurrentUser();
// check if user is logged in
if (!userId) {
  window.location.assign("/");
}

// get current user
export function getCurrentUser() {
  const profileName = document.querySelector(".profile span");
  const currentUser = users.find((user) => user.id == userId);
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
} else {
  console.error("booksContainer not found in the DOM!");
}

logOutLink.addEventListener("click", () => {
  localStorage.removeItem("currentAccount");
  setTimeout(() => {
    window.location.assign("/");
  }, 1000);
});
