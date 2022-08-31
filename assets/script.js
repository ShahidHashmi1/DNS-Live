var dateInputEl = $('#datepicker');
var citySearchEl = document.querySelector('#input-text');
var searchBtn = document.querySelector('#searchBtn')

// Datepicker widget
// $( function() {
//   $( "#datepicker" ).datepicker();
//   $( "#anim" ).on( "change", function() {
//     $( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
//   });
// } );

var handleSearchFormSubmit = function (event) {
  event.preventDefault();
  // console.log(document.getElementById("input-text").value)

  var searchInputVal = document.getElementById('input-text').value
  
  // var dateInputVal = document.getElementById('datepicker').value
  

  console.log(searchInputVal)
  // var formatInputVal = document.querySelector('#format-input').value;
  // var venueInputVal = document.querySelector('#venue-input').value;

  if (!searchInputVal) {
    console.log('You need a search input value!');
    return;
  }
  localStorage.setItem('input', JSON.stringify(searchInputVal));
  var queryString = './results.html?q=' + searchInputVal

  location.assign(queryString);

}

searchBtn.addEventListener('click', handleSearchFormSubmit);