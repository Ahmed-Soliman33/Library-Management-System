import { getCurrentUser } from "./homeUser.js";
const registerForm = document.getElementById("registerForm");
var currentUser = JSON.parse(localStorage.getItem("currentAccount"));
const users = JSON.parse(localStorage.getItem("User"));

getCurrentUser();
console.log(currentUser);
document.addEventListener("DOMContentLoaded", () => {
  registerForm.innerHTML = `
        <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  class="form-input"
                  value="${currentUser.name}"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">ID</label>
                <input
                  type="number"
                  id="registerID"
                  class="form-input"
                  value="${currentUser.id}"
                  disabled
                  style="color: #8A8A8A"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Your Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-input"
                  value="${currentUser.email}"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Your Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-input"
                  value="${currentUser.password}"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Bio</label>
              <textarea
                id="bio"
                class="form-textarea"
                placeholder="Tell us about yourself"
                rows="4"
                style="resize: none"
              ></textarea>
            </div>
            <button type="submit">Update profile</button>
    `;
});

registerForm.addEventListener("submit", (e) => {
  console.log(e.target.elements.email.value);
  currentUser = {
    ...currentUser,
    name: e.target.elements.name.value,
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
  };
  localStorage.setItem("currentAccount", JSON.stringify(currentUser));
  const updatedUsers = users.filter((user) => user.id !== currentUser.id);
  updatedUsers.push(currentUser);
  localStorage.setItem("User", JSON.stringify(updatedUsers));
  getCurrentUser();
});
