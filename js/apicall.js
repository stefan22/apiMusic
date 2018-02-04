var MUSIC = (function(m, keydep) {

var sub = m.music = m.music || {};

//dependencies
//keydep, dartists

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

            results += '<div class="artist">';
            results += '<img src="' + allArtists[i].image[3]["#text"] + '" />';
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
        //passing key
        key = keydep.getKey();
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
    sub.yoman = yoman;
    sub.apiCall = apiCall;
    sub.jsonObj = jsonObj;


    return m;



})(MUSIC || {}, APIKEY.key);








