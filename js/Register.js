const cardButton = document.querySelector(".card-button");

cardButton.addEventListener("click", register);

function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.querySelector('input[name="role"]:checked')?.value;
  if (!name || !email || !password || !confirmPassword || !role) {
    alert("Please fill all fields and select a role.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: password,
    role: role,
    data: [],
    favouriteBooks: [],
  };

  let storedData = JSON.parse(localStorage.getItem(role)) || [];

  const existingUserIndex = storedData.findIndex(
    (user) => user.email === email
  );
  if (existingUserIndex !== -1) {
    storedData[existingUserIndex] = user;
  } else {
    storedData.push(user);
  }

  localStorage.setItem(role, JSON.stringify(storedData));

  window.location.href = "./AccountDone.html";
}
