const loginBtn = document.querySelector(".login-btn");
import { defaultData } from "./defaultData.js";

const data = JSON.parse(localStorage.getItem("data"));

if (!data) {
  localStorage.setItem("data", JSON.stringify(defaultData));
  console.log("Default Data is loaded");
}

loginBtn.addEventListener("click", login);
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value;

  console.log({ role });
  if (!email || !password || !role) {
    alert("Please fill all fields and select a role.");
    return;
  }
  const storedData = JSON.parse(localStorage.getItem(role)) || [];

  const registeredUser = storedData.find(
    (user) => user.email === email && user.password === password
  );

  if (registeredUser) {
    const userWithRole = { ...registeredUser };
    alert(
      `Welcome, ${userWithRole.name}! You are logged in as ${userWithRole.role}.`
    );

    console.log(userWithRole);

    if (userWithRole.role === "Admin") {
      window.location.assign(`./Pages/Admin/HomeAdmin.html`);
      localStorage.setItem("currentAccount", JSON.stringify(registeredUser));
    } else if (userWithRole.role === "User") {
      window.location.assign(`./Pages/HomeUser.html`);
      localStorage.setItem("currentAccount", JSON.stringify(registeredUser));
    }
  } else {
    alert("Invalid email or password. Please try again.");
  }
}
