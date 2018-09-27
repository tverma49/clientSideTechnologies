"use strict";
var $ = function (id) {
    return document.getElementById(id);
};

var calculateTax = function()
{
	var income = parseFloat($("income").value);
		if(isNaN(income) || income<0)
		{
			alert("Enter valid income!");
		}
		else
		{
			var tax;
			if(income>=0 && income<=9225)
			{
				tax = 0.1 * income;
			}
			else if(income>9225 && income<=37450)
			{
				tax = 922.50 + (0.15*income);
			}
			$("tax").value = tax;
		}
		
}

window.onload = function () {
    $("calculate").onclick = calculateTax;
};