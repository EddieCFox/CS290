function deepEqual(X, Y) 
{

if (X === Y)
{
	return true;
}

if (X == null || Y == null)
{
	return false;
}

if (typeof(X) != "object" || typeof(Y) != "object")
{
	return false;
}
   
var xProperties = 0;
var yProperties = 0;

for (var property in X)
{
	xProperties += 1;
}

for (var property in Y)
{
	yProperties += 1;
	if (!(property in X) || !deepEqual(X[property], Y[property]))
	{
		return false;
	}
}

if (xProperties == yProperties)
{
	return true;
}

else
{
	return false;
}

}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// -> true
console.log(deepEqual(obj, {here: 1, object: 2}));
// -> false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// -> true