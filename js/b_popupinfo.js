/*
    sooo much better now ®√
    ===========
    - instance obj generated at artists.js
    - removed extra constructor fn here
    - converted prototype into a fn that handles returned event data generated 
      at artists.js
    - just a single img click event across ARTISTS modules
    - enterdata better yet a method inside popup obj

*/

var ARTISTS = (function(p) {

    var sub = p.popupinfo = p.popupinfo || {};

    //artists module
    var alc = p.dartists;


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
            id: alc.artist.id,
            inner:alc.artist.name,
            type: "heading"
        },
        innercontent: {
            class: "modal-inner",
            inner: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ex.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>",
            type: "div"    
        },
        enterdata: function(artista) {
                artista = alc.artist || {};
                var name,id;
                popup.h3.inner = name = artista.name || undefined;
                popup.h3.id = id = artista.id || undefined;

                if(name !== undefined && id !== undefined) {
                        //showtime   
                        buildpopup();
                }
        }//enterdata
    };//popup


    //buildpopup    
    var buildpopup = function() {
        var ele = document,
            outerdiv = ele.createElement('div'),      //outerdiv
            outercontent = ele.createElement('div'),  //outercontent
            spanx = ele.createElement('span'),        //span
            h3x = ele.createElement('h3'),            //h3  
            innercontent = ele.createElement('div');  //innercontent
        
        //outerdiv id,class
        outerdiv.id = popup.outerdiv.id;
        outerdiv.className = popup.outerdiv.class;
        //outercontent id,class
        outercontent.className = popup.outercontent.class;
        //span class,content
        spanx.className = popup.span.class; 
        spanx.textContent = popup.span.inner; 
        //h3 content
        h3x.textContent = popup.h3.inner;
        //innercontent class, content
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

   

    //when popup - click outside-of-it evt
    if(popup.outerdiv.id == "modinfo" || document.getElementById('modinfo')) {
        //outside click evt
        document.addEventListener('click',outsideMod, false);

    }


    
    
    //init img evt
    document.getElementById('results').
    addEventListener('click', function(e) {
        if(e.target.tagName == "IMG") {
            alc.getArtistsOnpage(e);
        }

        //stars at 1
        if(alc.artist.id > 0) {
            popup.enterdata(alc.artist);
        }


    },false);

        

    
            
            
           

    //public
    sub.buildpopup = buildpopup;
    //sub.enterdata = enterdata;










    return p;


})(ARTISTS || {} );
