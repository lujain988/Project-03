//nav bar code
document.addEventListener("DOMContentLoaded", () => {
  // Check the login status on page load
  const isLoggedIn = false;
  checkLoginStatus(isLoggedIn);
});

function checkLoginStatus(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById("service").style.display = "block";
    document.getElementById("profile-info").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("logout").style.display = "block";
  } else {
    document.getElementById("service").style.display = "none";
    document.getElementById("profile-info").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "block";
    document.getElementById("logout").style.display = "none";
  }
}

function login() {
  // Simulate a login process
  localStorage.setItem("loggedIn", "true");
  const username = "JohnDoe";
  checkLoginStatus(true);
  showWelcomeMessage(username);
}

function logout() {
  // Simulate a logout process
  localStorage.removeItem("loggedIn");
  checkLoginStatus(false);
}
////// end of code
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("policy.JSON");
  const data = await response.json();
  const accordion = document.getElementById("accordionExample");

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const collapseId = `collapse${item.id}`;
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    accordionItem.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${collapseId}" >
                    ${item.head}
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    ${
                      Array.isArray(item.paragraph)
                        ? item.paragraph.join("<br><br>")
                        : item.paragraph
                    }
                </div>
            </div>
        `;
    accordion.appendChild(accordionItem);
  }
});
