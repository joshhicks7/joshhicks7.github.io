
var amount = 0;


function SetUp()
{
	
	console.log(getConversion('ft',[50,'in'],[50,'mm'],[50,'ft'],[50,'cm']));

	var inputs = document.getElementsByClassName("valSelect");
	for(var i = 0; i < inputs.length; i++)
	{
		var vals = getAllConversions();

		for(item of vals)
		{
			var op = document.createElement("option");
			op.value = item;
			op.innerHTML = item;
			inputs[i].appendChild(op);
		}
		inputs[i].value = base;
	}
}

function cubConCalc(id)
{	
	var ele = document.getElementById(id);
	allInputs = ele.querySelectorAll('.unit_Input');
	console.log(allInputs);
	var args = [];

	for (var i = 0; i < allInputs.length; i++) 
	{			
		console.log(allInputs[i]);
		args.push(InputToArray(allInputs[i]));
	} 
	console.log(args);
}

function oneMore()
{
	var table = document.getElementById("table");
	//var ele = document.getElementById("cubicConverter").content.firstElementChild.cloneNode(true);	
	
	var ele = table.appendChild(document.createElement("tr"));		
	ele.setAttribute("id","con" + amount);
	ele.setAttribute("class", "con");

	let ar = ['x','y','z'];
	console.log(ar.length);
	for(var i = 0; i < ar.length; i++)
	{
		var t = ele.appendChild(document.getElementById('input_Template').content.firstElementChild.cloneNode(true));
		t.id = amount + "f" + ar[i];
		if(i < ar.length - 1)
		{
			ele.appendChild((document.createTextNode('x')));
		}
		else
		{
			b = ele.appendChild(document.createElement('button'));
			b.innerHTML = "=";
			b.setAttribute("onclick", "cubConCalc('" + ele.id + "')");
			t = ele.appendChild(document.getElementById('input_Template').content.firstElementChild.cloneNode(true));
			t.querySelector('input').setAttribute('readonly', true);
		}

		setUnitField(t, null);
		
	}

	amount = amount + 1;	

}

function cubFeet_Gallons(tot)
{
	return tot / .133681;
}

function intoFeet(inches)
{
	if(inches.charAt(inches.length - 1) == '"' || inches.charAt(inches.length - 2).toLowerCase() == "'" && inches.charAt(inches.length - 1).toLowerCase() == "n")
	{
		return parseFloat(inches.substring(0, inches.length - 1))/12;
	}
	else if(inches.charAt(inches.length - 1) == '\'')
	{
		return parseFloat(inches.substring(0, inches.length - 1));
	}
	else
	{
		return parseFloat(inches);
	}
}

function go(event)
{
	var x = event.which|| event.keyCode;

	if(x == 13)
	{
		for(var i = 1; i <= amount; i++)
		{
			cubConCalc("con" + i);
		}
	}
}

function InputToArray(input)
{
	return [input.querySelector("input").value, input.querySelector('.valSelect').value]
}

function CreateNormalConverter()
{
	var tab = document.getElementById("normal_Table");
	var t = tab.appendChild(document.getElementById('input_Template').content.firstElementChild.cloneNode(true));
	setUnitField(t, null);
	t = t.querySelector('input');
	t.setAttribute("onchange", "calcNormal(" + 0 +")");
	
	tab.appendChild(document.createTextNode('='));	
	t = tab.appendChild(document.getElementById('input_Template').content.firstElementChild.cloneNode(true));
	setUnitField(t,null);
	t = t.querySelector('input');
	t.setAttribute("onchange", "calcNormal(" + 1 +")");
	
}

function setUnitField(element, unitType)
{
	var ele = element.querySelector('.valSelect');
	ele.innerHTML = "";

	var g = getAllConversions();
	for (var i = 0; i < g.length; i++) 
	{
		var o = document.createElement("option");
		o.text = g[i];
		ele.add(o);
	}
}

function calcNormal(t)
{
	docs = document.getElementById("normal_Table").querySelectorAll('.unit_Input');
    from = docs[t];
    to = docs[t==1?0:1];
	console.log(to);
	console.log(from);
	to.querySelector('#fx').value =  convert([from.querySelector('#fx').value, from.querySelector('.valSelect').value], to.querySelector('.valSelect').value)[0];   

}

var v = SetConversions();
//v = setTimeout(oneMore,0);
v = setTimeout(CreateNormalConverter);