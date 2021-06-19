//containers
const formContainer = document.querySelector(".form-container");
const employeeListContainer = document.querySelector(
  ".employees-list-container"
);

//btns
const showListBtn = document.querySelector(".show-list-btn");
const showFormBtn = document.querySelector(".show-form-btn");
const btn = document.querySelector(".form-btn");
const removeEmployeeBtn = document.querySelector(".removeEmployee");

//inputs
const nameInput = document.querySelector("[data-input='name']");
const lastNameInput = document.querySelector("[data-input='lastname']");
const dateInput = document.querySelector("[data-input='date']");
const genderInput = document.querySelector("[data-input='gender']");

//elements
const form = document.querySelector("form");
const employeeList = document.querySelector(".employees-list").children[0];

//tablica, która przyjmuje wartość z localstorage, jeśli jest równa null to wtedy []
const employees = JSON.parse(window.localStorage.getItem("employees")) || [];

//uniemożliwenie przeładowania strony po kliknieciu przycisku submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

//klasa pracownika
class Employee {
  constructor(name, lastname, birthDate, gender) {
    this.name = name;
    this.lastname = lastname;
    this.birthDate = birthDate;
    this.gender = gender;
  }
}

//funkcja tworząca element listy i wsadzająca ją do ul
const showEmployees = () => {
  employeeList.innerHTML = "";
  employees.map((employee) => {
    listEl = document.createElement("li");
    listEl.classList.add("employee");
    listEl.innerHTML = `
    <div>
    <span>${employee.name}</span>
    <span>${employee.lastname}</span>
    <span>${employee.birthDate}</span>
    <span>${employee.gender}</span>
    </div>
    <button class="removeEmployee"><span></span></button>
    `;

    employeeList.appendChild(listEl);
  });

  // pętla, która usuwa element z localstorage oraz element li z html
  // petla ta znajduje numer indeksu danego elementu

  for (let i = 0, len = employeeList.children.length; i < len; i++) {
    (function (index) {
      employeeList.children[i].children[1].onclick = function () {
        employees.splice(index, 1);
        window.localStorage.setItem("employees", JSON.stringify(employees));
        this.parentNode.remove();
      };
    })(i);
  }
};

//czyszczenie imputow po submicie
const clearInputs = () => {
  nameInput.value = "";
  lastNameInput.value = "";
  dateInput.value = "2021-06-26";
  genderInput.value = "";
};

//przejscie na drugi container
showListBtn.addEventListener("click", () => {
  formContainer.classList.toggle("off");
  employeeListContainer.classList.remove("off");
});

//przejscie na drugi container
showFormBtn.addEventListener("click", () => {
  formContainer.classList.toggle("off");
  employeeListContainer.classList.add("off");
});

//tworzenie nowego pracownika
const addNewEmployee = () => {
  if (nameInput.value && lastNameInput.value && genderInput.value) {
    employees.push(
      new Employee(
        nameInput.value,
        lastNameInput.value,
        dateInput.value,
        genderInput.value
      )
    );
    window.localStorage.setItem("employees", JSON.stringify(employees));
    showEmployees();
    clearInputs();
  }
};

showEmployees();

btn.addEventListener("click", addNewEmployee);
