const url = "assets/data/employees_data.json";
const addEmployeeForm = document.getElementById("create-leave-form")
const employeeNameSelect = document.getElementById("employee-name");
const jopTitle = document.getElementById("jop-title");
const department = document.getElementById("department");
const startDate = document.getElementById("startDate");
startDate.value = new Date().toISOString().split("T")[0];

let employeeData;
async function addEmployeeNamesOptions() {
  if (!employeeData) {
    const response = await fetch(url);
    employeeData = await response.json();
  }
  employeeData.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee["Employee ID"];
    option.textContent = employee["Full Name"];
    employeeNameSelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  await addEmployeeNamesOptions();
  const choices = new Choices(employeeNameSelect, {
    searchEnabled: true,
    placeholderValue: "Select Employee",
    shouldSort: false,
  });
});

employeeNameSelect.addEventListener("change", () => {
  const employee = employeeData.find(
    (employee) => employee["Employee ID"] === employeeNameSelect.value
  );
  department.value = employee["Department"];
  jopTitle.value = employee["Job Title"];
});

addEmployeeForm.addEventListener("submit", event => {
  event.preventDefault()
  const formData = new FormData(addEmployeeForm)
  formData.forEach((key, val)=> console.log(val, key))
  console.log();
})
