function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}


// True is only passed if the array is being sorted by type. Otherwise, the truth_value will be false.

Automobile.prototype.logMe = function(truth_value)
{
	if (truth_value == true)
	{
		console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
	}

	else if (truth_value == false)
	{
		console.log(this.year + " " + this.make + " " + this.model);
	}
} 

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];


// In this sortArr function, I use a bubble sort algorithm with a do-while loop.
function sortArr(comparator, array ){
    var newArray = array;
    do 
    {
    	var swapped = false;
    	for (var i = 0; i < newArray.length - 1; i++)
    	{
    		if (comparator(newArray[i], newArray[i + 1]))
    		{
    			var temp = newArray[i];
    			newArray[i] = newArray[i + 1];
    			newArray[i + 1] = temp;
    			swapped = true;
    		}
    	}

    } while (swapped == true);

    return newArray;
}




function yearComparator( auto1, auto2){
    if (auto1.year > auto2.year)
    {
    	return true;
    }

    else 
    {
    	return false;
    }
}


// toUpperCase is being called on both make strings so that case isn't considered in the string comparison.

function makeComparator( auto1, auto2)
{
	if (auto1.make.toUpperCase() > auto2.make.toUpperCase())
	{
		return true;
	}

	else 
	{
		return false;
	}
}

/* Originally, I mapped the type values in reverse order, such that Roadster had the greatest
value and Wagon had the least. I quickly realized in my testing that this led to the vehicles
sorted by type to appear in the reverse order. This is because the bubble Sort algorithm moves
the largest values to the beginning of the array. To fix this, I made it so that counterintuitively,
the "greatest" types had the least value. */

function typeComparator( auto1, auto2){

	var differentTypes = {
		"Roadster": 1,
		"Pickup": 2,
		"SUV": 3,
		"Wagon": 4,
	}

	var auto1TypeValue = differentTypes[auto1.type];
	var auto2TypeValue = differentTypes[auto2.type];

	if (auto1TypeValue == undefined)
	{
		auto1TypeValue = 5;
	}

	if (auto2TypeValue == undefined)
	{
		auto2TypeValue = 5;
	}

	if (auto1TypeValue > auto2TypeValue)
	{
		return true;
	}

	else
	{
		return false;
	}
}

function printArray(array, truth_value)
{
	for (var i = 0; i < array.length; i++)
	{
		array[i].logMe(truth_value);
	}
}


// Program output. 

console.log("*****");
console.log("The cars sorted by year are:");

printArray(sortArr(yearComparator, automobiles), false);

console.log("\r\nThe cars sorted by make are:");

printArray(sortArr(makeComparator, automobiles), false);

console.log("\r\nThe cars sorted by type are:");

printArray(sortArr(typeComparator, automobiles), true);

console.log("*****");