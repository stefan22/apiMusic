/*. -gets artist info from api- 
    
    • so now adding an artist bio summary (second api request) and 
    • third request uses mbid from previous call to get their albums.

   refactoring
   ============
   • apicall fn

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

    var infoObj = {},
        topAlbums = {},
        whichArtist = whichArtist || undefined;
        

    var artistDetails = {

        infoCall: function(pi,whichArtist) {
            var infoObj = pi;
             if(infoObj.artist.name == whichArtist) {
                //hold up values
                    infoObj.thumb   = infoObj.artist.image[1]["#text"];
                    infoObj.xltTag  = infoObj.artist.name;
                    infoObj.summary = infoObj.artist.bio.summary;
                    infoObj.mbid    = infoObj.artist.mbid;
                //get albums
                apiArtistInfoArtistAlbum(whichArtist, infoObj.artist.mbid);
            }//if

        }, //infoCall
        
        albumCall: function(ai,whichArtist) {
            topAlbums = ai;
            if(topAlbums.topalbums.album[0].artist.name == whichArtist) {
                //second round of calls
                topAlbums.albumName  = topAlbums.topalbums.album[0].name;
                topAlbums.albumCover = topAlbums.topalbums.album[0].image[2]["#text"];
                topAlbums.playcount  = topAlbums.topalbums.album[0].playcount;  
                   
            }//if  
            
            artistDetails.onToPage(); 
            console.log(infoObj);
            console.log(topAlbums);
 
        
        }, //albumCall

        onToPage: function() {
             //handle
             var han = document.querySelector('#modinfo .modal-inner');
            //if popup showing
            if(document.getElementById('modinfo')) {
                //insert data
                han.innerHTML = '<img class="thmb" src="' + infoObj.thumb + '" width="64" height="64"alt="'+ infoObj.xltTag +'" /><p>' + infoObj.summary + '</p>' + '<div class="albums"><h4>About Artist</h4><div class="artimg"><img src="' + topAlbums.albumCover + '" width="174" height="174" /><h5><small>Top Album: </small>' + topAlbums.albumName + '</h5><div class="aminfo"><small>Artist</small><p>' + infoObj.xltTag + '</p><small>playcount</small><p>' + topAlbums.playcount + '</p></div></div></div>';

                return han;
            
            }//if modinfo

        } //onToPage fn

    
    }; //artistDetails



    //api call - passes artist name
    var apiArtistInfoArtistAlbum = function(whichArtist, mbid) {
        mbid = mbid || undefined;
        console.log(mbid);
        var infoOut = '';
        //mbid collected from artist
        if(typeof mbid == "string" && mbid.length > 0) {
            //second call
            //serverCall = function() {
                xhr = new XMLHttpRequest();
                xhr.overrideMimeType('application/json');
                xhr.onreadystatechange = function() {
                    if(xhr.status == 200 && xhr.readyState == 4) {
                            infoOut = xhr.responseText;
                            topAlbums = JSON.parse(infoOut);
                            //callback
                            artistDetails.albumCall(topAlbums,whichArtist);      
                    }
                  
                };//onreadystate

                //api - getTopArtists
                xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=' + mbid  + '&api_key=' + infoKey.getKey() + '&format=json');
                xhr.send(null);


            //}(); //serverCall

        }//if mbid 

        else {
            //first call
            xhr = new XMLHttpRequest();
            xhr.overrideMimeType('application/json');
            xhr.onreadystatechange = function() {
                if(xhr.status == 200 && xhr.readyState == 4) {
                        infoOut = xhr.responseText;
                        infoObj = JSON.parse(infoOut);
                        //callback
                        artistDetails.infoCall(infoObj,whichArtist);             
                }
              
            };//onreadystate

            //api - getTopArtists
            xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+ whichArtist +'&api_key=' + infoKey.getKey()  + '&format=json');
            xhr.send(null);

        } //else  

        

    }; //apiArtistInfoArtistAlbum





    //public
    sub.apiArtistInfoArtistAlbum = apiArtistInfoArtistAlbum;
    


    return n;


})(ARTISTINFO || {}, APIKEY.key);
