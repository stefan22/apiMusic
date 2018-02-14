/*
  to improve on previous popupinfo.js going forward . (it works perfect so far with popupinfo.js but...)
  =================================================

  - constructor should stay only in artists.js and need to utilize its obj constructor's
    methods there here instead of creating new ones here.

  - having said that remove object constructor in popupinfo.js and convert its prototype method here,
    in this page into a reg function instead.
    
    Make constructor obj public in artists.js, and create an instance of it here in order to utilize its built-in properties.

  - i'm also calling image click events in both pages (artists.js and popupinfo.js), so I was forced to add too many
    if statements, in order to avoid collisions in previous popupinfo.js script and get it to work.

  - mainly because I decided to no longer use the image overlay from artists.js and 
    I'm using now a fullpage popup instead.
    So I need to either disable the method call for overlay in artists.js or 
    re-write it and make it accessible here, so that it works for the popup as well.

    Or just create a new method for the popup in artists.js, disable img overlay method call for now (maybe I'll get 
    to use it later) and make them both public.

*/

var ARTISTS = (function(a) {

    var sub = a.popup = a.popup || {};

    //artists
    var alc = a.dartists;


    var popup = {

        outerdiv: {
            id: "modinfo",
            class: "modal",
            type: "div"
        },

        outercontent: {
            class: "modal-content",
            type: "div"
        },

        span: {
            class: "close",
            inner: "x",
            type: "span"
        },

        h3: {
            inner:"Artist Info",
            type: "heading"
        },

        innercontent: {
            class: "modal-inner",
            inner: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ex.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>",
            type: "div"    
        }

    }, //popup

    ArtistObj = function(name) {
        this.name = name
        

    };

    ArtistObj.prototype.enterName = function() {
        var allartists = alc.artistsInLocalStorage();
        for(var i=0; i < allartists.length; i++) {
            if(allartists[i].name.indexOf(this.name) > -1) {
                popup.h3.inner = this.name;
                buildpopup();
                //exit
                i = allartists.length;
                
                
            }
        }
        

    };






    //build popup
    var buildpopup = function() {
        var ele = document,
            outerdiv = ele.createElement('div'),      //outerdiv
            outercontent = ele.createElement('div'),  //outercontent
            spanx = ele.createElement('span'),        //span
            h3x = ele.createElement('h3'),            //h3  
            innercontent = ele.createElement('div');  //innercontent

            outerdiv.id = popup.outerdiv.id;
            outerdiv.className = popup.outerdiv.class;
        
            outercontent.className = popup.outercontent.class;
        
            spanx.className = popup.span.class; 
            spanx.textContent = popup.span.inner; 
        
            h3x.textContent = popup.h3.inner;
        
            innercontent.className = popup.innercontent.class;
            innercontent.innerHTML = popup.innercontent.inner;

            //append to outercontent
            outercontent.appendChild(spanx);
            outercontent.appendChild(h3x);
            outercontent.appendChild(innercontent);
            //append to outerdiv
            outerdiv.appendChild(outercontent);
            //append to dom
            document.getElementById('musik').
            appendChild(outerdiv);

            //set display
            outerdiv.classList.add('modalOn');
            

    };

    
    
    //event fn globals
    var modal = document.querySelector('#modinfo.modal') || undefined,  //entire modal
        results = document.getElementById('results') || undefined,      //results 
        modartists = document.querySelectorAll('.allartists > .artist') || undefined,
        modclose = document.querySelector('#modinfo span.close') || undefined; //x-close

    


    //outside click fn
    var outsideMod = function(e) {
        if(e.target.className == "modal modalOn") {
            //remove div
            document.getElementById('modinfo').
            parentElement.removeChild(document.getElementById('modinfo'));
            

        }
        if(e.target.className == "close") {
            //remove div
            document.getElementById('modinfo').
            parentElement.removeChild(document.getElementById('modinfo'));
        }

    };

    //img click evt
    results.addEventListener('click', function(e) {
        //console.log(e);
        var name = e.target.nextSibling.children[0].textContent;
        if(e.target.tagName === "IMG" && document.getElementById('modinfo') == null) {
            //ArtistObj(name);
            var artone = new ArtistObj(name);
            artone.enterName();

        }//if img

    },false);


    if(popup.outerdiv.id == "modinfo" || document.getElementById('modinfo')) {
        //outside click evt
        document.addEventListener('click',outsideMod, false);

    }


    



    

    











    //public
    sub.buildpopup = buildpopup;


    return a;


})(ARTISTS || {});
