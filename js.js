var y=[],v;
var style = document.createElement('style');
style.type = 'text/css';

function str(a) {return a.replace(/\s/g, "");}
function scr() {return location.hash="#"+str(""+this.innerText).substr(+this.dex);}
function invert() {cookset('bw',v=!v);document.documentElement.setAttribute("in",+v)}

window.addEventListener("load",start);
function start() {
v=!cookget('bw');invert();
document.body.setAttribute("load",1)

var ss=document.styleSheets[1];
var css=(ss.cssRules?ss.cssRules:ss.rules);
function classify(cl,nm,vl,ye,no) {
var l=[];
for (var i=0;i<css.length;i++) {
if(css[i].style&&(ye?css[i].style[ye]&&!css[i].style[no]:css[i].style[nm]==vl)) l.push(css[i].selectorText);}
for (var m=0;m<l.length;m++) {j=document.getElementsByClassName(l[m].substr(1));
for (var k=0;k<j.length;k++) {j[k].classList.add(cl)}}
return l;}

function dexify(l) {
for (var i=0;i<l.length;i++) y=y.concat([].slice.call(document.getElementsByClassName(l[i].replace(/\./g, ""))))
for (var i=0;i<y.length;i++) {
	var n=str(y[i].innerText);y[i].id=n;
	y[i].dex=(n.charAt(0)==">")
	y[i].onclick=(y[i].dex?scr:scr);}}

classify("red","color","rgb(255, 0, 0)");
classify("eg","color","rgb(102, 102, 102)");
classify("ul","text-decoration","underline");
classify("sup","vertical-align","super");
classify("sub","vertical-align","sub");
dexify(classify("tit",0,0,"backgroundColor","padding"));
document.getElementById("[Suryoyo.Simple.]").onclick=invert;
if (location.hash) setTimeout(function(){document.getElementById(location.hash.split("#")[1]).scrollIntoView();},1);
}