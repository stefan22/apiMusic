(function() {
     
    var footer = {
            mainfootop: {
                 p: "not yet decided",
             small: "not yet decided",
            },
            mainfootbottom: {
                small: "stefano®"
            }   
    };


    //template
    var template = ''; 
        template += '<div class="mainfootop"><div class="innerfoot">';
        template += '<a class="farrow-left" href="#">';
        template += '<i class="fas fa-angle-left fa-3x"></i></a>';
        template += '<a class="farrow-right" href="#"> ';
        template += '<i class="fas fa-angle-right fa-3x"></i></a>';
        template += '<div id="isposition"><p> <small></small></p></div></div></div>';
        template += '<div class="mainfootbottom"><small>';
        template += '{{mainfootbottom.small}}';
        template += '</small></div>';
        


    var html = Mustache.render(template, footer);
    //feed to
    document.querySelector('footer').innerHTML = html;





})();

        




