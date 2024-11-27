import { getCurrentUser } from "./homeUser.js";

getCurrentUser();

document.addEventListener("DOMContentLoaded", () => {
  const favBooks = JSON.parse(
    localStorage.getItem("currentAccount")
  ).favouriteBooks;

  const favSecItems = document.getElementById("fav-sec-items");

  console.log({ favBooks });
  // check if user has favourite books
  if (favBooks.length === 0) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("fav-item");
    bookDiv.innerHTML = `<h1 class="not-found">No favourite books</h1>`;
    favSecItems.appendChild(bookDiv);
  } else {
    favBooks.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("fav-item");
      bookDiv.innerHTML = `
      <div class="fav-i-book">
                <img width="80" src="${book.imgUrl}" alt="" />
                <div class="fav-i-book-info">
                  <h3>${book.title}</h3>
                  <h4>${book.author_date}</h4>
                </div>
                <!-- fav-i-book-info -->
              </div>
              <!-- fav-i-book -->

              <div class="item-rate">${book.rate}<span>/5</span></div>
              <div class="item-category">${book.category}</div>
              <div class="item-available">
                <p>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0C3.35697 0 0 3.35697 0 7.5C0 11.643 3.35697 15 7.5 15C11.643 15 15 11.643 15 7.5C15 3.35697 11.643 0 7.5 0ZM6.34255 10.1575C6.25601 10.244 6.13341 10.3161 6.02524 10.3161C5.91707 10.3161 5.79447 10.2404 5.70433 10.1538L3.6851 8.13462L4.32692 7.49279L6.02885 9.19471L10.5288 4.66226L11.1599 5.3149L6.34255 10.1575Z"
                      fill="#42BB4E"
                    />
                  </svg>
                  Hard Copy
                </p>
                <p>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0C3.35697 0 0 3.35697 0 7.5C0 11.643 3.35697 15 7.5 15C11.643 15 15 11.643 15 7.5C15 3.35697 11.643 0 7.5 0ZM6.34255 10.1575C6.25601 10.244 6.13341 10.3161 6.02524 10.3161C5.91707 10.3161 5.79447 10.2404 5.70433 10.1538L3.6851 8.13462L4.32692 7.49279L6.02885 9.19471L10.5288 4.66226L11.1599 5.3149L6.34255 10.1575Z"
                      fill="#42BB4E"
                    />
                  </svg>
                  E - Book
                </p>
                <p>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0C3.35697 0 0 3.35697 0 7.5C0 11.643 3.35697 15 7.5 15C11.643 15 15 11.643 15 7.5C15 3.35697 11.643 0 7.5 0ZM6.34255 10.1575C6.25601 10.244 6.13341 10.3161 6.02524 10.3161C5.91707 10.3161 5.79447 10.2404 5.70433 10.1538L3.6851 8.13462L4.32692 7.49279L6.02885 9.19471L10.5288 4.66226L11.1599 5.3149L6.34255 10.1575Z"
                      fill="#42BB4E"
                    />
                  </svg>
                  Audio book
                </p>
              </div>
              <div class="item-status">
                <a href="BookPreview.html?id=${book.id}" class="item-status-icon">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.645 21.4107L11.6384 21.4072L11.6158 21.3949C11.5965 21.3844 11.5689 21.3693 11.5336 21.3496C11.4629 21.3101 11.3612 21.2524 11.233 21.1769C10.9765 21.0261 10.6132 20.8039 10.1785 20.515C9.31074 19.9381 8.15122 19.0901 6.9886 18.0063C4.68781 15.8615 2.25 12.6751 2.25 8.75C2.25 5.82194 4.7136 3.5 7.6875 3.5C9.43638 3.5 11.0023 4.29909 12 5.5516C12.9977 4.29909 14.5636 3.5 16.3125 3.5C19.2864 3.5 21.75 5.82194 21.75 8.75C21.75 12.6751 19.3122 15.8615 17.0114 18.0063C15.8488 19.0901 14.6893 19.9381 13.8215 20.515C13.3868 20.8039 13.0235 21.0261 12.767 21.1769C12.6388 21.2524 12.5371 21.3101 12.4664 21.3496C12.4311 21.3693 12.4035 21.3844 12.3842 21.3949L12.3616 21.4072L12.355 21.4107L12.3523 21.4121C12.1323 21.5289 11.8677 21.5289 11.6477 21.4121L11.645 21.4107Z"
                      fill="#F34040"
                    />
                  </svg>
                </a>
                <a href="BookPreview.html?id=${book.id}"><button >Preview</button> </a>
            </div>
        </div>
    `;

      favSecItems.appendChild(bookDiv);
    });
  }
});
