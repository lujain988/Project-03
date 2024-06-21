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
function createHeadings() {
  let tr = document.createElement("tr");
  table_head.innerHTML = "";
  tr.appendChild(createTh("#"));
  table_heading
    .map((heading) => createTh(heading, true))
    .forEach((th) => {
      tr.appendChild(th);
    });
  table_head.appendChild(tr);
}
createHeadings();

// Get the data from the json file.
async function getData() {
  if (!data) {
    let response = await fetch("assets/data/employees_data.json");
    data = await response.json();
  }
}

await getData();

// Fill the table with the employees data.
function populateEmployeeData(data) {
  let i = 1;
  let table_data = data;

  // Filter the data filter word has been provided
  if (filter)
    table_data = data.filter((employee) =>
      table_heading
        .map((heading) => employee[heading[1]])
        .some((value) => String(value).toLocaleLowerCase().includes(filter))
    );

  // Sort the rows in the table if a search option has been selected
  if (sortOption)
    table_data.sort((a, b) => {
      if (sortOption === "Hire Date")
        return new Date(b["Hire Date"]) - new Date(a["Hire Date"]);
      if (a[sortOption] < b[sortOption]) return -1;
      if (a[sortOption] > b[sortOption]) return 1;
    });
  //  clean the table body before inserting the data
  table_body.innerHTML = "";
  table_data.forEach((element) => {
    let tr = document.createElement("tr");
    let row = [
      createTd(i),
      ...table_heading.map((heading) => createTd(element[heading[1]])),
    ];
    row.forEach((element) => tr.appendChild(element));
    table_body.appendChild(tr);
    i++;
  });
}

// Create table data cell
function createTd(value) {
  let td = document.createElement("td");
  td.innerText = value;
  return td;
}

// create table heading element
function createTh(value, sortable) {
  let th = document.createElement("th");
  th.innerText = value[0];
  th.id = value[0];
  th.value = 0;
  if (sortable)
    th.addEventListener("click", (event) => {
      sortOption = value[1];
      populateEmployeeData(data);
    });
  return th;
}

// Add event to each created head if it is sortable to sort table rows
let filterInput = document.getElementById("filter");
try {
  filterInput.addEventListener("input", (e) => {
    console.log(e);
    filter = filterInput.value.toLowerCase();
    populateEmployeeData(data);
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
      createHeadings();
      populateEmployeeData(data);
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
    "You should add the heading option component in order to add or remove table columns"
  );
}
// Add data to the table in the start of the code
populateEmployeeData(data);
