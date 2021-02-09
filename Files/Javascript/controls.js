var f = document.getElementById("frame");

function generate(link)
{
	f.setAttribute("src", link);
}

window.onload = function()
{
	var c = document.getElementById("options").getElementsByTagName("button");
	console.log(c.length);
	for(var i = 0; i < c.length; i++)
	{
		console.log(c[i].getAttribute("onclick"));
		c[i].setAttribute("onclick", c[i].getAttribute("onclick") + ";SetUp(" + i + ")");
	}
	SetUp(0);

}

function SetUp(val)
{

	document.getElementById("Game_Title").innerHTML = games[val].name;
	document.getElementById("Game_Facts").innerHTML = games[val].words;
}