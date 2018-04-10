
window.addEventListener("load",start);
var y=[],x=[],v=0,l=[],l2=[];
var style = document.createElement('style');
style.type = 'text/css';



function start() {

function str(a) {return a.replace(/\s/g, "");}
function scr() {location.hash="#"+str(this.innerText);}
function top() {location.hash="";location.hash="#[Suryoyo.Simple.]";}//window.scrollTo(0,0);
function invert() {v=!v;document.body.setAttribute("in",v)}
function getindex() {
var ss=document.styleSheets[1];
var css=(ss.cssRules?ss.cssRules:ss.rules);
for (var i=0;i<css.length;i++) {
	if(css[i].style&&css[i].style.backgroundColor&&!css[i].style.padding) l.unshift(css[i].selectorText);}
for (var i in l) l2.push(l[i]+":hover")
style.innerHTML = l+"{cursor:pointer;user-select:none;} "+l2+"{outline:3px solid yellow;}"
document.getElementsByTagName('head')[0].appendChild(style);}
function find() {
for (var i=0;i<l.length;i++) y=y.concat([].slice.call(document.getElementsByClassName(l[i].replace(/.c/g, "c"))))
for (var i=0;i<y.length;i++) {
	var n=str(y[i].innerText)
	var last=document.getElementById(n);
	y[i].id=n;
	y[i].onclick=scr;
	if (last) {last.id="_"; y[i].onclick=top}}}

getindex();find();
document.body.firstChild.firstChild.onclick=invert
}

//includeHTML()
//x=document.getElementsByTagName("span");
// function findold() {
// for (var i=0;i<x.length;i++) if (x[i].style.background && x[i].innerText) {
// 	y.push(x[i]);var n=str(x[i].innerText)
// 	var l=document.getElementById(n);if (l) l.id="_";
// 	x[i].id=n;x[i].onclick=scr;}}