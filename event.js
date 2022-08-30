var resultsContainer = document.getElementById("results");
var searchBtn = document.getElementById("searchBtn");
var APIkey = `SjdErjacka4IpkCfwvFaKPS8ysvInbVL`
// cityName = document.getElementById("input-text").value;

function getAPI() {
    var cityName = document.querySelector("#input-text").value
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${cityName}&apikey=${APIkey}`)

        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            // nest second API call here since their order is sequential
            for(var i = 0; i < data._embedded.events.length; i++) {
                setEvent(data, i)
                
            }
        }) 
}
// fake
function setEvent(data, i) {
    // title
    var eventCard = document.createElement("div")
    eventCard.setAttribute('class', 'text-center')
    eventCard.setAttribute('class', 'container')
    eventCard.setAttribute('id', i)
    resultsContainer.append(eventCard)
    var eventTitle = document.createElement("h2") 
    eventTitle.textContent = [data._embedded.events[i].name]
    eventCard.append(eventTitle);
    // card image
    var cardImage = document.createElement("img")
    var cardImageUrl = data._embedded.events[i].images[0].url
    cardImage.setAttribute('src', cardImageUrl)
    cardImage.setAttribute('class', 'justify-content-center')
    cardImage.setAttribute('height', 250)
    cardImage.setAttribute('width', 350)
    eventCard.append(cardImage);
    // date and time
    var showDate = document.createElement("h3")
    showDate.setAttribute('class', 'text-center')
    var showTime = moment(data._embedded.events[i].dates.start.localTime, "H").format("LT")
    showDate.textContent = moment(data._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("[The show is on ]dddd [the] Do [of] MMMM[ at ]") + showTime
    eventCard.append(showDate);
    // venue name & ticket link with artist name plain
    var venueName = document.createElement("a")
    var artistName = data._embedded.events[i]._embedded.attractions[0].name
    venueName.setAttribute('class', 'text-center')
    var ticketURL = data._embedded.events[i].url?data._embedded.events[i].url:""
    venueName.setAttribute('href', `${ticketURL}`)
    venueName.setAttribute('target', '_blank')
    venueName.textContent = data._embedded.events[i]._embedded.venues[0].name + " - get your tickets for " + artistName + " here!"
    eventCard.append(venueName);
    
}

// function showResults() {
//     var resultsPage = "./results.html"
//     location.assign(resultsPage);
// }

// searchBtn.addEventListener("click", showResults);
searchBtn.addEventListener("click", getAPI);
