document.addEventListener('DOMContentLoaded', activateButton);

function activateButton()
{
	// activating weather button

	document.getElementById("weather_button").addEventListener("click", function(event)
	{
		var req = new XMLHttpRequest(); // Generate new request

		// Basic information

		var baseURL = "http://api.openweathermap.org/data/2.5/weather?";
		var apiKey = "&appid=39b21031a3c76c02e71e1937914dba8e";

		var zipInput = document.getElementById("zip_input").value;
		var cityInput = document.getElementById("city_input").value;

		var addedToURL = "";

		// Take city input unless city is empty.

		if (zipInput != "") // If there is a zip input, but not a city input, adjust URL for zip input.
		{
			addedToURL = "zip=" + zipInput;
		}

		else if (cityInput != "") // If there is no zip input, and a city input, adjust URL for city input
		{
			addedToURL = "q=" + cityInput;
		}

		var finalURL = baseURL + addedToURL + apiKey + "&units=imperial"; // creates the final URL that will be sent to the server.

		
		req.open('GET', finalURL, true);
		req.addEventListener("load", function()
		{
			if (req.status >= 200 && req.status < 400)
			{
				var response = JSON.parse(req.responseText);
				console.log(response);
				document.getElementById("weather_annoucnement").textContent = "Weather below:";
				document.getElementById("location").textContent = "Location: " + response.name;
				document.getElementById("weather_description").textContent = "Description: " + response.weather[0].description;
				document.getElementById("current_temperature").textContent = "Current Temperature: " + response.main.temp + " farenheit";
				document.getElementById("pressure").textContent = "Pressure: " + response.main.pressure + " hectopascals";
				document.getElementById("humidity").textContent = "Humidity: " + response.main.humidity + "%";
				document.getElementById("wind_speed").textContent = "Wind Speed: " + response.wind.speed + " miles per hour";
			}

			else
			{
				var errorMessage = "Error: " + response.statusText;
				console.log(errorMessage);
			}
		});

		req.send(finalURL);
		event.preventDefault();
	});
}