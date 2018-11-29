var $ = function(id) {
	return document.getElementById(id);
}

function getHTTPObject() {
    var xhr = false;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                xhr = false;
            }
        }
    }
    return xhr;
}

var displayWeather = function(ch) {
    var request = getHTTPObject();
	var city = $('city').value;
    if (request) {
        request.onreadystatechange = function () {
            parseResponse(request, ch);		
        };
        request.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&mode=xml&units=metric&APPID=0a9a9c35b06e14e857c2f509a5c6e0f8", true);
        request.send();
    }
}

function parseResponse(request, ch) {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 304) {
        	
        	var data = request.responseXML;

        	var tag = function(id) {
				return data.getElementsByTagName(id);
			}

			temperature = tag("temperature");
			//$("temp").innerHTML = "Current temperature "+data.getElementsByTagName("temperature")[0].getAttribute("value")+"<br>"+data.getElementsByTagName("clouds")[0].getAttribute("value")+"<br>Humidity "+data.getElementsByTagName("humidity")[0].getAttribute("value")+"%";
			var date = [];
			var time = [];
			var mintemp = [];
			var maxtemp = [];
			var temp = [];
			var humidity = [];
			var wind = [];
			var clouds = [];

			var eight = function(n) {
							for(var i=n; i<n+9; i++)
							{
								//separating date and time from the xml. And changing the date format.
								var datetime = tag("time")[i+1].getAttribute('from');
								var d = "";
								date[i] = d.concat(datetime.substr(8, 2), datetime.substr(4, 3), "-", datetime.substr(0, 4));
								time[i] = datetime.slice(11, 16);

								mintemp[i] = tag('temperature')[i+1].getAttribute('min')+"*C";
								maxtemp[i] = tag('temperature')[i+1].getAttribute('max')+"*C";
								temp[i] = parseFloat(tag('temperature')[i+1].getAttribute('value'));

								humidity[i] = tag('humidity')[i+1].getAttribute('value')+"%";
								wind[i] = tag('windSpeed')[i+1].getAttribute('mps')+" mps";
								clouds[i] = tag('clouds')[i+1].getAttribute('value');
							}
						}

			switch(ch)
			{
			case 1: 	$("table").style.visibility="visible";
						var sunrise = tag("sun")[0].getAttribute("rise");
						sunrise = sunrise.slice(11, 16);
						var sunset = tag("sun")[0].getAttribute("set");
						sunset = sunset.slice(11, 16);

						$("td11").innerHTML = tag('name')[0].firstChild.nodeValue;
						$("td12").innerHTML = "Sunrise "+sunrise;
						$("td21").innerHTML = tag("clouds")[0].getAttribute("value");
						$("td22").innerHTML = "Sunset "+sunset;
						$("td31").innerHTML = tag("temperature")[0].getAttribute("value")+"*C";
						$("td32").innerHTML = "<img src='humidity.png' alt='Humidity' height='42' width='42'>";
						$("td33").innerHTML = tag("humidity")[0].getAttribute("value")+"%";
						$("td42").innerHTML = "<img src='wind.png' alt='Wind' height='42' width='42'>";
						$("td43").innerHTML = tag('windSpeed')[0].getAttribute('mps')+" mps";
						// $("temp").innerHTML = "tag('name')[0].firstChild.nodeValue"+tag("temperature")[0].getAttribute("value")+
						// 	"<br>"+tag("clouds")[0].getAttribute("value")+
						// 	"<br>Humidity "+tag("humidity")[0].getAttribute("value")+"%"+
						// 	"<br>Sunrise "+sunrise+" Sunset "+sunset;					
						
						eight(0);
						graph(date, time, temp, mintemp, maxtemp, 0);
						drawTable(date, time, mintemp, maxtemp, humidity, wind, clouds, 0);
						$("next").style.visibility="visible";

						break;
			case 2: 	var val = $('next').innerHTML;
						if(val==='Next 24 hours')
						{
							$('next').innerHTML = 'Previous 24 hours';
							eight(9);
							graph(date, time, temp, mintemp, maxtemp, 9);
							drawTable(date, time, mintemp, maxtemp, humidity, wind, clouds, 9);
						}
						else 
						{
							$('next').innerHTML = 'Next 24 hours';
							eight(0);
							graph(date, time, temp, mintemp, maxtemp, 0);
							drawTable(date, time, mintemp, maxtemp, humidity, wind, clouds, 0);
						}
						
						break;
			}
        }
	}
}


var graph = function(date, time, temp, mintemp, maxtemp, n) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Time');  
    data.addColumn('number', 'Avg Temperature');
  	for(var i=n; i<n+9; i++) {
        data.addRows([  [ time[i]+"\n"+date[i], temp[i]   ]
       	]);
  	}
    // Set chart options
    var options = {
       chart: {title: 'Average temperature for next 24 hours'},  
       hAxis: {maxTextLines: 2},
       'width':850,
       'height':400      
    };

    // Instantiate and draw the chart.
    var chart = new google.charts.Line(document.getElementById('container'));
    chart.draw(data, options);
}


function drawTable(date, time, mintemp, maxtemp, humidity, wind, clouds, n) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('string', 'Time');
    data.addColumn('string', 'Minimum Temp');
    data.addColumn('string', 'Maximum Temp');
    data.addColumn('string', 'Humidity');
    data.addColumn('string', 'Wind speed');
    data.addColumn('string', 'Clouds');

    for(var i=n; i<n+9; i++) {
	    data.addRows([
	      [ date[i], time[i], mintemp[i], maxtemp[i], humidity[i], wind[i], clouds[i] ]
	   	]);
	}

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {width: '60%', height: '100%'});
}