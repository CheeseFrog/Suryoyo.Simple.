
window.addEventListener("load",start);
var y,x;
function start() {
//includeHTML()
//x=document.getElementsByTagName("span");
// function findold() {
// for (var i=0;i<x.length;i++) if (x[i].style.background && x[i].innerText) {
// 	y.push(x[i]);var n=str(x[i].innerText)
// 	var l=document.getElementById(n);if (l) l.id="_";
// 	x[i].id=n;x[i].onclick=scr;}}

function str(a) {return a.replace(/\s/g, "");}
function scr() {location.hash = "#" + str(this.innerText);}
function top() {location.hash="#INDEX:"}

function find() {
y=[];x=[52,66,79,13];for (var i=0;i<x.length;i++) y=y.concat([].slice.call(document.getElementsByClassName("c"+x[i])))

for (var i=0;i<y.length;i++) {
	var n=str(y[i].innerText)
	var last=document.getElementById(n);
	y[i].id=n;
	y[i].onclick=scr;
	if (last) {last.id="_"; y[i].onclick=top}
	}
}

find();
}