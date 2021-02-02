//Get Key Inputs

var bobby = 0;

function go(event)
{
	var x = event.which|| event.keyCode;
	//console.log(x);
	

		//up
		if(x == 38 || x == 87 )
			SnakeMove("u");
		else if (x == 40 || x == 83 )
			SnakeMove("d");
		else if (x == 37 || x == 65 )
			SnakeMove("l");
		else if (x == 39 || x == 68 )
			SnakeMove("r");	
		else if(x == 32)
			shoot();
		else if(x == 13)
			pause();
	
	
}

function SnakeMove(d)
{
	change(d);
	//console.log("I pressed Something");

}

function mouseMove()
{
	//console.log(window.event.clientX);
}