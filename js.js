
window.addEventListener("load",start);
var y=[],x=[],v=0,l=[],l2=[];
var style = document.createElement('style');
style.type = 'text/css';


function str(a) {return a.replace(/\s/g, "");}
function scr() {return location.hash="#"+str(""+this.innerText).substr(+this.dex);}
function home() {window.scrollTo({top:0,behavior: "smooth"})}//location.hash="#[Suryoyo.Simple.]";
function invert() {v=!v;document.body.setAttribute("in",v)}
function chktp() {document.body.setAttribute("top",+(window.pageYOffset<100))}

function start() {
chktp();
window.addEventListener("scroll",chktp)
var up = document.createElement("div");
up.id="up";up.innerText="";up.onclick=home;
document.body.appendChild(up)

function getindex() {

var ss=document.styleSheets[1];
var css=(ss.cssRules?ss.cssRules:ss.rules);
for (var i=0;i<css.length;i++) {if(css[i].style&&css[i].style.backgroundColor&&!css[i].style.padding) l.push(css[i].selectorText);}
for (var m=0;m<l.length;m++) {j=document.getElementsByClassName(l[m].substr(1));
for (var k=0;k<j.length;k++) {j[k].classList.add("tit")}}}

function find() {
for (var i=0;i<l.length;i++) y=y.concat([].slice.call(document.getElementsByClassName(l[i].replace(/\./g, ""))))
for (var i=0;i<y.length;i++) {
	var n=str(y[i].innerText);y[i].id=n;
	y[i].dex=(n.charAt(0)==">")
	y[i].onclick=(y[i].dex?scr:scr);

	//if (n) var last=document.getElementById(n);
	//y[i].id=n;
		//if (last) {last.id=""; }
}}

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