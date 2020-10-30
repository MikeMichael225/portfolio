var input = document.querySelector('input[type="text"]');
var result = document.querySelector('.result');

var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var numbers = "1234567890";
var special = "#!~()_:;<>[]";

var characterNumber = 15;

result.innerHTML="&nbsp";

var copy = (a) => {
	if(a) {
		navigator.clipboard.writeText(a);
		result.innerHTML="Copied!";
	}
}

var generateNumber = (a) => {
	return Math.floor(Math.random()*((a.length)-0)+0);
}

var generatePassword = () => {
	let combinedString = "";
	
	if(document.querySelector('.letters').checked) {
		combinedString+=letters;
	}
	if(document.querySelector('.numbers').checked) {
		combinedString+=numbers;
	}
	if(document.querySelector('.special').checked) {
		combinedString+=special;
	}
	
	if(combinedString) {
    	input.value="";
    	for(let x = 0; x<characterNumber; x++) {
    		input.value+=combinedString[generateNumber(combinedString)];
    	}
    	
    	result.innerHTML = "Generated!"
	} else {
		input.value = "There is no password! :D"
	}
	return 0;
}