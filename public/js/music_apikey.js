var APIKEY = (function(k) {

var sub = k.key = k.key || {};

//private
var APIKEY = '06f1dc77ed67d80a215a3c3b6aa901d3';


var getKey = function() {
    return APIKEY;
}



//public
sub.getKey = getKey;


return k;


})(APIKEY || {});
