//This is the controller for the game

var wordList;

var playing = false;
var speed = 1.0;
var score = 0;
var inputWord = "";
var activeWords = new Array(0);
var theme = "";
var hasLost = false;
setInterval(createEnemy, 2500);
setInterval(moveEnemy, 10);
setInterval(check,10);

function createEnemy()
{
	if(playing)
	{
		var enemy = document.createElement("div");
		document.getElementById("Game-Container").append(enemy);
		enemy.style.top = "0px";
		enemy.style.left = Math.round(Math.random() * (enemy.offsetWidth - 150)) + "px";
		console.log(activeWords);
		var word = getWord();
		activeWords.push(word);
		enemy.id = word;
		enemy.setAttribute("class","Enemy");
		enemy.innerHTML = word;
		speed += .05;
	}


}

function startGame(something)
{
	wordList = getWords(something);
	document.getElementById("Game-Selection").style.display = "none";
	document.getElementById("Game-Container").style.display = "block";
	playing = true;
	theme = something;
}

function getWord()
{
	var word = wordList[Math.round(Math.random() * wordList.length - 1)].toUpperCase();
	for(var i = 0; i < activeWords.length; i++)
	{
		if(word == activeWords[i])
		{
			word = getWord();
		}
	}


	return word;
}

function moveEnemy()
{
	if(playing)
	{
		var enemies = document.getElementsByClassName("Enemy");
		for(var i = 0; i < enemies.length; i++)
		{
			enemies[i].style.top = parseInt(enemies[i].style.top) + speed + "px";
		}
	}

}

function check()
{
	if(score > localStorage.getItem("WordEscape" + theme + ".HighScore"))
	{
		localStorage.setItem("WordEscape" + theme + ".HighScore", score)
	}

	document.getElementById("Score-Container").innerHTML = theme.toUpperCase()  + " HighScore: " + localStorage.getItem("WordEscape" + theme + ".HighScore") == 0?"0": localStorage.getItem("WordEscape" + theme + ".HighScore") +  "&nbsp;  &nbsp; &nbsp;  &nbsp;  " + "Score: " + score;
	document.getElementById("Input-Container").innerHTML = theme.toUpperCase() + ":      " +inputWord;

	if(inputWord[0] == " " || inputWord[0] == "\n")
	{
		inputWord = inputWord.substr(1);
	}

	if(inputWord == activeWords[0])
	{
		Correct();

	}

	if(document.getElementsByClassName("Enemy").length > 0 && parseInt(document.getElementById(activeWords[0]).style.top + 250) >=  parseInt(document.getElementById("Game-Container").offsetHeight))
	{
		if(!hasLost)
		{
			hasLost = true;
			alert("You Loose");
			location.reload();
		}

		
	}
}

function checkInput(event)
{
	var e = event.which|| event.keyCode;

	switch(e)
	{
		//backspace
		case 8:
		inputWord = inputWord.slice(0,-1);
		break;

		case 46:
		inputWord = "";
		break;

		case 189:
		inputWord += "-";
		break;

		default:
		inputWord += String.fromCharCode(e);
		break;
	}
	console.log(String.fromCharCode(e) + "  " + e);
	

	
	console.log(inputWord);
	document.getElementById("Input-Container").innerHTML = inputWord;

	if(inputWord == activeWords[0])
	{
		Correct();

	}

}

function Correct()
{
		//createEnemy();
		var bye = document.getElementById(activeWords[0]);
		bye.parentNode.removeChild(bye);
		activeWords.shift();
		inputWord = "";
		
		document.getElementById("Input-Container").innerHTML = inputWord;
		score++;

}