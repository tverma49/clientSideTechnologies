"use strict";
var $ = function(id) { return document.getElementById(id); };

var saveReservation = function() {
    
    
    // submit form
    $("reservation_form").submit();
};

window.onload = function() {
    $("submit_request").onclick = saveReservation;
    $("arrival_date").focus();
};