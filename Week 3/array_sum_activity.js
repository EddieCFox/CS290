
function sumArray(list) {
	
	var sum = 0;
	list.forEach(function(number){
		sum += number;
	})
	
	return sum;
}

console.log(sumArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));