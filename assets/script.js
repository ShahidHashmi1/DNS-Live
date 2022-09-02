var dateInputEl = $('#datepicker');
var citySearchEl = document.querySelector('#input-text');
var searchBtn = document.querySelector('#searchBtn')
var displayDialog = document.querySelector('.displayDialog')

// accordian
$( function() {
  $( "#accordion" ).accordion();
} );

  $( function showDialog() {
    $( "#dialog" ).dialog({
      autoOpen: false,
    });
  })

  function openDialog(dFunc) {
    console.log(dFunc);
    $("#dialog").dialog('open');
  }



var handleSearchFormSubmit = function (event, dFunc) {
  event.preventDefault();
  var searchInputVal = document.getElementById('input-text').value

  if (!searchInputVal || searchInputVal === !null) {
    openDialog(dFunc)
    return;
  }

  localStorage.setItem('input', JSON.stringify(searchInputVal));
  var queryString = './results.html?q=' + searchInputVal

  location.assign(queryString);

}

searchBtn.addEventListener('click', handleSearchFormSubmit);