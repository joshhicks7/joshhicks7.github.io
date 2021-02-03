
ax = ay = 50;
px = py = 50;
xv = yv = 0;
psx = 15, psy = 0;
trail = [];
lx = 0, ly = 0;

tail = 5;
var port = new portal(0,0,0,0);

setInterval(game, 50);
setInterval(setPortal, 5000);
window.onload = function()
{
  setCanvas();

  document.addEventListener("keydown", keyPush);
  psx = canv.width / 25;
  psy = canv.height / 25;
  startPlayer();
  moveFood();
  setPortal();



}

function setCanvas()
{
    canv = document.getElementById("ca");    
    ctx = canv.getContext("2d");
    dpi = window.devicePixelRatio;
    sh = getComputedStyle(canv).getPropertyValue("height").slice(0,-2);
    sw = getComputedStyle(canv).getPropertyValue("width").slice(0,-2);

    canv.setAttribute("width", sw * dpi);
    canv.setAttribute("height", sh * dpi);
}

function game()
{
  
  checkFood();
  checkPortal();
  move();
  drawCanvas();
  drawPlayer();
  drawFood();
  drawPortal();
  writeScore();
  
}

function portal(x, y, nx, ny)
{
  this.x = x;
  this.y = y;
  this.nx = nx;
  this.ny = ny;
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

function adjust()
{
  px = Math.floor(px);
  py = Math.floor(py);

  ax = Math.floor(ax);
  ax = Math.floor(ax);
}

function move()
{

  console.log("PX: " + px + " PY: " + py + " AX: " + ax + "AY: " + ay);
  if(xv != 0 || yv != 0)
  {

    

    while(trail.length > tail)
    {
      trail.shift();
    }



    if(px < 0)
    {
      px = canv.width - psx;
    }

    if(px > canv.width - psy)
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

    trail.push({x:px, y:py});
    px = px + xv;
    py = py + yv;

    lx = xv;
    ly = yv;
  }

}

function checkFood()
{
    if(Math.floor(px) == Math.floor(ax) && Math.floor(py) == Math.floor(ay))
    {
      moveFood();
      tail++;
    }
}

function checkPortal()
{
    if(Math.floor(px) == Math.floor(port.x) && Math.floor(py) == Math.floor(port.y))
    {      
        px = port.nx;
        py = port.ny;
    }
    else if(Math.floor(px) == Math.floor(port.nx) && Math.floor(py) == Math.floor(port.ny))
    {      
        px = port.x;
        py = port.y;
    }
}

function drawCanvas()
{
  ctx.fillStyle = "darkgrey";
  ctx.fillRect(0,0,canv.width, canv.height);
}

function drawPlayer()
{
     im = new Image();
      im.src = "./Files/Images/cat.png"
      ctx.drawImage(im, px, py, psx, psy);

  ctx.fillStyle = "cyan";
  for(var i = 0; i < trail.length; i++)
  {    
      ctx.drawImage(im, trail[i].x, trail[i].y, psx, psy);
  }

}

function setPortal()
{
  port = newPortal();
}

function drawFood()
{
   im = new Image();
   im.src = "./Files/Images/candy.png"
   ctx.drawImage(im, ax, ay, psx, psy);
}

function drawPortal()
{

   im = new Image();
   im.src = "./Files/Images/portal.png"
   ctx.drawImage(im, port.x, port.y, psx, psy);
   ctx.drawImage(im, port.nx, port.ny, psx, psy);
}

function moveFood()
{
  ax = Math.floor(Math.random() * 25) * psx;
  ay = Math.floor(Math.random() * 25) * psy;

}

function newPortal()
{
  return new portal(Math.floor(Math.random() * 25) * psx, Math.floor(Math.random() * 25) * psy,Math.floor(Math.random() * 25) * psx , Math.floor(Math.random() * 25) * psy);
}

function startPlayer()
{
  px = Math.floor(Math.random() * 25) * psx;
  py = Math.floor(Math.random() * 25) * psy;

}

function writeScore()
{
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";  
  ctx.textAlign = "center";
  ctx.fillText(tail, canv.width /2, 100);
}
