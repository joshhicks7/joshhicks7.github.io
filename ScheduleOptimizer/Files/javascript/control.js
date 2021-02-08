var totalPersonCount = 0;
var longDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
var shortDays = ['m', 'tu', 'w', 'th', 'f', 'sa', 'su'];


window.onload = function(){setTimeout(newPerson(), 300); newPerson()};




function newPerson()
{
	totalPersonCount++;
	var id = 'p' + totalPersonCount;
	var temp = document.getElementById("personTemplate").getElementsByTagName("script")[0].innerHTML;
	temp = temp.replace('p1', id);
	temp = temp.replace('PERSON 1', "PERSON " + totalPersonCount);
	temp = temp.replace('dPers', id);
	var p = document.getElementById("Main_Content").appendChild(document.createElement("div"));
	p.id = id;
	p.setAttribute("class","person");
	p.innerHTML = temp;	
	p.getElementsByClassName("nameInput")[0].focus();
	p.getElementsByClassName("nameInput")[0].select();
	for(var i = 0; i < shortDays.length; i++)
	{
		newDay(id, shortDays[i]);
	}
	var d = document.getElementById("Main_Content").appendChild(document.createElement("div"));
	d.style.width = "50px";
	return p;

}

function newDay(p, d, times = null, editable = true)
{
	var mP = "my_person";
	var mD = "my_day";
	var start = "start";
	var end = "end";
	var dText = "Day_Text";

	var temp = document.getElementById("dayTemplate").getElementsByTagName("script")[0].innerHTML;

	temp = temp.replace(mP, p + d);
	temp = temp.replace(mD, d);
	temp = temp.replace(mP, p);
	temp = temp.replace(mD, d);

	for(var i = 0; i < longDays.length; i++)
	{
		if(shortDays[i].substring(0,d.length) == d)
		{
			temp = temp.replace(dText, longDays[i].toUpperCase());
			break;
		}
	}
    
	
	var a = document.getElementById(p).getElementsByTagName("tbody")[0].appendChild(document.createElement("tr"));
	a.innerHTML = temp;
	a.id = p + d;
	a.setAttribute('class', 'tDay');

	if(!editable)
	{
		a.removeChild(a.getElementsByClassName("add_sub_Slot")[0]);
	}

	if(times == null)
	{
		console.log("nothing here");
		newTime(p + d,d);
	}
	else
	{
		if(times.actualStart != null)
		{
			newTime(p + d,d,times.actualStart,times.actualEnd);
		}

		for(var i = 0; i < times.length; i++)
		{
			newTime(p + d,d,times[i].actualStart, times[i].actualEnd);

		}
	}
	


	return a;
}

function newTime(p,day,start = "00:00", end = "00:00")
{
	var d = document.getElementById(p);
	var tSlot = document.getElementById("timeTemplate").getElementsByTagName("script")[0].innerHTML;
	tSlot = tSlot.replace('00:00', start);
	tSlot = tSlot.replace('23:59', end);
	var c = document.createElement("td");
	document.getElementById(p).appendChild(c);
	c.setAttribute('class', 'tSlot');
	c.innerHTML = tSlot;
	return c;
}

function delPerson(p)
{
	if(document.getElementsByClassName("person").length > 1)
	{
		document.getElementById(p).remove();
	}	
}

function delTime(p,day)
{
	var d = document.getElementById(p + day);
	var slots = d.getElementsByClassName("tSlot");
	if(slots.length > 1)
	{
		slots[slots.length - 1].remove();
	}
	
}

function printFTime()
{
	console.log(document.getElementsByClassName("tSlot")[0].getElementsByTagName("input")[0].value);
}

function deleteAllTimes()
{
	var times = document.getElementsByClassName("tSlot");
	for(var i = 0; i < times.length; i++)
	{
		times[i].remove();
		i--;
	}
}

function newResultsPerson(p1, p2)
{
	var id = "p" + p1 + "p" + p2;
	var temp = document.getElementById("resultPersonTemplate").getElementsByTagName("script")[0].innerHTML;
	temp = temp.replace("available", getPersonName(p1) + " - " + getPersonName(p2));
	temp = temp.replace("p1p2", id);
	var doc = document.getElementById("ResultsHolder").appendChild(document.createElement("div"));
	doc.innerHTML = temp;
	doc.class = "ResultHolder";
	var d = document.getElementById("ResultsHolder").appendChild(document.createElement("div"));
	d.style.width = "15px";
}

function getPersonName(index)
{
	return document.getElementsByClassName("nameInput")[index].value;
}