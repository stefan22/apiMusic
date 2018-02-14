var ARTISTS  = (function(a,mapi,keydep) {

    var sub = a.dartists = a.dartists || {};

    //global var
    var pos = pos || undefined;
        
    //dependencies => mapi,keydep

    //localStorage atm
    var artistsInLocalStorage = function() {
        //localstorage => artists (artists.artist)
        var artists = localStorage.getItem('artists');
        artists = JSON.parse(artists);
        //console.log(artists);
        return artists;

    },

    //constructor
    ArtistObj = function(name,id,img) {
        this.name = name;
        this.id = id;
        this.img = img;


    };

    //proto fn
    ArtistObj.prototype.displayArtist = function() {
        var isname,isid;
        //if undefined - clicked outside
        if(this.name == undefined) {
            //add to footer
            isname = this.name = "click artist";
            isid = this.id = '';
            document.getElementById('isposition').innerHTML = '<p>' + isname + ' ' +  '<small>' + isid + '</small></p>';
        }
        //else
        else {
            //add to footer
            document.getElementById('isposition').innerHTML = '<p>' + this.name + ' ' +  '<small>' + this.id + '</small></p>';
        }

    },

    //proto overlay on
    ArtistObj.prototype.ovrlayOn = function(isImg) {
       //remove overlay first 
       this.ovrlayOff("IMG");
       this.img = isImg;
       //create div
       var ele = document.createElement('div'),
           han;
       ele.classList.add('artistolay');
       //handle
       if(this.img !== undefined) {
            han = this.img.parentElement;
            han.appendChild(ele);
       }
       
    
    },

    ArtistObj.prototype.ovrlayOff = function(e) {
        var all = document.querySelectorAll('.allartists'),
            all = all[0].children;
            //handle
            var han = document.querySelectorAll('.allartists')[0].children;
            //cycle through artists
            if(e == "IMG") {
                for(var i=0; i < all.length; i++) {
                    if(all[i].className == "artist") {
                        //remove overlay
                        if(all[i].lastElementChild.className == 'artistolay') {
                            han = han[i].lastChild;
                            all[i].lastElementChild.parentElement.removeChild(han);
                        }
                    }//if artist      
                }//for
            }
            //else
            else {

                for(var i=0; i < all.length; i++) {
                    //remove overlay
                    if(all[i].className == "artist") {
                        if(all[i].lastElementChild.className == 'artistolay') {
                            han = han[i].lastChild;
                            all[i].lastElementChild.parentElement.removeChild(han);
                        }
                    }//if artist      
                }//for
            }
    },


    //on page artists
    getArtists = function(e) {
        //to avoid collision
        if(document.getElementById('modinfo') == null) {

            if(e.target.tagName == 'IMG') {

                //grab name - from img click
                var name = e.target.nextElementSibling.firstElementChild.innerText,
                    //grabbing entire artists array
                    results = e.target.parentElement.parentElement.parentElement.children[0].children,
                    //position
                    //pos,
                    isImg;


                for(var i=0; i < results.length; i++) {
                    var lastChild;
                    //added spacer
                    if(results[i].className == 'artist') {
                        if(results[i].lastChild.className == 'info') {

                            if(results[i].lastChild.firstChild.innerText.toUpperCase() === name.toUpperCase()) {
                                //console.log('name: ' + name);
                                //console.log(Number(i) + 1);
                                name = name;
                                pos = Number(i) + 1;
                                isImg = e.target;
                               
                            }//if name  

                        } else {

                            if(results[i].lastChild.previousSibling.firstChild.innerText.toUpperCase() === name.toUpperCase()) {
                                //console.log('name: ' + name);
                                //console.log(Number(i) + 1);
                                name = name;
                                pos = Number(i) + 1;
                                isImg = e.target;
                               
                            }//if name  

                        }//else  

                    }//if artist

                }//for

            }//artist img

            else {
                //clicked outside
                var noartist = new ArtistObj();
                noartist.ovrlayOff(); 
            }

            var artist = new ArtistObj(name, pos, isImg);
            artist.displayArtist();
            artist.ovrlayOn(isImg);    


        }//not while popupinfo is on


    }; //getArtists


    //evt click
    if(document.getElementById('modinfo') == null ) {
        //popup not there
        document.addEventListener('click', getArtists, false);

    }

    
        


    //public
    sub.artistsInLocalStorage = artistsInLocalStorage;
    sub.pos = pos;


    return a;



})(ARTISTS || {}, MUSIC.music, APIKEY.key, );
