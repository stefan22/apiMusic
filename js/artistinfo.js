/*. -gets artist info from api-
    
    click evt happens from within popupinfo.js (enterdata fn, buildpopup fn)
    so now adding an artist bio summary (second api request) and passing
    data i collected from the initial call request.
*/

var ARTISTINFO = (function(n,infoKey) {

    var sub = n.artInfo = n.artInfo || {};

    //dependencies => apikey


    var whichArtist = '';       //'Kendrick+Lamar'
        infoOut = '',
        infoObj = {},

    infocall = function(res) {
        console.log(res);
        var summary = res = infoObj.artist.bio.summary,
            thumb = res = infoObj.artist.image[1]["#text"],
            xltTag = res = infoObj.artist.name; 

        if(document.getElementById('modinfo')) {
            var han = document.querySelector('#modinfo .modal-inner');
            //insert to popoup
            han.innerHTML = '<img class="thmb" src="' + thumb + '" width="64" height="64"alt="'+ xltTag +'" /><p>' + summary + '</p>';
            return han;
        }

    }, //infocall

    //api call - passes artist name
    apiArtistInfo = function(whichArtist) {
        whichArtist = whichArtist || undefined;
        xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.onreadystatechange = function() {
            if(xhr.status == 200 && xhr.readyState == 4) {
                    //debugger;
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


    //apiArtistInfo();










    

    //public
    sub.apiArtistInfo = apiArtistInfo;
    sub.infocall = infocall;


    return n;


})(ARTISTINFO || {}, APIKEY.key);
