/*. -gets artist info from api- 
    
    • artist bio summary (second api request) 
    • separated artist album from artist info

*/

var ARTISTDETAILS = (function(n,infoKey) {

    var sub = n.artinfo = n.artinfo || {};

    //dependencies => apikey, artistalbum
    var album = n.artbum;
    
    var infoObj = {},
        mbid = mbid || undefined,
        whichArtist = whichArtist || undefined;
        

    var artistDetails = {

        infoCall: function(pi,whichArtist) {
            infoObj = pi;
             if(infoObj.artist.name == whichArtist) {
                //hold up values
                    infoObj.thumb   = infoObj.artist.image[1]["#text"];
                    infoObj.xltTag  = infoObj.artist.name;
                    infoObj.summary = infoObj.artist.bio.summary;
                    infoObj.mbid    = infoObj.artist.mbid;
                    //extras
                    infoObj.longSummary = infoObj.artist.bio.content;
                    infoObj.imagelg = infoObj.artist.image[2]["#text"];
                    infoObj.wikilink = infoObj.artist.bio.links.link.href;
                    infoObj.ontour = infoObj.artist.ontour; //1 or 2
                    infoObj.similar1name = infoObj.artist.similar.artist[0].name;
                    infoObj.similar1img = infoObj.artist.similar.artist[0].image[0]["#text"];
                    infoObj.similar2name = infoObj.artist.similar.artist[1].name;
                    infoObj.similar2img = infoObj.artist.similar.artist[1].image[0]["#text"];
                    infoObj.similar3name = infoObj.artist.similar.artist[2].name;
                    infoObj.similar3img = infoObj.artist.similar.artist[2].image[0]["#text"];
                    infoObj.tags1 = infoObj.artist.tags.tag[0].name; //music genre

                //get albums
                mbid = infoObj.artist.mbid;
                album.apiArtistAlbum(mbid,whichArtist, infoObj);

            }//if

        } //infoCall
        
       
    }; //artistDetails



    //api call - passes artist name
    var apiArtistInfo = function(whichArtist) {
        var datresp = '';
        xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.onreadystatechange = function() {
            if(xhr.status == 200 && xhr.readyState == 4) {
                    datresp = xhr.responseText;
                    infoObj = JSON.parse(datresp);
                    //callback
                    artistDetails.infoCall(infoObj,whichArtist);
                          
            }
          
        };//onreadystate

        //api - getTopArtists
        xhr.open('GET','http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+ whichArtist +'&api_key=' + infoKey.getKey()  + '&format=json');
        xhr.send(null);

    };


    
    


    //public
    sub.apiArtistInfo = apiArtistInfo;
    
    


    return n;


})(ARTISTDETAILS || {}, APIKEY.key);