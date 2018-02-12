var ARTISTPOPUP = (function(a) {

    var sub = a.popup = a.popup || {};

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
            inner: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>",
            type: "div"    
        }

    }, //popup



    //build popup
    buildpopup = function() {
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

    };

    
    //buildpopup
    buildpopup();
    

    //event fn globals
    var modal = document.querySelector('#modinfo.modal'),  //entire modal class
        results = document.getElementById('results'),      //results 
        modartists = document.querySelectorAll('.allartists > .artist'), //allartists
        modclose = document.querySelector('#modinfo span.close');  //x-close


    //outside click fn
    var outsideMod = function(e) {
        if(e.target == modal) {
            //remove modal
            modal.classList.remove('modalOn');
        }

    };

    //img click evt
    results.addEventListener('click', function(e) {
        if(e.target.tagName === "IMG") {
            modal.classList.add('modalOn');

        }//if img

    },false);

    //span close-x evt
    modclose.addEventListener('click',function(e) {
        modal.classList.remove('modalOn');

    },false);

    //outside click evt
    document.addEventListener('click',outsideMod, false);











    //public
    sub.buildpopup = buildpopup;


    return a;


})(ARTISTPOPUP || {});

    