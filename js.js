

window.addEventListener("load",start);
var y=[],z=[],x
function start() {
x=document.getElementsByTagName("span");

function find() {
for (var i=0;i<x.length;i++) if (x[i].style.background && x[i].innerText) {
	y.push(x[i]);
	var id=document.getElementById(x[i].innerText); x[i].id=x[i].innerText;
if (id) id.id="";x[i].onclick=scr;}}


function scr() {location.hash = "#" + this.innerText;}

find();
}