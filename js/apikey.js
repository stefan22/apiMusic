var APIKEY = (function(k) {

var sub = k.key = k.key || {};

//private
var APIKEY = '06xxxxxxxxxxxxxxxxxxxxxxx01d3';


var getKey = function() {
    return APIKEY;
}



//public
sub.getKey = getKey;


return k;


})(APIKEY || {});
