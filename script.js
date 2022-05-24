const listElm = document.querySelector("#list");

const apiUrl = "https://randomuser.me/api/?";

// Fetch method to call the API
const fetchUsers = (params = "results=20") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      const user = data.results;
      let str = "";

      user.map((usr) => {
        console.log(usr);
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
    });
};
fetchUsers();

const handleOnChange = (e) => {
  const params = "results=20&gender=" + e.value;
  fetchUsers(params);
};
