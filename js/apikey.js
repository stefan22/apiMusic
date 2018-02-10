var APIKEY = (function(k) {

var sub = k.key = k.key || {};

//private
var APIKEY = '0xxxxxxxxxxxxxx6aa901d3';


var getKey = function() {
    return APIKEY;
}



//public
sub.getKey = getKey;


return k;


})(APIKEY || {});
