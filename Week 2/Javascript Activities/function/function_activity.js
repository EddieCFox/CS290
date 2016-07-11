console.log("Calling function with function hoisting.\r\n")
console.log(SquarePlusThree(10));
console.log(SquarePlusThree(7));

function SquarePlusThree(X)
{
     return ((X * X) + 3);
}

console.log(SquarePlusThree(12));

console.log(SquarePlusTwo(12));
console.log(SquarePlusTwo(9));
var SquarePlusTwo = function(X)
{
	return ((X * X) + 2);
}

console.log("Now calling function assigned to variable, no function hoisting.")
console.log(SquarePlusTwo(10));
console.log(SquarePlusTwo(5));