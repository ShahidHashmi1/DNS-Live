var resultsContainer = document.getElementById("results");
var searchBtn = document.getElementById("searchBtn");
var APIkey = `SjdErjacka4IpkCfwvFaKPS8ysvInbVL`;
// youtube API global variables below
// var button = document.getElementById("btn");
//var search = document.getElementById("artistInfo");
var youtubeArea =document.getElementById("youtubeVid");
var artistName;
var musicVideoReturn;

function init(event) {
    event.preventDefault();

    getAPI();
    console.log("here you go!")
    // getArtist();
}

// ticketmaster api and functions below
function getAPI() {
   
    var cityName = JSON.parse(localStorage.getItem('input'));
    //var cityName = document.querySelector("#input-text").value
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${cityName}&apikey=${APIkey}`)

        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            // nest second API call here since their order is sequential
            var length = (data._embedded.events.length > 10) ? 10 : data._embedded.events.length
            for(var i = 0; i < length; i++) {
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
    console.log(data._embedded.events[i])
    
    venueName.setAttribute('class', 'text-center')
    var ticketURL = data._embedded.events[i].url?data._embedded.events[i].url:""
    venueName.setAttribute('href', `${ticketURL}`)
    venueName.setAttribute('target', '_blank')
    venueName.textContent = data._embedded.events[i]._embedded.venues[0].name + " - get your tickets for " + artistName + " here!"
    eventCard.append(venueName);
    if(data._embedded.events[i]._embedded.attractions && data._embedded.events[i]._embedded.attractions.length > 0 ) {
        artistName = data._embedded.events[i]._embedded.attractions[0].name
        getArtist(artistName, i)

    }
    

   
   
}

function getArtist(artistName, itr){
    var requestUrl = "https://theaudiodb.com/api/v1/json/2/search.php?s=" + artistName;
    var artistId;

    fetch(requestUrl)
    .then(function(response){
        console.log(response)
        return response.json();
    })

    .then(function(data){
        console.log(data)
         artistId = data.artists[0].idArtist
         console.log(artistId)
         getMusicVideo(artistId);
         console.log(itr)
         appendMusicVidInfo(itr)

    
    })
}


function getMusicVideo(param, ) {

    var requesturl2 = `https://theaudiodb.com/api/v1/json/2/mvid.php?i=${param}`;
    
    fetch(requesturl2)
    .then(function(response){
        console.log(response)
        return response.json();
        
    })

    .then(function(data){
        console.log(data)

        musicVideoReturn = data
        

        var youtubeVid =document.createElement("p");
        youtubeVid.textContent = "check out this youtube video for more info!";
        console.log(eventCard);
        console.log(youtubeVid);
        eventCard.append(youtubeVid);
        var youtubeLink =document.createElement("a");
        youtubeLink.setAttribute('href', data.mvids[0].strMusicVid)
        youtubeLink.setAttribute('target', '_blank')
        youtubeLink.innerHTML = data.mvids[0].strMusicVid;
        eventCard.append(youtubeLink);
        
        
       
        
        return;
        

        
    })
    .catch(function(error){
        console.log(error)
    })
}

function appendMusicVidInfo(itr) {


    
}
getAPI();

 


// youtube API and functions above

// youtube API and button click 
// button.addEventListener("click", searchArea)

// ticketmaster API and button click
//searchBtn.addEventListener("click", getAPI);