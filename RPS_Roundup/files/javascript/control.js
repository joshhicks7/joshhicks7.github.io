let ta = document.getElementById("questionArea");

function mail()
{
	if(ta.value != "")
	location.href = "mailto:jhjoshrhicks07@gmail.com?subject=RPS_Roundup-Question&body=" + ta.value;
}

function editedText()
{
	
	document.getElementById("wordCounts").innerHTML = "Word Count: " + ta.value.length + "\t\tMax Word Count: " + ta.getAttribute('maxLength');
}