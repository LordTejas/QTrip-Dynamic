import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  let cities = null;

  try {

    cities = await fetch(`${config.backendEndpoint}/cities`);
    cities = await cities.json();
    // console.log(cities);
    return cities;

  } catch (err) {
    console.log(err);
  }

  return cities;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const cityDiv = document.getElementById('data');

  let cityTile = document.createElement('div');
  cityTile.id = id;
  cityTile.className = 'col-12 col-sm-6 col-lg-3 mb-4'

  cityTile.innerHTML = `
        <a href="pages/adventures/">
          <div class="tile">
            <img src="${image}" />
            <div class="tile-text text-center">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
          </div>
        </a>
  `

  cityDiv.append(cityTile);

}

export { init, fetchCities, addCityToDOM };
