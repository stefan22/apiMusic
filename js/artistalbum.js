/*. -gets artist album from api- 
    
    • third request uses mbid from previous call to get their albums.
    • artist info and artist album are now part of ARTISTDETAILS - sharing same global
    • separated artist info and artist album

*/

var ARTISTDETAILS = (function(b,infoKey) {

    var sub = b.artbum = b.artbum || {};

    //dependencies => apikey
    var xrtist = b.artinfo;

    var topAlbums = {},
        whichArtist = whichArtist || undefined,
        //need to hold on to this
        artist = {};

    var albumDetails = {

        albumCall: function(ai,whichArtist) {
            topAlbums = ai;
            if(topAlbums.topalbums.album[0].artist.name == whichArtist) {
                //second round of calls | this is top album
                topAlbums.albumName  = topAlbums.topalbums.album[0].name;
                topAlbums.albumCover = topAlbums.topalbums.album[0].image[2]["#text"];
                topAlbums.playcount  = topAlbums.topalbums.album[0].playcount;  
    
                var allbums =  topAlbums.topalbums.album;
                //highest playcount
                var highest = 0,
                    himg,halbum;
                for(var a=0; a < allbums.length; a++) {
                    if(Number(allbums[a].playcount) > highest) {
                        highest = Number(allbums[a].playcount);
                        himg = allbums[a].image[0]["#text"];
                        halbum = allbums[a].name;    
                    }//if   
                
                }//for

            }//if  
            
            albumDetails.onToPage(); 
        
        }, //albumCall

        onToPage: function() {
             //handle
             var han = document.querySelector('#modinfo .modal-inner');
            //if popup showing
            if(document.getElementById('modinfo')) {
                //insert data
                han.innerHTML = '<img class="thmb" src="' + artist.thumb + '" width="64" height="64"alt="'+ artist.xltTag +'" /><p>' + artist.summary + '</p>' + '<div class="albums"><h4>About Artist</h4><div class="artimg"><img src="' + topAlbums.albumCover + '" width="174" height="174" /><h5><small>Top Album: </small>' + topAlbums.albumName + '</h5><div class="aminfo"><small>Artist</small><p>' + artist.xltTag + '</p><small>playcount</small><p>' + topAlbums.playcount + '</p></div></div></div>';

                return han;
            
            }//if modinfo

        } //onToPage fn

    
    }; //artistDetails


    //api call - top artist album
    var apiArtistAlbum = function(mbid,whichArtist,infoObj) {
        artist = infoObj;
        artist.mbid = mbid;

        var infoOut = '';
        if(typeof mbid == "string" && mbid.length > 0) {

            xhr = new XMLHttpRequest();
            xhr.overrideMimeType('application/json');
            xhr.onreadystatechange = function() {
                if(xhr.status == 200 && xhr.readyState == 4) {
                        infoOut = xhr.responseText;
                        topAlbums = JSON.parse(infoOut);
                        //callback
                        albumDetails.albumCall(topAlbums,whichArtist);      
                }
              
            };//onreadystate

            //api - getTopArtists
            xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=' + mbid  + '&api_key=' + infoKey.getKey() + '&format=json');
            xhr.send(null);

        }//if mbid   

    };//apiArtistAlbum





    


    //public
    sub.apiArtistAlbum = apiArtistAlbum;
    


    return b;


})(ARTISTDETAILS || {}, APIKEY.key);