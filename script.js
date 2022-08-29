var dateInputEl = $('#datepicker');
var searchFormEl = document.querySelector('#search-form');

// Datepicker widget
$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });



function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#location-input').value;
  var formatInputVal = document.querySelector('#format-input').value;
  var venueInputVal = document.querySelector('#venue-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './results.html?q=' + searchInputVal + '&format=' + formatInputVal + '&format=' +venueInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);