
var PX = "px";

var _ACTIVE = "_active",
    _HOVER  = "_hover",
    _FOCUS  = "_focus",
    _TIMER  = "_timer";

var _timers   = {}, // store for timeouts
    _values   = {}, // store for computed values
    _vertical = {}; // vertical controls

function _resetScroll() {
  this.scrollTop = 0;
};

var _numberDefaults = {min:0, max:0, step:0}; // these values are for enumeration only

var _MSIE = detect("MSIE");
