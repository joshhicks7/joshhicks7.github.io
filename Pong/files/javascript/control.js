

vx = vy = 0;

bx = by = 50;
bvx = 5;
bvy = 1;

pWidth = 20;
pHeight = 50;
ball = null;
p1 = null;
p2 = null;
bWidth = 20;
inerval = setInterval(game, 20);

width = 0, height = 0;

window.onload = function()
{
    canv = document.getElementById("canv");    
    width = canv.style.width;
    height = canv.style.height;	

    createPlayers();
    createBall();
}

function ball(x, y, vx, vy)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;	
}

function game()
{
	bx += bvx;
	by += bvy;

	
	checkCollision();
	//drawCanvas();
	 moveBall();
	//drawPlayers();

}
function drawCanvas()
{
  ctx.fillStyle = "darkgrey";
  ctx.fillRect(0,0,canv.width, canv.height);
}

function createBall()
{
	p = canv.appendChild(document.createElement('div'));
	p.setAttribute('class','ball');
	p.setAttribute('id','ball');
	p.style.left = bx + 'px';
	p.style.top = by + 'px';
	ball = p;
}

function createPlayers()
{
	p1 = new player(20, 250, 0, 0, 'black');
	p2 = new player(400, 250, 0, 0, 'white');

	p = canv.appendChild(document.createElement('div'));
	p.setAttribute('class','player');
	p.setAttribute('id','p1');
	p.style.left = p1.x + 'px';
	p.style.top = p1.y + 'px';

	p = canv.appendChild(document.createElement('div'));
	p.setAttribute('class','player');
	p.setAttribute('id','p2');
	p.style.left = p2.x + 'px';
	p.style.top = p2.y + 'px';
}

function moveBall()
{
	bx += bvx;
	by += bvy;
	ball.style.left = bx + 'px';
	ball.style.top = by + 'px';
}

function checkCollision()
{
	if(bx > width - bWidth || bx < bWidth)
	{
		bvx = -bvx;
	}

	if(by > height - bWidth || by < 0)
	{
		bvy = - bvy;
	}
	
	/*
	if(by > p1y && by < p1y + pHeight)
	{
		if(bx <= bp1x + (bWidth + pWidth)/2)
		{
				//bvx = -bvx;
		}
	}
	*/
}

function player(x, y, vx, vy, col)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.col = col;

}