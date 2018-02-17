/*
    - it gets artist data from public api and inserts it into page
    - it gets top artists data (limited 50-count for now)
    - one dependency: apikey.js
    - no public methods/properties
*/

var MAIN = (function(m,topArtkey) {

var sub = m.music = m.music || {};


var jsonObj = {},
    output = '',
    results ='',
    totalCount = 50,
    //callback
    yoman = function(res) {
        //console.log(res);
        var allArtists = res.artists.artist;
        //output
        results += '<div class="allartists">';

        for(var i=0; i < totalCount; i++) {
            //3n+1, 3n+2
            if(i > 1 && i % 2 == 0) {
                //adding spacer after every two divs
                results += '<div class="spacer"></div>';  
            }    
        
            results += '<div class="artist">';
            results += '<img src="' + allArtists[i].image[4]["#text"] + '" />';
            results += '<div class="info">';
            results += '<h3>' + allArtists[i].name + '</h3>';
            results += '<h4>playcount: <br/>' +  + allArtists[i].playcount + '</h4>';   
            results += '<h4>listeners: </br/>' + allArtists[i].listeners + '</h4>';   
            results += '</div></div>';  //info,artist

            
        }

        results += '</div>';  //allartists
        document.getElementById('results').innerHTML = results;
    
    },


    //api call
    apiCall = function(key) {
        key = topArtkey.getKey();
        xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.onreadystatechange = function() {
            if(xhr.status == 200 && xhr.readyState == 4) {
                    //debugger;
                    output = xhr.responseText;
                    jsonObj = JSON.parse(output);
                    //add to localstorage
                    //console.log(jsonObj);
                    
                    if(typeof(Storage) !== undefined) {
                        localStorage.setItem(
                            'artists',
                            JSON.stringify(jsonObj.artists.artist)
                        );
                    }
                    
                    //callback
                    yoman(jsonObj);      
            }
          
        };//onreadystate

        //api - getTopArtists
        xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=' + key + '&format=json');
        xhr.send(null);

    };

    apiCall();


    


    //public
    //nothing atm


    return m;



})(MAIN || {}, APIKEY.key);








