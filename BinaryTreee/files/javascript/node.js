function myNode(value, left = null, right = null)
{
	this.value = value;
	this.left = left;
	this.right = right;

	myNode.prototype.toString = function()
	{
		return '{' + this.value + ',' + this.left + ',' + this.right + '}'; 
	} 
}