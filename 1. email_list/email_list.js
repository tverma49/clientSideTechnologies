"use strict";
var $ = function(id) {
    return document.getElementById(id);
};
var joinList = function() {
    var emailAddress1 = $("email_address1").value;
    var emailAddress2 = $("email_address2").value;
    var firstName = $("first_name").value;
    var isValid = true;

    // validate the first entry
    if (emailAddress1 === "") { 	
		$("email_address1").nextElementSibling.firstChild.nodeValue = "This field is required.";
		
		
        //$("email_address1_error").firstChild.nodeValue = "This field is required.";
        isValid = false;
    } else {
        $("email_address1").nextElementSibling.firstChild.nodeValue = "";
    } 

    // validate the second entry
    if (emailAddress2 === "") { 		
		$("email_address2").nextElementSibling.firstChild.nodeValue = "This field is required.";
	
	
        //$("email_address2_error").firstChild.nodeValue = "This field is required.";
        isValid = false; 
    } else if (emailAddress1 !== emailAddress2) { 	
		$("email_address2").nextElementSibling.firstChild.nodeValue = "This entry must equal first entry.";
	
	
       // $("email_address2_error").firstChild.nodeValue = "This entry must equal first entry.";
        isValid = false;
    } else {
        $("email_address2").nextElementSibling.firstChild.nodeValue = "";
    }

    // validate the third entry  
    if (firstName === "") {
		
		$("first_name").nextElementSibling.firstChild.nodeValue = "This field is required.";
		
        //$("first_name_error").firstChild.nodeValue = "This field is required.";
        isValid = false;
    } else {
        $("first_name").nextElementSibling.firstChild.nodeValue = "";
    }  

    // submit the form if all entries are valid
    if (isValid) {
        $("email_form").submit(); 
    }
};

window.onload = function() {
    $("join_list").onclick = joinList;
    $("email_address1").focus();
};
