document.addEventListener('DOMContentLoaded', activateButton);

function activateButton()
{
	document.getElementById("postButton").addEventListener("click", function(event)
	{
		var req = new XMLHttpRequest();
		var URL = "http://httpbin.org/post";
		// Initializing payload object with null properties
		var payload = {userName: null, email: null, password: null}; 

		payload.userName = document.getElementById("username").value;
		payload.email = document.getElementById("e-mail").value;
		payload.password = document.getElementById("password").value;
	
		req.open('POST', URL, true); // opening asynchronous POST request to the url given in the assignment.
		req.setRequestHeader('Content-Type', 'application/json'); // Setting content type request header to application/json as specified in assignment requirements.

		req.addEventListener("load", function()
		{
			if (req.status >= 200 && req.status < 400)
			{
				var response = JSON.parse(JSON.parse(req.responseText).data);
				console.log(response);

				document.getElementById("lie_reveal").textContent = "I LIED!";
				document.getElementById("evil_rant").textContent = "You fool! I have stolen all of your information!";
				document.getElementById("post_info").textContent = "Here is the information I have sent to my secret website, and there's nothing you can do about it!";
				document.getElementById("post_userName").textContent = "Username: " + response.userName;
				document.getElementById("post_Email").textContent = "E-Mail: " + response.email;
				document.getElementById("post_Password").textContent = "Password: " + response.password;
			}

			else
			{
				var errorMessage = "Error: " + response.statusText;
				console.log(errorMessage);
			}
		});

		req.send(JSON.stringify(payload));
		event.preventDefault();
	});
}