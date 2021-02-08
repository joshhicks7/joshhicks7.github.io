		
		var amount = 1;
		
		//window.onload = SetUp();


		function SetUp()
		{
			var inputs = document.getElementsByClassName("valSelect");
			for(var i = 0; i < inputs.length; i++)
			{
				var vals = ["nm", "mm", "cm", "m", "dm", "km"];
				for(var j = 0; j < vals.length; j++)
				{
					var op = document.createElement("option");
					op.value = vals[j];
					op.innerHTML = vals[j];
					inputs[i].appendChild(op);
				}

			}
		}
		function calc(id)
		{
			
				var ele = document.getElementById(id);
				//alert(id.toString());
				var x = intoFeet(ele.querySelector("#fx").value);
				var y = intoFeet(ele.querySelector("#fy").value);
				var z = intoFeet(ele.querySelector("#fz").value);

				var tot = x * y * z;
				//alert("x: " + x + " y: " + y + " z: " + z);
				ele.querySelector("#cubFeet").innerHTML = tot.toFixed(3).toString() + " Cubic Feet = ";
				ele.querySelector("#gallons").innerHTML = cubFeet_Gallons(tot).toFixed(2) + " Gallons";
				
				
		}
	
		function oneMore()
		{
			var table = document.getElementById("table");
			var ele = document.getElementById("con" + amount).cloneNode(true);
			amount = amount + 1;
			table.appendChild(ele);			
			ele.id = "con" + amount;
			
			//alert(table.childNodes[table.childNodes.length - 1].id);
			//alert(ele.childNodes[7].id);
			ele.querySelector("#click").querySelector("#e1").setAttribute("onclick","calc('" + ele.id + "')");
			
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
					calc("con" + i);
				}
			}
		}