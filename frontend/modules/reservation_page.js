import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservations = await fetch(`${config.backendEndpoint}/reservations`);
    reservations = await reservations.json();
    return reservations;

  } catch (err) {
    console.log(err);
    return null;
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  const noReservationBanner = document.getElementById('no-reservation-banner');
  const reservationTable = document.getElementById('reservation-table-parent');

  noReservationBanner.style.display = 'none';
  reservationTable.style.display = 'none';

  if (reservations.length === 0) {
    
    // If there are no reservations
    noReservationBanner.style.display = 'block';

  } else {

    // If reservations are found
    reservationTable.style.display = 'block';

    const reservationList = document.getElementById('reservation-table');
    // console.log(reservationList);
  
    reservations.forEach((reservation, index) => {
      const reservationRow = document.createElement('tr');
      // reservationRow.id = reservation.id;
  
      // console.log(reservationRow);
  
      const date = new Date(reservation.date);
      const time = new Date(reservation.time);
      const options = { dateStyle: 'long', timeStyle: 'medium'};

      reservationRow.innerHTML = `
      <td><b>${reservation.id}</b></td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${date.toLocaleDateString("en-IN")}</td>
      <td>${reservation.price}</td>
      <td>${time.toLocaleString("en-IN", options).replace(/ at/, ',')}</td>
      <td id=${reservation.id}>
        <a href="../detail/?adventure=${reservation.adventure}" class="reservation-visit-button">View Adventure</a>
      </td>
      `;
  
      // console.log(reservationRow);
      reservationList.append(reservationRow);
  
    });

  }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
