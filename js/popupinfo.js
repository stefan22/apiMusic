/*
    sooo much better now ®√
    ===========
    - instance obj generated at artists.js
    - removed extra constructor fn here
    - converted prototype into a fn that handles returned event data generated 
      at artists.js
    - just a single img click event across ARTISTS modules
    - enterdata now inside popup obj
*/


var ARTISTS = (function(p,atfo) {

    var sub = p.popupinfo = p.popupinfo || {};

    //dependencies
    var alc = p.dartists;   //artists module
    // artistinfo module part of artistdetails

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
                console.log(artista);
                var name,id;
                popup.h3.inner = name = artista.name || undefined;
                popup.h3.id = id = artista.id || undefined;

                if(name !== undefined && id !== undefined) {
                        //showtime   
                        buildpopup(artista);
                }
                
        }//enterdata
    };//popup


    //buildpopup    
    var buildpopup = function(isArtista) {
        var ele = document,
            outerdiv = ele.createElement('div'),      //outerdiv
            outercontent = ele.createElement('div'),  //outercontent
            spanx = ele.createElement('span'),        //span
            h3x = ele.createElement('h3'),            //h3  
            smx = ele.createElement('small'),
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
        //small
        smx.textContent = "id:" + popup.h3.id;
        
        //innercontent class, content
        innercontent.className = popup.innercontent.class;

        //pass artista -id,name,img
        innercontent.innerHTML = atfo.apiArtistInfo(isArtista.name) || popup.innercontent.inner;

        //append to outercontent
        outercontent.appendChild(spanx);
        outercontent.appendChild(h3x);
        outercontent.appendChild(innercontent);
        outercontent.appendChild(smx);

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
            //call infodata
           

            popup.enterdata(alc.artist);
        }


    },false);

        

    
            
            
           

    //public 
    sub.buildpopup = buildpopup; //dont need public fns,properties atm
    sub.popup = popup;










    return p;


})(ARTISTS || {}, ARTISTDETAILS.artinfo );