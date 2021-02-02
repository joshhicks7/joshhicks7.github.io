//Shooting and Enemies
//Shooting and Enemies

function Bullet(_x, _y, d)
{
	this.x = _x;//The x position of the bullet
	this.y = _y;//The y position of the bullet
	this.d = d;//The direction of the bullet
	
}

function Enemy(_x,_y, _speed)
{
	this.x =_x;
	this.y =_y;
	this.speed = _speed;
}
	
var snake = document.getElementById("Snake");	
var enemyCount = 0;
var enemies = [];
var bullets = [];
var enemySpeed = .75;
var bulletSpeed = 5;
const startSize = 35;
var enemySize = startSize;
var speedMultiplier = 1.0375;
var sizeMultiplier = 1.025;
setInterval(spawnEnemy, 1500);


function shoot()
{
	/*
	var bullet = document.createElement("div");
	bullet.id = "Bullet" + bullets.length;
	background.appendChild(bullet);
	bullet.setAttribute('name', "Bullet");
	
	
	bullet.style.left = snake.style.left;
	bullet.style.top = snake.style.top;
	bullets.push(new Bullet(parseInt(snake.style.left), parseInt(snake.style.top), getDir()));
	//console.log(getDir());
	
		switch(getDir())
		{
			case ("u"):
			bullet.style.transform = "rotate(90deg)";
			break;
			case ("d"):
			bullet.style.transform = "rotate(-90deg)";
			break;
			case ("l"):
			bullet.style.transform = "rotate(180deg)";
			break;
			default:
			bullet.style.transform = "rotate(0deg)";
			break;
		}
		*/
	
}

function spawnEnemy()
{	
	if(isPlaying())
	{
		background = document.getElementById("Background");
		var x = background.offsetWidth - 50;
		var y = Math.random() * (Math.floor(background.offsetHeight) - (Math.min(background.offsetHeight/2, enemySize)));
		var enemy = document.createElement("div");
		background.appendChild(enemy);
		enemy.id = "Enemy" + enemyCount;
		enemy.style.height = startSize + "px";
		enemy.setAttribute('name', "Enemy");
		enemies.push(new Enemy(x, y, enemySpeed));
		console.log(parseInt(enemy.style.height));
		enemy.style.left = x + "px";
		enemy.style.top = y + "px";
		//enemy.style.width = enemy.style.height = Math.min(Math.Random() * (startSize * (Math.random() * startSize,Math.min(enemySize, background.offsetHeight/2))) + "px";
		enemy.style.width = enemy.style.height = startSize + Math.random() * (Math.min(background.offsetHeight/2, enemySize) - startSize) + "px";
		
		enemyCount++;
		document.getElementById("EnemyCount").innerHTML = "Enemy Count: " + enemyCount;
		enemySpeed *= speedMultiplier; 
		enemySize *= sizeMultiplier; 
	}

}
	
function EnemyMove()
{
	var snakeX = parseInt(snake.style.left);
	var snakeY = parseInt(snake.style.top);
	
	var enemyList = document.getElementsByName("Enemy");
	
	for(var i = 0; i < enemyCount; i++)
	{		
		var deltaX = enemies[i].x - snakeX;
		var deltaY = enemies[i].y - snakeY;
		var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		var steps = distance/enemies[i].speed;
		
		//console.log ("DeltaY: " + deltaY + "  " + "DeltaY/Steps: " + deltaY/steps );
		//console.log (enemies[i]);
		enemies[i].x -= deltaX/steps;
		enemies[i].y -= deltaY/steps;
		
		enemyList[i].style.left = enemies[i].x + "px";
		enemyList[i].style.top = enemies[i].y + "px";
		if(enemies[i].x <= 0)
		{
			document.getElementById("Enemy" + i).remove();
		}
	}
	
}

function bulletMove()
{
	var b = document.getElementsByName("Bullet");
	
	for(var i = 0; i < bullets.length; i++)
	{
		if(document.getElementById("Bullet" + i) != null)
		{
			switch(bullets[i].d)
			{
				case ("u"):
				bullets[i].y -= bulletSpeed;
				break;
				case ("d"):
				bullets[i].y += bulletSpeed;
				break;
				case ("l"):
				bullets[i].x -= bulletSpeed;
				break;
				case ("r"):
				bullets[i].x += bulletSpeed;
				break;
			}
			b[i].style.left = bullets[i].x + "px";	
			b[i].style.top = bullets[i].y + "px";

			var x = parseInt(b[i].style.left);
			var y = parseInt(b[i].style.top);
			var w = background.offsetWidth;
			var h = background.offsetHeight;

			if( x >= w || x < 0 || y > h || y < 0 )
			{
				document.getElementById("Bullet" + i).remove();
				bullets.splice(i , i + 1);
				break;

			}	
		}
	
		//document.getElementsByName("Enemy")[i].style.left = enemies[i].x + "px";
	}
	
}

function enemyWidth()
{
	return document.getElementsByName("Enemy").offsetWidth;
}

