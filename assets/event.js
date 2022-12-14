var resultsContainer = document.getElementById("results");
var searchBtn = document.getElementById("searchBtn");
var APIkey = `SjdErjacka4IpkCfwvFaKPS8ysvInbVL`;
var youtubeArea =document.getElementById("youtubeVid");
var artistName;
var musicVideoReturn;
var homeBtn = document.getElementById('homeBtn');
var errorTxt = document.getElementById('errorTxt');

function init(event) {
    event.preventDefault();

    getAPI();
   
}


function getAPI() {
   
    var cityName = JSON.parse(localStorage.getItem('input'));

        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${cityName}&apikey=${APIkey}`)

        .then(function(response) {
            if(response.status !== 200) {
            errorTxt.textContent = "Invalid city name, please return to the home page to try again!"  
            } else {
                return response.json()
            }
            
        })
        
        .then(function(data) {
            console.log(data);
            if (data.page.totalElements !== 0) {
                var length = (data._embedded.events.length > 10) ? 10 : data._embedded.events.length
                for(var i = 0; i < length; i++) {
                    setEvent(data, i)
                } 
            } else {
                errorTxt.textContent = "Invalid city name, please return to the home page to try again!"
            }
        }) 
}


function setEvent(data, i) {
   
    var eventCard = document.createElement("div")
    eventCard.setAttribute('class', 'container')
    eventCard.setAttribute('id', i)
    resultsContainer.append(eventCard)
    var eventTitle = document.createElement("h2") 
    eventTitle.textContent = [data._embedded.events[i].name]
    eventCard.append(eventTitle);
    var cardImage = document.createElement("img")
    var cardImageUrl = data._embedded.events[i].images[0].url
    cardImage.setAttribute('src', cardImageUrl)
    cardImage.setAttribute('class', 'justify-content-center')
    cardImage.setAttribute('height', 250)
    cardImage.setAttribute('width', 350)
    eventCard.append(cardImage);
    var showDate = document.createElement("h3")
    var showTime = moment(data._embedded.events[i].dates.start.localTime, "H").format("LT")
    showDate.textContent = moment(data._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("[The show is on ]dddd [the] Do [of] MMMM[ at ]") + showTime
    eventCard.append(showDate);
    var venueName = document.createElement("a") 
    var ticketURL = data._embedded.events[i].url?data._embedded.events[i].url:""
    venueName.setAttribute('href', `${ticketURL}`)
    venueName.setAttribute('target', '_blank')
    venueName.textContent = data._embedded.events[i]._embedded.venues[0].name + " - get your tickets here!"
    eventCard.append(venueName);
    if(data._embedded.events[i]._embedded.attractions && data._embedded.events[i]._embedded.attractions.length > 0 ) {
        artistName = data._embedded.events[i]._embedded.attractions[0].name
        getArtist(artistName, eventCard)
        
        



    }
    

   
   
}

function getArtist(artistName, eventCard){
    var requestUrl = "https://theaudiodb.com/api/v1/json/2/search.php?s=" + artistName;
    var artistId;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })

    .then(function(data){
        if(data.artists != null && data.artists[0]) {
            artistId = data.artists[0].idArtist
            getMusicVideo(artistId, eventCard);
        

        }
        

    
    })
}


function getMusicVideo(param, eventCard) {

    var requesturl2 = `https://theaudiodb.com/api/v1/json/2/mvid.php?i=${param}`;
    // console.log(eventCard)
    
    fetch(requesturl2)
    .then(function(response){
        return response.json();
        
    })

    .then(function(data){
        // console.log(data)

        musicVideoReturn = data
        

        var youtubeVid =document.createElement("p");
        // console.log(eventCard);
        // console.log(youtubeVid);
        eventCard.append(youtubeVid);
        var youtubeLink = document.createElement("a");
        youtubeLink.setAttribute('href', data.mvids[0].strMusicVid)
        youtubeLink.setAttribute('target', '_blank')
        youtubeLink.textContent = "check out some content here!"
        eventCard.append(youtubeLink);
        var lineBreak = document.createElement("hr")
        eventCard.append(lineBreak);
        
        return;
        
    })
    .catch(function(error){
        // console.log(error)
    })
}

function goHome () {
    location.assign("./index.html")
}

homeBtn.addEventListener('click', goHome);

getAPI();



