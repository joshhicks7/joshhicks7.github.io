class TimeSlot
{
	constructor(name, startTime, endTime, day)
	{
		this.name = name;
		this.startTime = startTime
		this.endTime = endTime
		this.day = day
		this.index = 0;
		this.start = timeToMinutes(startTime);
		this.end = timeToMinutes(endTime);
		this.dayIndex = days.indexOf(day);
	}

    
	toString()
	{
		return this.name + ',' + this.day.substring(0,3) + '-' + this.startTime + '-' + this.endTime;
	}
}

//returns an array of times
TimeSlot.shortTime = function(name, fullDayTime)
{
	name = removeAll('"', name);
	fullDayTime = removeAll('"',fullDayTime);
	let times = (myTryParse(fullDayTime));
	fullDayTime = removeAll(' ',fullDayTime);
	let slts = [];
	
	for (var i = 0; i < times.length; i++) 
	{
		let ar = times[i].split('-');
		slts.push(new TimeSlot(name,timeHoursAndMinutes(parseTime(ar[1])), timeHoursAndMinutes(parseTime(ar[2])),getDayFromShort(ar[0])));
	}
	
	return slts;
}


function myTryParse(t)
{
	t = t.toLowerCase();
	const ti = t.match(/[a-z]{1,3} *(?: *-? *\d+ *: *\d{2} *(?:(?:pm)|(?:am))?){2}?/g);
	//console.log(ti);

	//console.log(ret);
	return ti;
}

function timeToMinutes(t)
{	
	//console.log(t);
	t = t.toString();	
	t = removeAll(" ", t);
	t = (t.match(/(?:(\d{1,2})(?::)?(\d{2})?)/));
	//console.log(t);
	return parseInt(t[1]) * 60 + parseInt(t[2]);
}

function timeFromMinutes(t)
{
	var hours = Math.floor(t / 60) + "";
	var mins = (t % 60) + "";

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

function getDayFromShort(st)
{
	st = st.toLowerCase();

	st = st.substring(0,Math.min(3,st.length));
	//console.log(st);

	if(st[0] == "m")
	{
		return "Monday";	
	}
	if(st[0] == 'w')
	{
		return "Wednesday"
	}
	if(st[0] == 'f')
	{
		return "Friday"
	}
	if(st[0] == 's')
	{
		if(st[1] == 'a')
			return "Saturday";

		else return "Sunday"
	}
	if(st[0] == 't')
	{
		if(st[1] == 'u')
			return "Tuesday";

		else return "Thursday"
	}
	
	return "";
}

function removeAll(r, s)
{
	var st = "";

	for(var i = 0; i < s.length; i++)
	{
		if(s[i] != r)
		{
			st += s[i]
		} 
	}

	return st;
}

function parseTime( t ) 
{
   var d = new Date();
   t = t.toString();
   t = t.toLowerCase();
   let time = t.match( /(\d+)(?::(\d\d))?\s*(p)? */ );
   if(time == null)return;
   if(time[3])
   {
   		if(parseInt(time[1]) == 12)
   		{
			d.setHours(parseInt(time[1]));
   		}
   		else
   		{
   			d.setHours(parseInt(time[1]) + 12);
   		}
		
   }
   else
   {
		d.setHours( parseInt( time[1])); 
   }
   
   d.setMinutes( parseInt( time[2]) || 0 );
   return d;
}

function timeHoursAndMinutes(t)
{

	var h = t.getHours().toString();
	var m = t.getMinutes().toString();
	//console.log("Bubbles" + t.getHours() + ":" + t.getMinutes().length);
	if(h.length == 1)
	{
		h = "0"+ h;
	}
	if(m.length == 1)
	{
		//console.log("Bubbles");
		m = "0" + m;
	}
	return h + ":" + m;
}

