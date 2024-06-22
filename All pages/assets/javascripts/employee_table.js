import {
  populateData as populateEmployeeData,
  createHeadings,
} from "./table_maker.js";

let table_body = document.querySelector("#employee-table tbody");
let table_head = document.querySelector("#employee-table thead");
let filter;
let sortOption;
let data;

// Default table heading
let table_heading = [
  ["ID", "Employee ID"],
  ["Name", "Full Name"],
  ["Department", "Department"],
  ["Job Title", "Job Title"],
  ["Hire Date", "Hire Date"],
];

// Make the heading for the table

createHeadings(table_head, table_heading);

// Get the data from the json file.
async function getData() {
  if (!data) {
    let response = await fetch("assets/data/employees_data.json");
    data = await response.json();
  }
}

await getData();

// Add event to each created head if it is sortable to sort table rows
let filterInput = document.getElementById("filter");

try {
  filterInput.addEventListener("input", (e) => {
    console.log(e);
    filter = filterInput.value.toLowerCase();
    populateEmployeeData(table_body, data, filter, table_heading, sortOption);
  });
} catch (error) {
  console.warn("Couldn't find the filter for the table.");
}

try {
  let tableColumnsSelector = document.getElementById("employee-table-columns");
  for (const key in data[0]) {
    const li = document.createElement("li");
    li.className = "dropdown-item";

    const input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.value = key;
    input.id = key.replace(" ", "_");

    const label = document.createElement("label");
    label.className = "form-check-label ms-1";
    label.htmlFor = key.replace(" ", "_");

    input.addEventListener("change", (event) => {
      if (input.checked) {
        table_heading.push([label.innerText, input.value]);
      } else {
        table_heading = table_heading.filter((val) => val[1] !== input.value);
      }
      createHeadings(table_head, table_heading);
      populateEmployeeData(table_body, data, filter, table_heading, sortOption);
    });

    li.appendChild(input);
    li.appendChild(label);
    const colName = table_heading.find((val) => val[1] === key);
    if (colName) {
      input.checked = true;
      label.innerText = colName[0];
    } else {
      label.innerText = key;
    }
    tableColumnsSelector.appendChild(li);
  }
} catch (error) {
  console.warn(
    "You should add the 'heading option' component in order to add or remove table columns"
  );
}

// Add data to the table in the start of the code
populateEmployeeData(table_body, data, filter, table_heading, sortOption);
