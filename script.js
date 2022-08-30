var dateInputEl = $('#datepicker');
var citySearchEl = document.querySelector('#input-text');
var searchBtn = document.querySelector('#searchBtn')

// Datepicker widget
$( function() {
  $( "#datepicker" ).datepicker();
  $( "#anim" ).on( "change", function() {
    $( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
  });
} );

// fake

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#location-input').value;
  // var formatInputVal = document.querySelector('#format-input').value;
  // var venueInputVal = document.querySelector('#venue-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './results.html?q=' + searchInputVal + '&date=' + dateInputEl

  location.assign(queryString);
}

searchBtn.addEventListener('submit', handleSearchFormSubmit);