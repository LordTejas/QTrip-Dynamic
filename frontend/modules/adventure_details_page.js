import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  // console.log(params);
  // Place holder for functionality to work in the Stubs
  return params.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const adventureUrl = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
    let adventure = await fetch(adventureUrl);
    adventure = await adventure.json();
    return adventure;

  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);

  try {
    
    // Set Adventure Title and Subtitle
    document.getElementById('adventure-name').innerHTML = adventure.name;
    document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  
    // Set Adventure Content (Description) 
    document.getElementById('adventure-content').innerHTML = adventure.content;
  
    const photoGallery = document.getElementById('photo-gallery');
    
    let adventureImage;
    adventure.images.forEach(image => {
      adventureImage = document.createElement('div');
      adventureImage.innerHTML = `<img src=${image} class="activity-card-image" />`
      // console.log(adventureImage);
  
      photoGallery.append(adventureImage);
    })
  
    // console.log(photoGallery);

  } catch (err) {
    console.log(err);
  }
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById('photo-gallery');
  photoGallery.className = 'carousel slide';
  photoGallery.setAttribute('data-bs-ride', 'true')
  photoGallery.innerHTML = `
  <div class="carousel-indicators" id='carousel-indicators'></div>

  <div class="carousel-inner" id="carousel-inner"></div>

  <button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `;

  const carouselIndicators = document.getElementById('carousel-indicators');
  const carouselInner = document.getElementById('carousel-inner');

  images.forEach((image, index) => {
    
    // Create Carousel Button
    const carouselButton = document.createElement('button');
    carouselButton.setAttribute('type', 'button');
    carouselButton.setAttribute('data-bs-target', '#photo-gallery');
    carouselButton.setAttribute('data-bs-slide-to', index);
    carouselButton.setAttribute('aria-label', `Slide ${index+1}`);

    if (index === 0) {
      carouselButton.classList.add('active')
      carouselButton.setAttribute('aria-current', 'current');
    };

    // Create Image Button
    const carouselImage = document.createElement('div');
    index === 0 ? carouselImage.classList.add('carousel-item', 'active') : carouselImage.classList.add('carousel-item');
    carouselImage.innerHTML = `<img src=${image} class="d-block activity-card-image" />`;

    // Add Elements to DOM
    carouselInner.appendChild(carouselImage);
    carouselIndicators.appendChild(carouselButton);

    // console.log(carouselButton);
    // console.log(carouselImage);
    
  });

  // console.log(photoGallery);
  // return true;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
