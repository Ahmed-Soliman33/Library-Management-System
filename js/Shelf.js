import { getCurrentUser } from "./homeUser.js";
const shelfItems = document.getElementById("shelf-items");
const userData = JSON.parse(localStorage.getItem("currentAccount")).data;

getCurrentUser();

document.addEventListener("DOMContentLoaded", () => {
  shelfItems.innerHTML = `
        ${
          userData.length === 0
            ? `<h1 class="not-found">No books In your shelf</h1>`
            : userData.map((book) => {
                return `
                <div class="shelf-i">
              <div class="shelf-i-left">
                <div class="image_1">
                  <img width="120" src="${book.imgUrl}" alt="not found" />
                </div>

                <h2>${book.title}</h2>
                <h3>${book.author_date}</h3>
                <p>${book.rate}/5</p>
              </div>

              <div class="shelf-i-right">
                <div class="shelf-i-right-info">
                  <h3>Borrowed on</h3>
                  <p>11 Mar 2023 09:00 AM</p>
                  <h3>Submission Due</h3>
                  <p>14 Mar 2023</p>
                </div>

                <div class="shelf-i-right-btn">
                  <button disabled>Borrowed</button>
                  <a href="BookPreview.html?id=${book.id}"><button>Return</button></a>
                </div>
              </div>
            </div>
            <!-- shelf-i -->
            `;
              })
        }
    `;
});
