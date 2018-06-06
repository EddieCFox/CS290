// The table will be rendered in an overarching function that contains all the other functions. 

var renderTable = function()
{
	// Initialize current row and column variables, that will change throughout the process.
	
	var body = document.body; // body variable used for more conveient appending of child elements to the body.

	// Current row and column are used as a sort of coordinate system by both the functions that move the selected cell and mark it.

	var currentRow = 1; 
	var currentColumn = 1;


	// Creates title of table and appends it to the top of the body, before the table is created.

	var tableTitle = document.createElement("div"); 
	tableTitle.style.position = "relative";
	tableTitle.style.left = "25px";
	tableTitle.textContent = "Markable Cell Table with Labels";
	
	body.appendChild(tableTitle);

	function initializeTable()
	{
		
		var table = document.createElement('table');
		var tableBody = document.createElement('tbody');

		table.style.border = "1px solid black"; // Add a solid black border to the table.
		table.style.position = "relative";
		table.style.top = "10px";

		// Creating the header row.

		var headerRow = document.createElement('tr');

		for (var i = 0; i < 4; i++)
		{
			var headerCell = document.createElement('th');
			headerCell.textContent= "Header " + (i + 1);
			headerCell.style.border = "1px solid black";
			headerRow.appendChild(headerCell);
		}

		table.appendChild(headerRow); // Add header Row to the table.

		for (var j = 0; j < 3; j++) // creating 3 body rows.
		{
			var bodyRow = document.createElement('tr');

			for (var k = 0; k < 4; k++) // 4 cells per row.
			{
				var bodyCell = document.createElement('td'); // creates table data cells for the body cells.
				var columnByRow = (k + 1) + ", " + (j + 1); // Column, Row, used for both text content of each cell, and the id.
				bodyCell.textContent = columnByRow;
				bodyCell.style.border = "1px solid black";

				if (j == 0 && k == 0)
				{
					bodyCell.style.border = "5px solid black";
				}

				bodyCell.id = columnByRow;
				bodyRow.appendChild(bodyCell); // Appends cell to the body row.
			}

			tableBody.appendChild(bodyRow);
		}

		table.appendChild(tableBody);
		body.appendChild(table);
	}

	

	function addButtons()
	{
		// buttonLabels contains the names of every button.

		var buttonLabels = ["Up", "Down", "Left", "Right", "Mark Cell"]; 

		// for loop creates, appends, and positions every button, and adds clickability.

		for (var i = 0; i < 5; i++) // From 0 to 5 because there are 5 buttons.
		{
			var button = document.createElement('button'); 

			// Assigns the respective label string as the text content of the button element. In retrospect,
			// I probably could have used textContent, but I'm too lazy to change it now.
			button.appendChild(document.createTextNode(buttonLabels[i])); 

			// Move buttons 30 pixels down from the bottom of the table so they aren't touching
			button.style.position = "relative";
			button.style.top = "30px"; 

			// target on the event object combined with inner text allows me to reference the specific button that is clicked.

			button.addEventListener("click", function(event)
			{
				if (event.target.innerText == "Mark Cell") // Will mark the cell if the "Mark Cell" button is clicked
				{
					markCell();
				}

				else
				{
					move(event.target.innerText); // If the "Mark Cell" button isn't clicked, it must be a direction.
				}
			})

			body.appendChild(button);
		}
	}

	function markCell()
	{
		// cellId and cell work together to target the specific cell the cursor is on. 
		// This will be the cell corresponding to the current row and current column variables.
		// When creating the table, we set the id to be "1,1" for row 1, column 1, for example,
		// so we recreate that here.

		var cellId = currentColumn + ", " + currentRow; 
		var cell = document.getElementById(cellId);
		cell.style.backgroundColor = "yellow"; // javascript version of changing background color.
	}

	function move(direction)
	{
		// current row is transformed from thick border to normal border. This is so that only one cell
		// has a thick border at a time. 

		var cellId = currentColumn + ", " + currentRow;
		var cell = document.getElementById(cellId);
		cell.style.border = "1px solid black";

		// This function is passed the text field of the button that is clicked, and it covers all four directions.
		// Each direction has an additional nested conditional statement for border and bounds checking purposes.

		if (direction == "Up")
		{
			if (currentRow != 1)
			{
				currentRow--;
			}
		}

		if (direction == "Down")
		{
			if (currentRow != 3)
			{
				currentRow++;
			}
		}

		if (direction == "Left")
		{
			if (currentColumn != 1)
			{
				currentColumn--;
			}
		}

		if (direction == "Right")
		{
			if (currentColumn != 4)
			{
				currentColumn++;
			}
		}

		// After adjusting current row and column, we make the new cursor cell thick bordered.

		var cellId = currentColumn + ", " + currentRow;
		var cell = document.getElementById(cellId);
		cell.style.border = "5px solid black";

	}

	// Call the functions that create the cells.
	
	initializeTable();
	addButtons();
}

renderTable();