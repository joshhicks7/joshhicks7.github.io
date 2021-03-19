var mySlotsHolder ;

var mySlots = []

var workDayStart = 480;
var dayEnd = 1320;

window.onload = function()
{
	mySlotsHolder = document.getElementById("MySlots");
	CreateDays();
}

function AddInputSlotNo()
{
	var c = mySlotsHolder.appendChild(document.getElementById("addTimeTemplate").content.firstElementChild.cloneNode(true));
	var slot = new TimeSlot("New", "10:00", "11:00", "monday");
	c.id = slot;
	c.onmouseout = function(){replaceMe(this, slot)};
	
}

function addInputSlot(slot)
{
	var c = document.getElementById("addTimeTemplate").content.firstElementChild.cloneNode(true);

	c.querySelectorAll("input")[0].value = slot.name;
	c.querySelector("select").value = slot.day;
	c.querySelectorAll("input")[1].value = slot.startTime;
	c.querySelectorAll("input")[2].value = slot.endTime;
	c.id = slot;
	c.onmousemove = function(){this.id = getTimeSlotFromInputsId(this)}
	c.onmouseout = function(){this.id = getTimeSlotFromInputsId(this);setTimeout(replaceMe(this, getTimeSlotFromInputsId(this)), 100)};
	return c;
}

function addNormalSlot(slot)
{
	var c = document.createElement('div');
	c.className = "AdditionalTime Ref";
	c.innerHTML = slot;
	c.id = slot;
	c.onmouseover = function(){replaceMe(this, slot)};
	return c;
}

function replaceMe(me, slot)
{
	if(me.className == "AdditionalTime")
	{
		me.replaceWith(addNormalSlot(slot));
	}
	else
	{
		me.replaceWith(addInputSlot(slot));
	}

}
function CreateDays()
{
	var holder =  document.getElementById("dayHolder");
	holder.innerHTML = "";
	for(var i = 0; i < days.length; i++)
	{
		newDay(days[i]);
	}
}

days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function newDay(day)
{
	var holder =  document.getElementById("dayHolder");
	var temp = holder.appendChild(document.getElementById("dayTemplate").content.firstElementChild.cloneNode(true));
	//console.log(temp);
	temp.innerHTML = temp.innerHTML.replace("Monday", day);
	temp.id = day;
}


function GenerateSlots()
{
	mySlots = []
	var allInputs = document.getElementsByClassName("AdditionalTime");// + document.getElementsByClassName("AdditionalTime Ref");

	//console.log(allInputs);
	for(var i = 0; i < allInputs.length; i++)
	{
		mySlots.push(getTimeSlotFromInputsId(allInputs[i]));
	}

	mySlots = sortSlots(mySlots);
	MakeStats();
	//console.log(mySlots);
}

function GenerateAll()
{
	CreateDays();
	var days = document.getElementsByClassName("innerDayHolder");
	for(var i = 0; i < days.length; i++)
	{
		days[i].innerHTML = "";
	}
	GenerateSlots();
	remakeSlots();

	for(var i = 0; i < mySlots.length; i++)
	{
		var comp = []
		for(var j = 0; j < mySlots.length; j++)
		{
			if(i != j)
			{
				if(mySlots[i].day == mySlots[j].day && mySlots[i].index == mySlots[j].index && isOverrlapping(mySlots[i], mySlots[j]))
				{
					mySlots[j].index++;
					i = 0;
				}

			}
		}
	}

	for(var i = 0; i < mySlots.length; i++)
	{
		addTimeToDay(mySlots[i]);
	}

}

function remakeSlots()
{
	document.getElementById("MySlots").innerHTML = "";
	for(var i = 0; i < mySlots.length; i++)
	{
		mySlotsHolder.appendChild(addNormalSlot(mySlots[i]));
	}
}

function addTimeToDay(slot)
{
	var ellapsed = timeToMinutes(slot.endTime) - timeToMinutes(slot.startTime);
	if(ellapsed < 10)
	{
		//console.log(mySlots.indexOf(slot));
		document.getElementById("MySlots").childNodes[mySlots.indexOf(slot)].style.backgroundColor = "red";
		alert("Error with a time, Too Short Problem time Highlighted in red");	
		
		return;
	}

	var day = document.getElementById(slot.day);
	var d = day.querySelector(".innerDayHolder");
	//console.log(d);
	var t = d.appendChild(document.getElementById("timeSlotTemplate").content.firstElementChild.cloneNode(true));
	t.innerHTML = t.innerHTML.replace('title', slot.name);
	t.innerHTML = t.innerHTML.replace('times', slot.startTime + "-" + slot.endTime);
	t.style.top =  100 * ((timeToMinutes(slot.startTime) - workDayStart) / (dayEnd - workDayStart)) + "%" 


	
	t.style.height = 100 * (ellapsed / (dayEnd - workDayStart)) + "%";
	//t.setAttribute('class',"TimeSlot " + slot.name )
	t.className = "TimeSlot " + slot.name ;
	t.setAttribute('onclick', 'clickme(this)');
	t.id = slot;
	t.title = slot;
	var width = parseInt(window.getComputedStyle(t).width) + 4;
	var left = ( width * slot.index);
	//console.log(window.getComputedStyle(t).width);
	t.style.left =  left + "px";
	//console.log(window.getComputedStyle(d).width);
	//console.log(left);
	//console.log(width);
	if(left >= parseInt(window.getComputedStyle(d).width) - width)
	{
		tWidth = ((width * (slot.index + 1)));
		//console.log("to big");
		d.style.width = tWidth + "px";
		day.style.width = tWidth + "px";
		//day.parentNode.style.width = tWidth + 20  + "px";
	}
}

//When this element is clicked all elements of that elements class  are selected
function clickme(selection)
{
	var all = document.getElementsByClassName('TimeSlot');
	
	var st = selection.getAttribute('class');

	for (var i = all.length - 1; i >= 0; i--) 
	{
		if(all[i].getAttribute('class') == st)
		{
			all[i].style.backgroundColor = 'yellow'; 
		}
		else
		{
			all[i].style.backgroundColor = 'white'; 
		}
	 	
	}
	st = selection.id;

	var all = document.getElementById('MySlots').querySelectorAll(".AdditionalTime");
	for (var i = all.length - 1; i >= 0; i--) 
	{
	 	if(all[i].id == st)
		{
			all[i].style.backgroundColor = 'yellow'; 
		}
		else
		{
			all[i].style.backgroundColor = 'white'; 
		}
	}

	showToast("Total count of "+ selection.className + ": " + document.getElementsByClassName(selection.getAttribute('class')).length, 3000);

}
function getTimeSlotFromInputsId(input)
{
	//console.log(input.cl);
	if(input.className == "AdditionalTime")
	{
		//console.log("additional");
		return new TimeSlot(input.querySelectorAll('input')[0].value, input.querySelectorAll('input')[1].value, input.querySelectorAll('input')[2].value, input.querySelector('select').value);
	}
	else
	{
		//console.log("normal");
		var vals = input.id.split(',');
		return TimeSlot.shortTime(vals[0], vals[1])[0];
	}
	
}

function isOverrlapping(lhs, rhs)
{
	if(lhs.start < rhs.end && lhs.end > rhs.start)
	{
		return true;
	}
	return false;
}

function sortSlots(slotArray)
{
	slotArray = sortByName(slotArray);
	slotArray = sortByTime(slotArray);
	return slotArray;
}

function sortByName(slotArray)
{
	//console.log(slotArray);
	for(var i = 0; i < slotArray.length; i++)
	{
		for(var j = 0; j < slotArray.length; j++)
		{
			if(i != j)
			{
				if(slotArray[i].name < slotArray[j].name)
				{
					let temp = slotArray[i];
					slotArray[i] = slotArray[j];
					slotArray[j] = temp;
				}
			}
			
		}		
	}

	return slotArray;
}

function sortByTime(slotArray)
{
	//console.log(slotArray);
	for(var i = 0; i < slotArray.length; i++)
	{
		for(var j = 0; j < slotArray.length; j++)
		{
			if(i != j)
			{
				if(slotArray[i].dayIndex < slotArray[j].dayIndex)
				{
					let temp = slotArray[i];
					slotArray[i] = slotArray[j];
					slotArray[j] = temp;
				}
				else if(slotArray[i].dayIndex == slotArray[j].dayIndex)
				{
					if(slotArray[i].start < slotArray[j].start)
					{
						let temp = slotArray[i];
						slotArray[i] = slotArray[j];
						slotArray[j] = temp;
					}
				}
			}
			
		}		
	}

	//console.log(slotArray);
	return slotArray;
}

function checkTime(input)
{
	if(input.max < input.value)
	{
		input.value = input.max;
	}
	input.value = timeFromMinutes(Math.max(timeToMinutes(input.min), timeToMinutes(input.value)));
	//.log(input.parentNode.id = getTimeSlotFromInputsId(input.parentNode));
	//console.log(input.parentNode);
}

function upload(event)
{

	let file = event.target.files[0];

	let reader = new FileReader();

	reader.readAsText(file);
	reader.onload = function()
	{
		TryLoad(reader.result);
		document.getElementById("fileName").innerHTML = file.name;
	}
}


function TryLoad(file)
{

	var lines = file.split('\n');

	if(lines.length <= 1)
	{
		alert("failed, Invalid File");
		return;
	}


	header = file.split('\n')[0];
	mySlots = [];
	var results = window.prompt("These are your fields: \n" + removeAll(' ',header) 
		+ "\nPlease select the ones the you want to keep in the order of "
		+ "\n 'Class Name' ',' 'Class Time'"
		+ "\nEX: fields (class Time, class Name)"
		+ "\nYour Answer: 1,0"
		, "0 , 1");
	


	results = results.split(',');	
	if(results.length > 2)
	{
		alert("Too many inputs");
	}
	else
	{		
		for(var i = 1; i < lines.length; i++)
		{
			var sec = lines[i].split(',');
			if(sec[0].length <= 2)
			{
				//console.log("dragonbreath");
				break;
			}

			try
			{
				let sts = TimeSlot.shortTime(sec[parseInt(results[0])], sec[parseInt(results[1])]);
				//console.log(sts.length);
				for (var j = 0; j < sts.length; j++) 
				{
					//console.log(i);
					mySlots.push(sts[j]);
				}
				
			}catch(e)
			{
				alert("Invalid Input");
				//console.log(e);
				return;
			}
			
		}
		remakeSlots();
		GenerateAll();
	}

}

function download()
{
	GenerateSlots();	
	var str = mySlots.join('\n');
	str = "ClassName,ClassTime \n" + str;

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
	element.setAttribute('download', "Class_Schedule" + new Date().getFullYear() + "_" + new Date().getMonth()+1 + "_" + new Date().getDate() + ".csv");

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();

	document.body.removeChild(element);
}

function duplicate(ele)
{
	mySlotsHolder.appendChild(addNormalSlot(getTimeSlotFromInputsId(ele)));
}

function calcResults()
{
	GenerateSlots();

	var totalClasses = mySlots.length;

	document.getElementById("results").innerHTML = "Total Classes: " + totalClasses;
}

function SortByOption(val)
{
	GenerateSlots();

	switch(val)
	{
		case "Time":
		mySlots = sortByTime(mySlots);
		break;
		case "Name":
		mySlots = sortByName(mySlots);
		break;
		case "All":
		mySlots = sortByName(mySlots);
		mySlots = sortByTime(mySlots);
		break;
	}

	remakeSlots();
}

function showToast(message, time)
{
	var toast = document.getElementById("toast");

	toast.innerHTML = message;
	toast.style.visibility = "visible";
	setTimeout(function(){toast.style.visibility = "hidden"}, time);
}

function MakeStats()
{
	var stats = document.getElementById("stats");

	classTypes = new Set();

	for (var i = mySlots.length - 1; i >= 0; i--) 
	{
	 	classTypes.add(mySlots[i].name);
	}

	str =  " <div style = 'width:250px'> Total Classes: " + mySlots.length + "</div>";
	str +=  " <div style = 'width:250px'> Total Class Types: " + classTypes.size + "</div>";
	str += "<br>"
	var it = classTypes.values();

	//classTypes.forEach(x => str += "<div style = 'width:200px' onclick = 'clickme(document.getElementsByClassName(" + '"'+ x + '"' + ")[0])'>" + x + ": " +  mySlots.filter(sl => sl.name == x).length + "</div>") ;
	classTypes.forEach(x => str += "<div style = 'width:200px' onclick = 'selectInputsByType(" +'"'+ x + '"' + ")'>" + x + ": " +  mySlots.filter(sl => sl.name == x).length + "</div>") ;

	stats.innerHTML = str;
}

function selectInputsByType(type)
{	
	type = removeAll(' ', type).toLowerCase();
	mySlotsHolder.querySelectorAll('.AdditionalTime').forEach(
		node => 
		{
			var n1 = removeAll(' ',node.id.toLowerCase());
			console.log(type);
			console.log(n1);

			if(n1.includes(type))
			{
				console.log("hellow")
				node.style.backgroundColor = "yellow";
			}
			else {node.style.backgroundColor = "white"}
		});

}
function ShowCountInDay(day)
{
	//console.log(day);
	showToast("Total Class Count For " + day.id + ": "+ day.querySelectorAll('.TimeSlot').length, 3000);
}

window.onbeforeprint = function(){GenerateAll()};