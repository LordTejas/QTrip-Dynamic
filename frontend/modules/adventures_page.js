
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);  // Creates param object
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventureId = city.replace(/\s+/, '-');
    const adventure_url = `${config.backendEndpoint}/adventures?city=${adventureId}`;
    let adventures = await fetch(adventure_url);
    adventures = await adventures.json();
    return adventures;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  try {
    const adventureGrid = document.getElementById('data');

    // console.log(adventures);

    adventures.forEach(adventure => {
      var adventureCard = document.createElement('a');
      adventureCard.id = adventure.id;
      adventureCard.className = 'col-6 col-lg-3 my-2';
      adventureCard.setAttribute('href', `detail/?adventure=${adventure.id}`)

      
      adventureCard.innerHTML = `
      <div>
      <div class="activity-card">
      
        <img src="${adventure.image}" / >
      
        <div class="category-banner">${adventure.category}</div>
              
          <div class="d-flex flex-column align-self-stretch">

            <div class="d-flex justify-content-between flex-wrap px-2 pt-2">
              <h6>${adventure.name}</h6>
              <h6>${adventure.costPerHead} ${adventure.currency}</h6>
            </div>
            
            <div class="d-flex justify-content-between flex-wrap px-2 pb-2">
            <h6>DURATION</h6>
              <h6>${adventure.duration} Hours</h6>
            </div>

          </div>
      
      </div>
      </div>
      `

      // console.log(adventure);
      // console.log(adventureCard);

      adventureGrid.appendChild(adventureCard);      
    })

  } catch (err) {
    console.log(err);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item => low <= item.duration && item.duration <= high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(item => categoryList.includes(item.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters);
  let low = 0;
  let high = Infinity;
  let duration = filters.duration.split('-');
  if (duration.length > 1) {
    low = duration[0];
    high = duration[1];
    console.log(duration);  
  }

  if (duration.length > 1) list = filterByDuration(list, low, high);
  if (filters.category.length) list = filterByCategory(list, filters.category);


  // Filter By Duration


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
    localStorage.setItem('filters', JSON.stringify(filters));
    return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  try {
    return JSON.parse(localStorage.getItem('filters'));
  } catch (err) {
    return null;
  }

  // // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const category = filters["category"];
  // console.log(category)
  const parentElement = document.getElementById("category-list");
  category.forEach((cat) => {
    let pill = document.createElement("span");
    pill.textContent = cat;
    pill.setAttribute("class", "category-filter");
    parentElement.appendChild(pill);
    // console.log(pill)
  });
  // console.log(parentElement)

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
