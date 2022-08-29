resultsContainer = document.getElementById("results");
searchBtn = document.getElementById("searchBtn");
APIkey = `SjdErjacka4IpkCfwvFaKPS8ysvInbVL`
tmURL = `https://app.ticketmaster.com/{package}/{version}/{resource}.json?apikey=**{APIkey}`
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

function setEvent(data, i) {
    // title
    var eventCard = document.createElement("div")
    eventCard.setAttribute('class', 'text-center')
    eventCard.setAttribute('class', 'container')
    eventCard.setAttribute('id', i)
    cardRow = document.createElement("div")
    cardRow.setAttribute('class', 'row')
    cardCol = document.createElement("div")
    cardCol.setAttribute('class', 'col-sm-4')
    resultsContainer.append(eventCard)
    eventCard.append(cardRow)
    eventCard.append(cardCol)
    var eventTitle = document.createElement("h2")
    eventTitle.textContent = [data._embedded.events[i].name]
    eventCard.append(eventTitle);
    // card image
    var cardImage = document.createElement("img")
    var cardImageUrl = data._embedded.events[i].images[0].url
    cardImage.setAttribute('src', cardImageUrl)
    cardImage.setAttribute('class', 'align-items-center')
    cardImage.setAttribute('height', 250)
    cardImage.setAttribute('width', 350)
    eventCard.append(cardImage);
    // venue name
    var venueName = document.createElement("a")
    venueName.setAttribute('class', 'text-center')
    var venueURL = data._embedded.events[i]._embedded.venues[0].url?data._embedded.events[i]._embedded.venues[0].url:""
    venueName.setAttribute('href', `${venueURL}`)
    venueName.textContent = data._embedded.events[i]._embedded.venues[0].name
    eventCard.append(venueName);
    // date and time
    var showDate = document.createElement("h3")
    showDate.setAttribute('class', 'text-center')
    var showTime = moment(data._embedded.events[i].dates.start.localTime, "H").format("LT")
    showDate.textContent = moment(data._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("[The show is on ]dddd [the] Do [of] MMMM[ at ]") + showTime
    eventCard.append(showDate);
    // tickets purchase and link
    var ticketsURL = document.createElement("a")
    ticketsURL.setAttribute('class', 'text-center')
    ticketsURL.textContent = data._embedded.events[i].url
    ticketsURL.setAttribute('class', 'text-center')
    // var tickets = ("For ticket links, click here!")
    // tickets.setAttribute('href', ticketsURL)
    // console.log(tickets);
    // eventCard.append(tickets);

}

searchBtn.addEventListener("click", getAPI);