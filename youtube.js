var button = document.getElementById("btn");
var search = document.getElementById("artistInfo");
var youtubeArea =document.getElementById("youtubeVid");

var searchArea = function(event){
    event.preventDefault();
        var artistSearch = search.value.trim();
        console.log(artistSearch);
 getArtist(artistSearch)   
}

function getArtist(artistSearch){
    var requestUrl = "https://theaudiodb.com/api/v1/json/2/search.php?s=" + artistSearch;
    var artistId;

    fetch(requestUrl)
    .then(function(response){
        console.log(response)
        return response.json();
    })

    .then(function(data){
        console.log(data)
         artistId = data.artists[0].idArtist
         getMusicVideo(artistId);
    
    })

    

        
       


}
// fake
function getMusicVideo(param) {
    var requesturl2 = `https://theaudiodb.com/api/v1/json/2/mvid.php?i=${param}`// + param;
    //console.log(param);
    fetch(requesturl2)
    .then(function(response){
        console.log(response)
        return response.json();
        
    })

    .then(function(data){
        console.log(data)

        var youtubeVid =document.createElement("p");
        var youtubeLink =document.createElement("a");
        youtubeLink.setAttribute('href',data.mvids[0].strMusicVid)
        youtubeLink.setAttribute('target', '_blank')
        youtubeLink.innerHTML = data.mvids[0].strMusicVid;
        youtubeVid.textContent = "check out this youtube video for more info!";
        youtubeArea.append(youtubeVid);
        youtubeArea.append(youtubeLink);
        
        return;
        

        
    })
    .catch(function(error){
        console.log(error)
    })
}





getMusicVideo();

button.addEventListener("click", searchArea)

