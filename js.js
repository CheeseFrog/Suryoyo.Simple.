
window.addEventListener("load",start);
function start() {
var y=[],x=document.getElementsByTagName("span");

function find() {
for (var i=0;i<x.length;i++) if (x[i].style.background && x[i].innerText) {
	y.push(x[i]);var n=str(x[i].innerText)
	var l=document.getElementById(n);if (l) l.id="_";
	x[i].id=n;x[i].onclick=scr;}}
function str(a) {return a.replace(/\s/g, "");}
function scr() {location.hash = "#" + str(this.innerText);}

find();
}