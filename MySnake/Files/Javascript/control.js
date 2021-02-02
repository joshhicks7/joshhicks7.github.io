
ax = ay = 50;
px = py = 50;
xv = yv = 0;
psx = 15, psy = 0;
trail = [];
lx = 0, ly = 0;
setInterval(game, 50);
tail = 5;

window.onload = function()
{
  canv = document.getElementById("ca");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  psx = canv.width / 25;
  psy = canv.height / 25;
  startPlayer();
  moveFood();
}


function game()
{
  move();
  drawCanvas();
  drawPlayer();
  drawFood();
  writeScore();
  
}

function keyPush(e)
{  
  switch(e.keyCode)
  {
      case 37:
        xv = -psx;
        yv = 0;
        break;

      case 38:
        xv = 0;
        yv = -psy;
        break;

      case 39:
        xv = psx;
        yv = 0;
        break;

      case 40:
        xv = 0;
        yv = psy;
        break;

      case 32:
        if(yv == 0 && xv == 0)
        {
            yv = ly;
            xv = lx;
        }
        else
        {
           xv = yv = 0; 
        }
        break;      
        
        var d = "";
        for(var i = 0; i < trail.length; i++)
        {
          d += "(" + trail[i].x + ", " + trail[i].y + ")";
        }
  }
}


function move()
{
  if(xv != 0 || yv != 0)
  {
    trail.push({x:px, y:py});
    px = px + xv;
    py = py + yv;
    

    while(trail.length > tail)
    {
      trail.shift();
    }

    if(px == ax && py == ay)
    {
      moveFood();
      tail++;
    }

    if(px < 0)
    {
      px = canv.width - psx;
    }

    if(px > canv.width - psx)
    {
      px = 0;
    }

    if(py > canv.height - psy)
    {
      py = 0;
    }

    if(py < 0)
    {
      py = canv.height - psy;
    }

    for(var i = 0; i < Math.min(tail, trail.length); i++)
    {
      if(trail[i].x == px && trail[i].y == py)
      {
        tail = i;
        break;
      }
    }

    lx = xv;
    ly = yv;
  }

}

function drawCanvas()
{
  ctx.fillStyle = "green";
  ctx.fillRect(0,0,canv.width, canv.height);
}

function drawPlayer()
{
  ctx.fillStyle = "blue";
  //ctx.ellipsxe(x, y, 10, 10, 0, 0, 6.24, false);

  ctx.fillRect(px, py, psx, psy);
  //ctx.fill();

  ctx.fillStyle = "cyan";
  for(var i = 0; i < trail.length; i++)
  {    
    ctx.fillRect(trail[i].x, trail[i].y, psx, psy);
  }

}

function drawFood()
{
   ctx.fillStyle = "red";
   ctx.fillRect(ax, ay, psx, psy);
}

function moveFood()
{
  ax = Math.floor(Math.random() * 25) * psx;
  ay = Math.floor(Math.random() * 25) * psy;

}

function startPlayer()
{
  px = Math.floor(Math.random() * 25) * psx;
  py = Math.floor(Math.random() * 25) * psy;

}

function writeScore()
{
  ctx.font = "30px Arial";  
  ctx.textAlign = "center";
  ctx.fillText(tail, canv.width /2, 100);
}
