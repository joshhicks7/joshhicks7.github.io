
tRoot = null;
root = null;
numRows = 0;
nodes = [];

multNodes = [];

window.onload = function()
{
	document.addEventListener("keydown", keydown);
};

var width = 1900;


async function display(row, node, pos, parent)
{
	if(node == null)
	{
		return;
	}

 	var d = document.querySelector('#nodeHolder').appendChild(document.createElement('button'));
 	d.setAttribute('class', 'node');
 	d.setAttribute('title', node.value);
 	d.setAttribute('onclick', 'remake(' + node.value + ')');
 	//d.setAttribute('onclick', "alert('gotcha')");

 	//height = (width / 12) / ((row + 1));
 	//height = width / (numRows * numRows);
 	height = 30 - row;

 	d.style.top = 100 + 30 * 2 * row + 'px';
 	d.style.height = 30 + 'px';//(width / 12)  - (100 * row) + 'px';


	d.id = node.value;
 	if(parent != null)
 	{
 		wid = parseInt(parent.style.width) / 2;
 		d.style.width =  wid + 'px';


 		d.style.left = (parseInt(parent.style.left) + wid/2) + pos * wid / 2 + 'px';
 		if(wid > 10)
 		{
 			d.innerHTML = node.value;
 		}
 	}
 	else
 	{
 		d.innerHTML = node.value;
 		d.style.left = 0 + 'px';
 		d.style.width = width + 'px';

 	}

 	await new Promise(r => setTimeout(r, 500));
 	display(row + 1, node.left, -1 , d);
 	await new Promise(r => setTimeout(r, 500));
	display(row + 1, node.right, 1, d);
}

function remake(key)
{
	clear();
	tRoot = Search(key);
	display(0, tRoot, 0, null);
	if(nodes.length == 0)
	{
		nodes[0] = root;
	}
	nodes.push(tRoot);

}

function countRows(node, row)
{
	if(!node)
	{
		console.log('no node');
		return 0;
	}
	else if(node.left == null && node.right == null)
	{
		return 1;
	}

	r1 = countRows(node.left, row + 1);
	r2 = countRows(node.right, row + 1);
	return 1 + Math.max(r1, r2);
}

function drawLine(p1l, p1t, p2l, p2t)
{

	var dx = (p2l) - (p1l);
	var dy = (p2t) - (p1t);
	var steps = Math.sqrt((dx * dx) + (dy * dy));

	var d = document.querySelector('#nodeHolder').appendChild(document.createElement('div'));
	d.setAttribute('class', 'line');

	d.style.width = steps + 'px';
	d.style.left = (Math.min(p1l, p2l)) + 'px';
	d.style.top = (p1t) + 'px';

	//d.style.transform = 'rotate(10.5deg)';
	var ang = 'rotate(' + (Math.asin(dy / dx)) + 'rad)';
	//console.log(ang);
	d.style.transform = ang;

}

function scewRight()
{
	clear();
	noRoot();

	for(var i = 0; i < 10; i++)
	{
		TreeAdd(i);
	}

	display(0, root, 0, null);
}

function keydown(key)
{

	if(key.keyCode == 27)
	{
		console.log(nodes);
		if(nodes.length > 1)
		{
			clear();
			nodes.pop();
			display(0, nodes[nodes.length - 1], 0, null);

		}
	}
}

function scewLeft()
{
	clear();
	noRoot();
	for(var i = 10; i > 0; i--)
	{
		TreeAdd(i);
	}

	display(0, root, 0, null);
}

function summation(num)
{
	var n = num;
	for(var i = 0; i < num; i++)
	{
		n += i;
	}
	return n;
}

function add(num, max)
{
	clear();
	noRoot();
	//console.log(num + '_' + max);
	if(max < num) max = num;
	for(var i = 0; i < num; i++)
	{
		TreeAdd(Math.floor(Math.random() * max));
	}

	numRows = countRows(root, 0);
	console.log(root);
	console.log(numRows);
	display(0,root, 0, null);
}



function TreeAdd(key)
{
	temp = new myNode(key, null, null);

	if(Search(key))
	{
		TreeAdd(key + 1);
		return;
	}

	if(!root)
	{
		//console.log('no root');
		root = temp;
		return;
	}

	node = root;

	do
	{

		parent = node;

		if(temp.value > node.value)
		{
			node = parent.right;

			if(!node)
			{
				parent.right = temp;
				return;
			}
		}
		else if(temp.value < node.value)
		{
			node = parent.left;

			if(!node)
			{
				parent.left = temp;
				return;
			}
		}
		else
		{
			return;
		}


	}while(node);

}

function Search(key)
{
	node = root;

	while(node != null)
	{
		if(key < node.value)
		{
			node = node.left;
		}
		else if(key > node.value)
		{
			node = node.right;
		}
		else
		{
			return node;
		}
	}

	return null;
}

function count(node)
{
	if(node == null)
	{
		return 0;
	}
	else
	{
		var num = 1;
		num += count(node.left);
		num += count(node.right);
		return num;
	}
}

function clear()
{
	document.getElementById('nodeHolder').innerHTML = '';

}

function noRoot()
{
	root = null;
}

function setUpNumbers(max)
{
	var d = document.querySelectorAll('.node');
	//console.log(d.length);
	var ar = [];

	for(var i = 0; i < d.length; i++)
	{
		var p = randomNum(max, ar);
		ar.push(p);
		d[i].innerHTML = p + ' ' + d[i].innerHTML;
		//console.log('going');
		d = document.querySelectorAll('.node');
	}
}

function randomNum(max, ar)
{
	if(max < ar.length)max = ar.length + 1;
	rand = 0;
	do
	{
		rand = Math.floor(Math.random() * max);

	}while(ar.includes(rand));

	return rand;
}
