import { populateData, createHeadings } from "./table_maker.js";
const url = "assets/data/employees_data.json";
const addEmployeeForm = document.getElementById("create-leave-form");
const employeeNameSelect = document.getElementById("employee-name");
const jopTitle = document.getElementById("jop-title");
const department = document.getElementById("department");
const startDate = document.getElementById("startDate");
const modal = document.getElementById("new-leave-form");
startDate.value = new Date().toISOString().split("T")[0];
let filter="";
const leaves = (localStorage.leaves && JSON.parse(localStorage.leaves)) || [];

// Get all employee data to put them in the select
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

// This part for the searchable select. Do not touch it unless you really know what you are doing.
document.addEventListener("DOMContentLoaded", async function () {
  await addEmployeeNamesOptions();
  const choices = new Choices(employeeNameSelect, {
    searchEnabled: true,
    placeholderValue: "Select Employee",
    shouldSort: false,
  });
  populateLeavesData()
});

// Auto fill the employee data in the fields
employeeNameSelect.addEventListener("change", () => {
  const employee = employeeData.find(
    (employee) => employee["Employee ID"] === employeeNameSelect.value
  );
  department.value = employee["Department"];
  jopTitle.value = employee["Job Title"];
});

// Add the form data into the local storage
function crateNewLeave(leave) {
  console.log(leaves);
  leaves.push(leave);
  localStorage.leaves = JSON.stringify(leaves);
  populateLeavesData()
}

addEmployeeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get the data from the form
  const formData = {
    employeeId: document.getElementById("employee-name").value,
    leaveType: document.getElementById("leaveType").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    reason: document.getElementById("reason").value,
  };
  crateNewLeave(formData);
  // Reset form after submit
  addEmployeeForm.reset();
  startDate.value = new Date().toISOString().split("T")[0];

  // Close the modal
  bootstrap.Modal.getInstance(modal).hide();
});

function populateLeavesData() {
  
  // For getting the data in the table.
  const table_body = document.querySelector("table tbody");
  const table_head = document.querySelector("table thead");
  let leavesWithEmployeesData = [];
  for (const leave of leaves) {
    const employee = employeeData.find(
      (employee) => employee["Employee ID"] === leave["employeeId"]
    );
    // Merge the employee data with the leave application
    leavesWithEmployeesData.push({
      ...leave,
      ...employee,
    });
  }

  // Change the this array to change the table columns
  console.log(leavesWithEmployeesData);
  const tableHeadings = [
    ["Employee", "Full Name"],
    ["Leave Type", "leaveType"],
    ["Reason", "reason"],
    ["Start Date", "startDate"],
    ["End Date", "endDate"],
  ];
  createHeadings(table_head, tableHeadings);
  populateData(table_body, leavesWithEmployeesData, filter, tableHeadings);
}
