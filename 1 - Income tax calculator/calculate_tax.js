"use strict";
var $ = function (id) {
    return document.getElementById(id);
};

var processEntry = function(){
	var income = parseFloat($("income").value);
	if(isNaN(income) || income<0)
	{
		alert("Enter valid income!");
	}
	else
	{
		calculateTax(income);
	}
}
var calculateTax = function(income)
{
	
			var tax;
			if(income>=0 && income<=9225)
			{
				tax = 0.1 * income;
			}
			else if(income>9225 && income<=37450)
			{
				tax = 922.50 + (0.15*(income-9225));
			}
			else if(income>37450 && income<=90750)
			{
				tax = 5156.25 + (0.25*(income-37450));
			}
			else if(income>90750 && income<=189300)
			{
				tax = 18481.25 + (0.28*(income-90750));
			}
			else if(income>189300 && income<=411500)
			{
				tax = 46075.25 + (0.33*(income-189300));
			}
			else if(income>411500 && income<=413200)
			{
				tax = 119401.25 + (0.35*(income-411500));
			}
			else if(income>413200)
			{
				tax = 119996.25 + (0.396*(income-413200));
			}
			$("tax").value = tax;
		
		
}

window.onload = function () {
    $("calculate").onclick = processEntry;
};