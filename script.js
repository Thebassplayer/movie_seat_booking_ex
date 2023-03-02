const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// Array of all Seats
console.log(seats);
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and Count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Array of selected Seats
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //  Selected seats Storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const SelectedSeatsCount = selectedSeats.length;
  // Update Seat count on screen
  count.innerText = SelectedSeatsCount;
  // Update Total
  total.innerText = SelectedSeatsCount * ticketPrice;
}

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Get data from localStorage and populate UI

function populateUI() {
  const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const storedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (storedSeats != null && storedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (storedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (storedMovieIndex != null) {
    movieSelect.selectedIndex = storedMovieIndex;
  }
}

// Movie selec event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Inicial count and total set

updateSelectedCount();
