(function() {
    
    var header = {
        h1: "Music"

    };

    //template
    var template = "<h1>{{h1}}</h1>";
    var html = Mustache.render(template, header);
    //feed to
    document.querySelector('header').innerHTML = html;






   




})();