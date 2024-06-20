const loginForm = document.querySelector("#login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const rememberMeCheckbox = document.querySelector(".remember-forgot input");

// Check if user credentials are stored in localStorage
window.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("rememberMe") === "true") {
    emailInput.value = localStorage.getItem("userEmail") || "";
    passwordInput.value = localStorage.getItem("userPassword") || "";
    rememberMeCheckbox.checked = true;
  }
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // عشان ما يعيد تحميل الصفحه

  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  const users = JSON.parse(localStorage.getItem("usersData"));

  if (users) {
    // Check if users is not null
    const isValidUser = users.filter((user) => user.email == userEmail);

    if (isValidUser.length) {
      if (atob(isValidUser[0].password) == userPassword) {
        let loggedInUser = isValidUser[0];

        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("userEmail", userEmail);
          localStorage.setItem("userPassword", userPassword);
          localStorage.message = "";
          let user = JSON.parse(localStorage.usersData).find(
            (user) => user.email === localStorage.userEmail
          );
          localStorage.message = `Welcome ${user.userName}`;
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userPassword");
        }

        // Proceed with successful login actions here
        delete loggedInUser.password;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        window.location.href = "index.html";
      } else {
        document.querySelector(".login-error").innerText =
          " Please check your email, password or both";
      }
    } else {
      document.querySelector(".login-error").innerText =
        "User not found, please check your email or register to continue";
    }
  } else {
    console.log("No users data in localStorage");
  }
}); // Closing parenthesis added here
