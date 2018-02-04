var ARTISTS  = (function(a,mapi,keydep) {

    var sub = a.dartists = a.dartists || {};
        
    //dependencies => mapi,keydep

    //localStorage atm
    var artistsInLocalStorage = function() {
        //localstorage => artists (artists.artist)
        var artists = localStorage.getItem('artists'),
        artists = JSON.parse(artists);
        //console.log(artists);
        return artists;

    },

    //constructor
    ArtistObj = function(name,id) {
        this.name = name;
        this.id = id;

    };

    //proto fn
    ArtistObj.prototype.displayArtist = function() {
        //add to footer
        document.getElementById('isposition').innerHTML = '<p>' + this.name + ' ' +  '<small>' + this.id + '</small></p>';

    },

    //on page artists
    getArtists = function(e) {
        //grab name - from img click
        var name = e.target.nextElementSibling.firstElementChild.innerText,
            //grabbing entire artists array
            results = e.target.parentElement.parentElement.parentElement.children[0].children,
            //position
            pos;

        for(var i=0; i < results.length; i++) {

            if(results[i].lastChild.firstChild.innerText.toUpperCase() === name.toUpperCase()) {
                console.log('name: ' + name);
                console.log(Number(i) + 1);
                name = name;
                pos = Number(i) + 1;
            }  

        }//for

        var artist = new ArtistObj(name, pos);
        artist.displayArtist();

    }, //getArtists


    //evt click
    document.addEventListener('click', getArtists, false);
        


    //public
    sub.artistsInLocalStorage = artistsInLocalStorage;


    return a;



})(ARTISTS || {}, MUSIC.music, APIKEY.key, );
