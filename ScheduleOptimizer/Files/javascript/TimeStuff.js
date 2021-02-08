
//document.addEventListener("keydown", keyPush);

var personTimeSlotArray = [];
var dayTimeSlotArray = [];
var totalCompareArray = [];

function checkTime(timeEle)
{

	var e1 = timeEle.getElementsByTagName("input")[0];
	var e2 = timeEle.getElementsByTagName("input")[1];

	if(e1.value > e2.value)
	{		
		timeEle.insertBefore(e1, e2);
		timeEle.insertBefore(e2, timeEle.getElementsByTagName("br")[0]);
	}
}

function createTimes()
{	
	var people = document.getElementsByClassName("person")
	personTimeSlotArray = [];
	for(var p = 0; p < people.length; p++)
	{
		var timeArray = [];
		var days = people[p].getElementsByClassName("tDay");	

		for(var i = 0; i < days.length; i++)
		{
			var slots = days[i].getElementsByClassName("tSlot");

			for(var j = 0; j < slots.length; j++)
			{
				var times = slots[j].getElementsByTagName("input");
				timeArray.push(new timeSlot((i * 60 * 24) + timeToMinutes(times[0].value), (i * 60 * 24) + timeToMinutes(times[1].value)));
				//console.log((i * 60 * 24) + timeToMinutes(times[0].value) + "-" + ((i * 60 * 24) + timeToMinutes(times[1].value)));
			}
		}
		personTimeSlotArray.push(timeArray);
	}	
}

function createDaySlots()
{
	dayTimeSlotArray = [];
	for(var i = 0; i < 7; i++)
	{
		var ar = [];

		for(var p = 0; p < personTimeSlotArray.length; p++)
		{
		 	ar.push(personTimeSlotArray[p][i]);
		}
		dayTimeSlotArray.push(ar);
	}
}

function showTimes()
{	
	console.log(personTimeSlotArray);
	//console.log(dayTimeSlotArray);
}


function keyPush(e)
{
	checkTime();
}

function timeToMinutes(t)
{
	return (parseInt(t.substring(0,2)) * 60) + parseInt(t.substring(3));
}

function TimeFromMinutes(t)
{
	var dayMinutes = weekMinutesToDayMinutes(t);
	var hours = Math.floor(dayMinutes / 60) + "";
	var mins = (dayMinutes % 60) + "";

	if(hours.length < 2)
	{
		hours = "0" + hours;
	}
	if(mins.length < 2)
	{
		mins = "0" + mins;
	}
	//console.log(dayMinutes + " {" + hours + ":" + mins + "}");
	return hours + ":" + mins;
}

function weekMinutesToDayMinutes(t)
{
	return t % 1440;
}

function timeSlot(start, end)
{
	this.start = start;
	this.end = end;
	this.delta = end - start;
	this.actualStart = TimeFromMinutes(start);
	this.actualEnd = TimeFromMinutes(end);

	timeSlot.prototype.toString = function()
	{
		return this.start + "-" + this.end + " actual{" + this.actualStart + "-" + this.actualEnd + "}";
	}
}

function ohCrap()
{
	
	createTimes();
	sortAll();
	cleanAll();
	createDaySlots();	
	showTimes();

	totalCompareArray = [];
	

	for(var i = 0; i < personTimeSlotArray.length - 1; i++)
	{
		for(var j = i + 1; j < personTimeSlotArray.length; j++)
		{
			//console.log(++index);
			var ar = findCommon(personTimeSlotArray[i], personTimeSlotArray[j]);
			if(ar[0] == null)
			{
				totalCompareArray.push(0);
			}
			else
			{
				totalCompareArray.push(ar);
			}
			
			
		}
	}

	var tc = totalCompareArray;

	console.log(tc);
	var index = 0;
	var maxAmount = personTimeSlotArray.length - 1;
	//newResultsPerson(0,1);
	/*
	while(index < tc.length)
	{
		//var div = document.getElementById("results").appendChild(document.createElement("div"));
		for(var i = 0; i < maxAmount; i++)
		{			
			var p1 = personTimeSlotArray.length - maxAmount - 1;
			var p2 = (personTimeSlotArray.length - maxAmount) + i;
			console.log(p1 + "-" + p2 + ":" + tc[index]);	
			newResultsPerson(p1,p2);
			index++;
		}
		maxAmount--;		
	}
	*/
	var d = document.getElementById("Calculations").getElementsByTagName("div")[0];	
	while(d.hasChildNodes())
	{
		d.removeChild(d.firstChild);
	}
	
	var start = 0;
	var max = personTimeSlotArray.length - 1;
	var index = 1;
	for(var result = 0; result < tc.length; result++)
	{

		if(index - start > max)
		{			
			max--;
			start++;
			index = start + 1;
		}

		newResultsPerson(start,index);
		var day = 0;
		var ar = [];
		if(tc[result].length > 0)
		{
			console.log("Not Empty");
			for(var i = 0; i < tc[result].length; i++)
			{
				if(i == 0)
				{
					ar.push(tc[result][i]);	
				}
				else if(tc[result][i].start >= ((1 + day) * 1440))
				{				
					newDay("p" + start + "p" + index, shortDays[day], ar, false);
					day = Math.floor(tc[result][i].start / 1440);
					ar = [];	
					ar.push(tc[result][i]);		
					console.log("New Day: " + day);
				}
				else
				{
					ar.push(tc[result][i]);
					console.log("New Time");
				}	

				if(i == tc[result].length - 1)
				{
					newDay("p" + start + "p" + index, shortDays[Math.floor(tc[result][i].start / 1440)], ar, false);
					console.log("End New Day");
				}
			}	
		}
		else
		{
			ar.push(tc[result]);
			newDay("p" + start + "p" + index, shortDays[Math.floor(tc[result].start / 1440)],ar, false);
			console.log("One Entry");
		}
		index++;
		
	}
	

}

function summation(v)
{

	for(var i = v - 1; i > 0; i--)
	{
			v+=i;
	}

	return v;
}

function sortSlots(slotArray)
{
	ar = new Array(7 * 24 * 60);
	a1 = [];
	for(var i = 0; i < slotArray.length; i++)
	{
		ar[slotArray[i].start] = slotArray[i];
	}
	//console.log(ar);
	
	for(var i = 0; i < ar.length; i++)
	{
		if(ar[i] != null)
		{
			a1.push(ar[i]);
		}
	}

	return a1;
}

function cleanSlots(slotArray, index = 0)
{
	if(slotArray.length < 2 || index >= slotArray.length)
	{
		return slotArray;
	}

	var slot = slotArray[index];
	for(var i = 0; i < slotArray.length; i++)
	{
		if(i != index)
		{
			s2 = slotArray[i];			

			if(slot.start <= s2.end && slot.end >= s2.start)
			{
				console.log(slot + " " + s2);
				slotArray[i] = new timeSlot(Math.min(slot.start, s2.start), Math.max(slot.end, s2.end));
				slotArray[index] = slotArray[slotArray.length - 1];
				//console.log("Something happened");
				slotArray.pop();
				console.log(slotArray[i] + ":" + i);
				break;
			}
		}

	}

	cleanSlots(slotArray, ++index);
	
	return slotArray;
}

function makeSlot(ar1, ar2, index, slotArray)
{
	if(index == ar1.length)
	{
		return slotArray;
	}
	var slot = ar1[index];
	var delt = 0;
	for(var i = 0; i < ar2.length; i++)
	{
		var s2 = ar2[i];
		if(slot.start < s2.end && slot.end > s2.start)
		{
			var s3 = new timeSlot(Math.max(slot.start, s2.start), Math.min(slot.end, s2.end));	
			if(delt < s3.delta)
			{
				slot = s3;
			}	
			
		}
	}
	slotArray.push(makeSlot(ar1, ar2, index++, slotArray));
	return slotArray;
}

function sortAll()
{
	for(var i = 0; i < personTimeSlotArray.length; i++)
	{
		personTimeSlotArray[i] = sortSlots(personTimeSlotArray[i]);
	}
	//console.log(personTimeSlotArray);
}

function reSortSlots()
{	
	var index = 0;
	var timeInputs = document.getElementsByClassName("tSlot");
	for(var i = 0; i < personTimeSlotArray.length; i++)
	{
		var slots = personTimeSlotArray[i];
		for(var j = 0; j < slots.length; j++)
		{
			var slot = timeInputs[index++].getElementsByTagName("input");
			slot[0].value = TimeFromMinutes(slots[j].start);
			slot[1].value = TimeFromMinutes(slots[j].end);
		}

	}
}

function cleanAll()
{
	
	for(var i = 0; i < personTimeSlotArray.length; i++)
	{
		cleanSlots(personTimeSlotArray[i]);
	}
	
	deleteAllTimes();
 	remakeSlots();
}

function remakeSlots()
{
	var people = document.getElementsByClassName("person");

	for(var i = 0; i < personTimeSlotArray.length; i++)
	{
		var vals = personTimeSlotArray[i];
		console.log(vals);
		for(var j = 0; j < vals.length; j++)
		{
			var d = shortDays[Math.floor(vals[j].start / 1440)];
			//console.log(people[i].id + ", " + shortDays[Math.floor(vals[j].start / 1440)] + "," + TimeFromMinutes(vals[j].start) + "," + TimeFromMinutes(vals[j].end));
			newTime(people[i].id + d, d, TimeFromMinutes(vals[j].start), TimeFromMinutes(vals[j].end));
			
		}		
	}
}

function findCommon(a1, a2)
{
	var common = [];
	for(var i = 0; i < a1.length; i++)
	{
		var a = a1[i];

		for(var j = 0; j < a2.length; j++)
		{
			var b = a2[j];

			if(a.start < b.end && a.end > b.start)
			{
				var start = Math.max(a.start, b.start);
				var end = Math.min(a.end, b.end);
				var s = new timeSlot(start, end);
				//console.log(s);
				common.push(s);
			}
		}
	}
	return common;
}

