// Fill the table with the employees data.
function populateData(
  table_body,
  data,
  filter,
  table_heading,
  sortOption
) {
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
      populateEmployeeData(table_body, data, table_heading, sortOption);
    });
  return th;
}
function createHeadings(table_head, table_heading) {
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

export { populateData, createTd, createTh, createHeadings };
