const listElm = document.querySelector("#list");

let userArgs = [];

const apiUrl = "https://randomuser.me/api/?";

// Fetch method to call the API
const fetchUsers = (params = "results=20") => {
  fetch(apiUrl + params)
    .then((response) => {
      return response.json().then((data) => {
        userArgs = data.results;
        displayUsers(userArgs);
      });
    })
    .catch((error) => console.log(error));
};

fetchUsers();

const displayUsers = (user) => {
  let str = "";

  user.map((usr) => {
    // console.log(usr);
    str += `
        <div class="col-md-6 col-lg-3 py-3">
            <!-- Card from bootstrap -->
            <div class="card">
              <img src="${usr.picture.large}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-center">
                ${usr.name.title}
                ${usr.name.first}
                ${usr.name.last}
                </h5>
                <p class="card-text">
                <ul class="list-unstyled">  
                    <li> <i class="fa-solid fa-mobile-button text-center pt-2"></i> ${usr.phone}</li>
                    <li> <i class="fa-solid fa-envelope text-center pt-2"></i> ${usr.email}</li>
                    <li> <i class="fa-solid fa-calendar text-center pt-2"></i> ${usr.dob.date}</li>
                    <li> <i class="fa-solid fa-map text-center pt-2"></i> ${usr.location.city}</li>
                </ul>
                </p>
              </div>
            </div>
          </div>
        `;
  });

  listElm.innerHTML = str;

  document.getElementById("user-count").innerHTML = user.length;
};

const handleOnChange = (e) => {
  const params = "results=20&gender=" + e.value;
  fetchUsers(params);
};

// Filter users on live search

const handleOnSearch = (e) => {
  const str = e.value.toLowerCase();

  console.log(str);

  const filteredArgs = userArgs.filter((item) => {
    const userFullName = (item.name.first + " " + item.name.last).toLowerCase();

    if (userFullName.includes(str)) {
      return item;
    }
  });

  displayUsers(filteredArgs);
};
