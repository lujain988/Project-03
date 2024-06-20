const url = "assets/data/employees_data.json";

async function getData(selectElement) {
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee["Full Name"];
    option.textContent = employee["Full Name"];
    selectElement.appendChild(option);
  });
}

function addMemberDropdown(selectElement) {
  console.log(selectElement);
  const membersContainer = document.getElementById("membersContainer");
  const newSelect = selectElement.cloneNode(true);
  newSelect.value = "+ Add person"; // Reset the new dropdown
  newSelect.onchange = function () {
    addMemberDropdown(newSelect);
  };
  membersContainer.appendChild(newSelect);
  getData(newSelect); // Populate new dropdown
  styleDropdown(selectElement); // Style the changed dropdown
}
function styleDropdown(selectElement) {
  selectElement.style.backgroundColor = "#93c9de";
  selectElement.style.color = "black";
  selectElement.style.border = "none";
  selectElement.style.borderRadius = "20px";
  selectElement.style.margin = "5px";
}

// Initialize the first dropdowns
getData(document.getElementById("AssignMembersSelect"));

function addTaskToLocalStorage() {
  tasks = (localStorage.tasks && JSON.parse(localStorage.tasks)) || [];
  tasks.push()
}
