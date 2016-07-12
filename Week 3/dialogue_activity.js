function dialog(name)
{
	return function(line) {
		return name + " says \" " + line + "\"" 
	}
}

var Donald = { name: "Donald Duck"};
Donald.speak = dialog("Donald Duck");
console.log(Donald.speak("Hello there"));
