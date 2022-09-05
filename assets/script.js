var dateInputEl = $('#datepicker');
var citySearchEl = document.querySelector('#input-text');
var searchBtn = document.querySelector('#searchBtn')
var displayDialog = document.querySelector('.displayDialog')

// accordian
$( function() {
  // The extra space around your "" looks odd, i'd reccomend having no extra spaces
  $( "#accordion" ).accordion();
} );

// This should be shift-tabbed over ( proper spacing makes your code look cleaner! )
  $( function showDialog() {
    $( "#dialog" ).dialog({
      // Non-breaking but we can remove the , at the end of an object
      autoOpen: false,
    });
  })

  
// This should be shift-tabbed over ( proper spacing makes your code look cleaner! )
  function openDialog(dFunc) {
    console.log(dFunc);
    $("#dialog").dialog('open');
  }


// What is a dFunc? maybe name the parameter a little more descriptive
var handleSearchFormSubmit = function (event, dFunc) {
  event.preventDefault();
  var searchInputVal = document.getElementById('input-text').value

  // This is confusing
  if (!searchInputVal || searchInputVal === !null) {
    openDialog(dFunc)
    return;
  }

  localStorage.setItem('input', JSON.stringify(searchInputVal));
  var queryString = './results.html?q=' + searchInputVal

  location.assign(queryString);

}

searchBtn.addEventListener('click', handleSearchFormSubmit);