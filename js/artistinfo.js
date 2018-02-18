/*. -gets artist info from api- 
    
    • so now adding an artist bio summary (second api request) and 
    • passing data i collected from the initial call request.
    • third request uses mbid for their albums.

   First to do: (refactoring)
   ==========================
    • all new data maybe into single new object (first/second call). 
    • infocall fn needs to go (no longer a fn) and
    • a re-usable api call function

   then:
   =====
    • there are 3 artists for which I don't have any information in popup.
    • guessing third call for album is the problem -need sol for that.
      (Post Malone, Camila Cabello and Dua Lipa)
    • load time (lady gaga took forever :)
*/

var ARTISTINFO = (function(n,infoKey) {

    var sub = n.artInfo = n.artInfo || {};

    //dependencies => apikey

    var whichArtist = '';       //'Kendrick+Lamar'
        infoOut = '',
        infoObj = {},
        //first call
        summary = '',
        thumb = '',
        xltTag = '',
        //second call
        topalbums = {},
        mbid = '',
        albumName = '',
        albumCover = '',
        playcount = '',

    infocall = function(res) {
        infoObj = res;
        //first round of calls
        summary = infoObj.artist.bio.summary,
        thumb = infoObj.artist.image[1]["#text"],
        xltTag = infoObj.artist.name;
        mbid = infoObj.artist.mbid;
        //album
        apiArtistAlbum(mbid)

        

    }, //infocall


    albumCall = function(res) {
        console.log(res);
        //handle
        var han = document.querySelector('#modinfo .modal-inner');
        summary = summary || undefined;
        thumb = thumb || undefined;
        xltTag = xltTag || undefined;
        //if popup showing
        if(document.getElementById('modinfo')) {
            //second round of calls
            albumName = res.topalbums.album[0].name;
            albumCover = res.topalbums.album[0].image[2]["#text"];
            playcount = res.topalbums.album[0].playcount;

            //insert to popoup
            han.innerHTML = '<img class="thmb" src="' + thumb + '" width="64" height="64"alt="'+ xltTag +'" /><p>' + summary + '</p>' + '<div class="albums"><h4>About Artist</h4><div class="artimg"><img src="' + albumCover + '" width="174" height="174" /><h5><small>Top Album: </small>' + albumName + '</h5><div class="aminfo"><small>Artist</small><p>' + xltTag + '</p><small>playcount</small><p>' + playcount + '</p></div></div></div>';

            return han;
        
        }//if modinfo


    },


    //api call - passes artist name
    apiArtistInfo = function(whichArtist) {
        whichArtist = whichArtist || undefined;
        xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.onreadystatechange = function() {
            if(xhr.status == 200 && xhr.readyState == 4) {
                    infoOut = xhr.responseText;
                    infoObj = JSON.parse(infoOut);
                    //callback
                    infocall(infoObj);      
            }
          
        };//onreadystate

        //api - getTopArtists
        xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+ whichArtist +'&api_key=' + infoKey.getKey()  + '&format=json');
        xhr.send(null);

    };


    //api call - top artist album
    apiArtistAlbum = function(mbid) {
        console.log(mbid);
        if(typeof mbid == "string" && mbid.length > 0) {

            xhr = new XMLHttpRequest();
            xhr.overrideMimeType('application/json');
            xhr.onreadystatechange = function() {
                if(xhr.status == 200 && xhr.readyState == 4) {
                        infoOut = xhr.responseText;
                        topalbums = JSON.parse(infoOut);
                        //callback
                        albumCall(topalbums);      
                }
              
            };//onreadystate

            //api - getTopArtists
            xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=' + mbid  + '&api_key=' + infoKey.getKey() + '&format=json');
            xhr.send(null);

        }//if mbid   

    };//apiArtistAlbum










    

    //public
    sub.apiArtistInfo = apiArtistInfo;
    sub.infocall = infocall;


    return n;


})(ARTISTINFO || {}, APIKEY.key);
