"use strict";
var $ = function(id) { 
	return document.getElementById(id); 
};


var clearTextBoxes = function() {	
    $("degrees_entered").value = "";
    $("degrees_computed").value = "";
	
};

var convertTemp = function()	{
	var temp = $("degrees_entered").value;
	if(isNaN(temp) == true)
	{
		alert("Enter numeric value only!");
	}
	else
	{
		
		if($("to_celsius").checked)
		{
			var cel = (temp-32)*5/9;
			$("degrees_computed").value = cel;
		}
		else if($("to_fahrenheit").checked)
		{
			var fah = (temp*9)/5 + 32;
			$("degrees_computed").value = fah;
		}
	}
}

var toCelsius = function()	{
	clearTextBoxes();
	$("degree_label_1").firstChild.nodeValue = "Enter F degrees:";
	$("degree_label_2").firstChild.nodeValue = "Degrees Celsius:";

}

var toFahrenheit = function()	{
	clearTextBoxes();
	$("degree_label_1").firstChild.nodeValue = "Enter C degrees:";
	$("degree_label_2").firstChild.nodeValue = "Degrees Fahrenheit:";
	
}
window.onload = function() {
    $("convert").onclick = convertTemp;
    $("to_celsius").onclick = toCelsius;
    $("to_fahrenheit").onclick = toFahrenheit;
	$("degrees_entered").focus();
};