var iConversions = new Map();
var mConversions = new Map();

function getConversion(goto,...cons)
{
	console.log(cons[0]);
	
	for (var i = 0; i < cons.length; i++)
	{
		if(cons[i][1] != goto)
		{
			convert(cons[i],goto);
		}
	}
	return cons;
}

const base = 'ft';

function convert(lhs, goto)
{
	if(lhs[1] == goto)
	{
		console.log("Same Base");		
	}
	else
	{
		
		lhs[0] *= getConversionFactor(lhs[1], goto); 
		lhs[1] = goto;
		console.log(lhs);	
	}
	return lhs;
}

//Converting from lhs to rhs
function getConversionFactor(lhs, rhs)
{
	return  iConversions.get(lhs) / iConversions.get(rhs);
}

function setImpConversions()
{
	var cons = [['in',1/12],['ft', 1],['yd',3],['mile', 5280],['mm', 3.28084/1000], ['cm', 3.28084/100],['m', 3.28084], ['km', 1000/3.28084]]

	for (var i = 0; i < cons.length; i++) 
	{
		iConversions.set(cons[i][0], cons[i][1]);
	}

	console.log(iConversions.keys());
}

function setCubicConversions()
{
	var cons = [['mm', 1000], ['cm', 100], ['km', 1/1000], ['ft', 3.28084]]

	for (var i = cons.length - 1; i >= 0; i--) 
	{
		mConversions.set(cons[i][0], cons[i][1]);
	}
}

function getAllConversions()
{
	ar = [];
	for(i of iConversions.keys())
	{
		ar.push(i);
	}

	return ar;
}

function cubicConversions()
{

}

function SetConversions()
{
	setImpConversions();
	//setMetricConversions();			
}
