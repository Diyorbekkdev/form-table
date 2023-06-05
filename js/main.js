const City = [
    "Andijan",
    "Bukhara",
    "Fergana",
    "Jizzakh",
    "Karakalpakstan",
    "Kashkadarya",
    "Khorezm",
    "Namangan",
    "Navoiy",
    "Samarkand",
    "Sirdaryo",
    "Surkhandarya",
  ];
  const Position = ["React", "Nodejs", "Go", "Python"];
  const TypePosition = ["Junior", "Middle", "Senior"];
  
  let pupilsJson = localStorage.getItem("pupils");
  let pupils = JSON.parse(pupilsJson) ?? [];
  
  const pupilTable = document.getElementById("pupilTable");
  const pupilForm = document.getElementById("pupilForm");
  const sendBtn = document.getElementById("sendBtn");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const pupilCity = document.getElementById("pupilCity");
  const datePupil = document.getElementById("datePupil");
  const isMarried = document.getElementById("isMarried");
  const positionPupil = document.getElementById("positionPupil");
  const typePosition = document.getElementById("typePosition");
  const salaryPupil = document.getElementById("salaryPupil");
  const formModal = document.querySelector(".modal");
  const searchInput = document.getElementById("search");
  const filterPosition = document.getElementById("filterPosition");
  const filterCity = document.getElementById("filterCity");
  let modalTitle = document.querySelector('.modal-title');
  const openModalBtn = document.querySelector(".btn-success");
  
  let selected = null;
  
  const getRow = ({
    id,
    firstName,
    lastName,
    city,
    date,
    position,
    typeposition,
    salary,
    isMarried,
  }) => {
    return `
      <tr>
        <th scope="row">${id}</th>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${city}</td>  
        <td>${date}</td>
        <td>${position}</td>
        <td>${typeposition}</td>
        <td>${salary}</td>
        <td>${isMarried ? "Yes" : "No"}</td>
        <td class = "text-end">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pupilModal" onclick="editPupil(${id})"><i class="bi bi-pencil-square"></i> Edit</button>
          <button class="btn btn-danger" onclick="deletePupil(${id})"><i class="bi bi-trash-fill"></i> Delete</button>
        </td>
        </tr>
        `;
  };




  
  City.forEach((city) => {
    pupilCity.innerHTML += `<option value="${city}">${city}</option>`;
  });
  
  Position.forEach((position) => {
    positionPupil.innerHTML += `<option value="${position}">${position}</option>`;
  });
  
  TypePosition.forEach((typeposition) => {
    typePosition.innerHTML += `<option value="${typeposition}">${typeposition}</option>`;
  });
  
  ["Position level", ...TypePosition].forEach((typeposition) => {
    filterPosition.innerHTML += `<option value="${typeposition}">${typeposition}</option>`;
  });
  
  ["Address", ...City].forEach((city) => {
    filterCity.innerHTML += `<option value="${city}">${city}</option>`;
  });
  
  const getPupils = (newPupils) => {
    pupilTable.innerHTML = "";
    let count = 0;
    (newPupils || pupils).forEach((pupil) => {
      count++;
      pupil.id = count;
      pupilTable.innerHTML += getRow(pupil);
    });
  };
  
  getPupils();
  
pupilForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let check = this.checkValidity();
    this.classList.add("was-validated");
    if (check) {
      bootstrap.Modal.getInstance(formModal).hide();
      let newPupil = {
        firstName: firstName.value,
        lastName: lastName.value,
        city: pupilCity.value,
        date: datePupil.value,
        position: positionPupil.value,
        typeposition: typePosition.value,
        salary: salaryPupil.value,
        isMarried: isMarried.checked,
      };
      if (selected) {
        pupils = pupils.map((pupil) => {
          if (pupil.id == selected.id) {
            return {
              id: selected.id,
              ...newPupil,
            };
          } else {
            return pupil;
          }
        });
      } else {
        newPupil.id = pupils.length;
        pupils.push(newPupil);
      }
      localStorage.setItem("pupils", JSON.stringify(pupils));
      window.location.reload(); 
    }
    getPupils();
  });


  openModalBtn.addEventListener("click", function () {
    sendBtn.textContent = "Add Student";
    modalTitle.textContent = "Adding student";
    

  });


  function editPupil(id) {
    let pupil = pupils.find((pupil) => pupil.id == id);
    selected = pupil;
    modalTitle.textContent = 'Student info editing';
    sendBtn.textContent = "Save";
    firstName.value = pupil.firstName;
    lastName.value = pupil.lastName;
    pupilCity.value = pupil.city;
    datePupil.value = pupil.date;
    positionPupil.value = pupil.position;
    typePosition.value = pupil.typeposition;
    salaryPupil.value = pupil.salary;
    isMarried.checked = pupil.isMarried;

  }
  
  function deletePupil(id) {
    let isConfirm = confirm("Do you want to delete ?");
    if (isConfirm) {
      pupils = pupils.filter((pupil) => pupil.id != id);
      localStorage.setItem("pupils", JSON.stringify(pupils));
      getPupils();
    }
  }
  
searchInput.addEventListener("input", function () {
    let search = this.value.toLowerCase();
    searchPupils = pupils.filter(
      (pupil) =>
        pupil.firstName.toLowerCase().includes(search) ||
        pupil.lastName.toLowerCase().includes(search)
    );
    getPupils(searchPupils);
  });
  
  filterPosition.addEventListener("change", function () {
    if (this.value == "Choose position") {
      getPupils();
    } else {
      filterPupils = pupils.filter((pupil) => pupil.typeposition == this.value);
      getPupils(filterPupils);
    }
  });
  
  filterCity.addEventListener("change", function () {
    if (this.value == "Choose location") {
      getPupils();
    } else {
      filterPupils = pupils.filter((pupil) => pupil.city == this.value);
      getPupils(filterPupils);
    }
  });
  