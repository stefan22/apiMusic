/*
   - updated to reflect changes from overlay to popup 
   - no dependencies
   - artistObj instance (event data), getArtistLocalStorage, getArtistsOnpage set to public
*/

var ARTISTS  = (function(a) {

    var sub = a.dartists = a.dartists || {};

    //localStorage atm
    var getArtistLocalStorage = function() {
        var artists = localStorage.getItem('artists');
        artists = JSON.parse(artists);
        return artists;

    },

    //constructor
    ArtistObj = function(id,name,img) {
        this.id = id || '';
        this.name = name || '';
        this.img = img || '';
    
    };

    //to be set public
    var artist = {};
    //new isntance
    artist = new ArtistObj();
    

    //proto - display name,position in footer
    ArtistObj.prototype.displayArtistFooter = function() {
        var isname,isid;
        isname = this.name || undefined;
        isid = this.id || undefined;
        //add to footer
        document.getElementById('isposition').innerHTML = '<p>' + this.name + ' ' +  '<small>' + this.id + '</small></p>';

    },

    //proto overlay on
    ArtistObj.prototype.ovrlayOn = function(isImg) {
       //remove overlay first 
       this.ovrlayOff("IMG");
       this.img = isImg;
       //create div
       var ele = document.createElement('div'),
           han;
           //add class,append
           ele.classList.add('artistolay');
           //handle
           if(this.img !== undefined) {
                han = this.img.parentElement;
                han.appendChild(ele);
           }
    },

    //proto overlay off
    ArtistObj.prototype.ovrlayOff = function(e) {
        var all = document.querySelectorAll('.allartists > .artist'),
            han;    //handle
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

                for(var h=0; h < all.length; h++) {
                    //remove overlay
                    if(all[h].className == "artist") {
                        if(all[h].lastElementChild.className == 'artistolay') {
                            han = han[h].lastChild;
                            all[h].lastElementChild.parentElement.removeChild(han);
                        }
                    }//if artist      
                }//for
            }
    };

    //on page artists
    var getArtistsOnpage = function(e) {
        if(e.target.tagName == 'IMG') {
            //grab name - from img click
            var name = e.target.nextElementSibling.firstElementChild.innerText,
                //all-artists only
                results = document.querySelectorAll('.allartists > .artist'),
                //isImg
                img;

            for(var i=0; i < results.length; ) {

                if(results[i].lastChild.className == 'info') {
                    //when-info
                    if(results[i].lastChild.firstChild.innerText.toUpperCase() === name.toUpperCase()) {
                        //id,name,img
                        this.artist.id = Number(i) + 1;
                        this.artist.name = name;
                        this.artist.img = e.target;
                        this.artist.displayArtistFooter();
                       
                    
                       
                    }//if name  

                } else {
                    //when artistolay -only if using overlay
                    if(results[i].lastChild.previousSibling.firstChild.innerText.toUpperCase() === name.toUpperCase()) {
                        //id,name,img
                        var id;
                        id = Number(i) + 1;
                        name = name;
                        img = e.target;
                       
                    }//if name  

                }//else  
                 i++;

            }//for
            

        }//target-img

        else {//clicked outside
            /*
            no-ovrlay no more
            do nothing   
            */
        }


    }; //getArtistsOnpage


    //-overlay removed - click evt at popupinfo now

    

    
        
    //public
    sub.getArtistLocalStorage = getArtistLocalStorage; //havent decide what to do with it yet
    sub.getArtistsOnpage = getArtistsOnpage; //calling at popupinfo.js
    sub.artist = artist;  //data about click event

    return a;



})(ARTISTS || {} );
