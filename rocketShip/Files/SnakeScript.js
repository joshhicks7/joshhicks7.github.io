//Snake Code

		var container = document.getElementById("SnakeContainer");
		var snake = document.getElementById("Snake");
		var Score = document.getElementById("Score");
		var HighScore = document.getElementById("HighScore");
		var width = document.getElementById("Background").offsetWidth;
		var height = document.getElementById("Background").offsetHeight;
		var background = document.getElementById("Background");
		var highName = localStorage.getItem("highName");
		var score = 0;
		var name = "";
		var highScore = 0.0;
		var deltaTime = 10;
		var deltaPos = 3.5;
		var time = 0.0;
		var resetTime = 10;
		var dir = "r";
		var refreshRate = 5;
		var playing = true;
		var lost = false;
		var paused = true;
	
		var endMessage = "";
		
		setInterval(game, refreshRate);
		setInterval(changeTime, refreshRate);

		var posX = 20, posY = 20;
		
		function setUp()
		{
			checkHighScore();
			turnPlayer(dir);
		}
		
		function isPlaying()
		{
			if(paused)
			{
				return false;
			}
			else
			{
				return playing;
			}
			
		}
		
		function game()
		{
			if(!paused)
			{
				
				document.getElementById("paused").style.visibility = "hidden";
				if(playing)
				{
					move();
					EnemyMove();
					bulletMove();
					checkCollision();
					settingHighScore();
					turnPlayer(dir);
				}
			}
			else
			{
				document.getElementById("paused").style.visibility = "visible";
			}

		}
		
		function pause()
		{
			paused = !paused;
		}
		
		function change(d)
		{
			dir = d;
		}
		
		function move()
		{				
			adjust();
			
			
			switch(dir)
			{
				case "u":
					//if(posY >= 15)
					{
						posY -= deltaPos;
						snake.style.top = posY + "px";
					}

					break;
				case "d":
					//if(posY < height - (15 + snake.offsetHeight))
					{
						posY += deltaPos;
						snake.style.top = posY + "px";
					}

					break;
				case "l":
					//if(posX > 15)
					{
						posX -= deltaPos;
						snake.style.left = posX + "px";
					}

					break;
				case "r":
					//if(posX < width - (15 + snake.offsetWidth))
					{
						posX += deltaPos;
						snake.style.left = posX + "px";
					}
					break;
			}
			
					
			
		}

		function moveFood()
		{
			
			foodX = Math.random() * width;
			foodY = Math.random() * height;
			f.style.left = foodX + "px";
			f.style.top = foodY + "px";
			
		}
		
		function adjust()
		{
			width = document.getElementById("Background").offsetWidth;
			height = document.getElementById("Background").offsetHeight;
		}
		
		function checkCollision()
		{
			var ens = document.getElementsByName("Enemy");
			for(var i = 0; i < ens.length; i++)
			{
				var x = ens[i].style.left;
				var y = ens[i].style.top;
				
				
				if(parseInt(x) > posX)
				{
					if(parseInt(y) > posY)
					{
						if( Math.abs(parseInt(x) - posX) < (snake.offsetWidth) &&  Math.abs(parseInt(y)- posY) < snake.offsetHeight)
						{
							endGame("bottom-Right");
						}
					}
					else
					{
						if( Math.abs(parseInt(x) - posX) < (snake.offsetWidth) &&  Math.abs(parseInt(y)- posY) < ens[i].offsetHeight)
						{
							endGame("top-Right");
						}
					}
					
				}
				else
				{
					if(parseInt(y) > posY)
					{
						if( Math.abs(parseInt(x) - posX) < ens[i].offsetWidth &&  Math.abs(parseInt(y)- posY) < snake.offsetHeight)
						{
							endGame("bottom-Left");
						}
					}
					else
					{
						if( Math.abs(parseInt(x) - posX) < ens[i].offsetWidth &&  Math.abs(parseInt(y)- posY) <ens[i].offsetHeight )
						{
							endGame("top-left");
						}
					}
				}
				
				// Base Collision Equation
				/*
				if( Math.abs(parseInt(x) + ens[i].offsetWidth/2 - posX) < (snake.offsetWidth/2 + ens[i].offsetWidth/2) &&  Math.abs(parseInt(y) + ens[i].offsetHeight/2 - posY) < snake.offsetHeight/2 + ens[i].offsetHeight/2)
				{
					endGame("enemy");
				}
				*/
			}
			
			
			if(posY < 1 || posX < 1 || posY > height - snake.offsetHeight || posX > width - snake.offsetWidth)
			{
				endGame("wall");
			}
			
			
		}
		
		function changeTime()
		{
			if(!paused && playing)
			{
				time += refreshRate/1000;
				Score.innerHTML = "Score: " + time.toPrecision(4);
				HighScore.innerHTML = "HighScore: " + (score > localStorage.getItem("highscore") ? "?": localStorage.getItem("highName")) + " - " + highScore;
				
			}

		}
		
		function checkHighScore()
		{
			highScore = localStorage.getItem("highscore") == null ?0:localStorage.getItem("highscore");
		}
		
		function settingHighScore()
		{
			
			highScore = Math.max(time.toPrecision(4), highScore);
			
		}
		
		function endGame(m)
		{
			playing = false;
			turnPlayer("e");
			
			
			switch(m)
			{

				case ("wall"):
				endMessage = "Congratulations!!!! You Hit a Wall";
				break;
				default:
				endMessage = "You Hit a Bad Guy";
				break;
			}
			
			name = prompt("Please Enter your name: ", name);
				
			if(highScore > localStorage.getItem("highscore"))
			{
				endMessage += "\n WOOOOOOHOOOOOOOO CONGRATULATIONS " + name.toUpperCase() + " ON THE NEW HIGH SCORE!!!!!";
				localStorage.setItem("highscore", highScore)
				localStorage.setItem("highName", name);
			}
			else
			{
				endMessage += "\n Sorry " + name + ", but dude you suck.";
			}
		
			alert(endMessage);
			location.reload();
		}
		
		function getDir()
		{
			return dir;
		}
		
		function turnPlayer(d)
		{
			//console.log("Im changin this image");
			var destination = "url('Images/rocket/" + d + ".png')";
			snake.style.backgroundImage = destination;

		}