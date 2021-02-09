function game(name, words)
{
	this.name = name;
	this.words = words;
}


var Gallon_Feet_Conversion = 
new game("Feet - Gallon Converter", 
	"Welcome to my new converter. You can enter you values in feet or in inches. The default is feet. To enter you numbers as an inch you have to type ('in' or " + '"' + ") at the end of your variable");

var Word_Escape = new game("Word Escape", "This is the typing game that everyone needs to try. I mean everyone. As long as you are on a laptop of some type this is the game for you. Choose your category and then rock your world. Look out because it's not as easy as you think.");

var Rocket_Ship = new game("Rocket Ship", "Build a rocket ship and then fly it far away :))");

var Vector_Help = new game("Vector_Help", "Have you ever taken calculus in the college? If so then you definetly remember the last part of the semester that dealt with all the vector this and vector that. Well do I have a solution for you. Vector help is for those you just don't get what those vector things mean.");

var My_Snake = new game("My Snake", "I made my own version of snake. Don't worry about walls. They won't hurt you. The only thing that will hurt you is you. Look out for the portals. They're a doosey. Eat the candy, and make it far.");

var Schedule_Optimizer = new game("Schedule Optimizer", "");

var Resume = new game("Resume", "");

var games = [Gallon_Feet_Conversion, Word_Escape, Rocket_Ship, Vector_Help, My_Snake, Schedule_Optimizer];

