// JS-SmoothScrollToTopFAB

if (document.readyState === "complete") FABstart(); else window.addEventListener("load", FABstart);

function FABstart() {
	var up = document.createElement("div");
	up.id = "FABup";

	function home() {window.scrollTo({top: 0, behavior: "smooth"})}
	up.addEventListener("click", home, {passive: true});
	
	function chktp() {document.body.setAttribute("FABtop", +(window.pageYOffset < 100))}
	window.addEventListener("scroll", chktp, {passive: true})
	chktp();

	const css = document.createElement("style");
	css.textContent = `
#FABup {
	all: initial;
	z-index: 99;
	cursor: pointer;
	user-select: none;
	-moz-user-select: none;
	-webkit-tap-highlight-color: transparent;
	position: fixed;
	border-radius: 100%;
	padding: 24px;
	width: 8vmin;
	height: 8vmin;
	margin: 5vmin;
	background: black;
	bottom: 0;
	right: 0;
	text-align: center;
	transition: transform .15s, opacity .15s;
	opacity: .5;
}
#FABup:before {
	content: "";
	font-size: 0;
	padding: 4vmin;
	line-height: 8vmin;
	background: white;
	position: relative;
	top: -8.33%;
	clip-path: polygon(50% 0%, 100% 86.6%, 0% 86.6%);
}
[FABtop="1"] #FABup {
	transform: translateY(100%);
	opacity: 0;
	pointer-events: none;
}
#FABup:hover:active {
	transition: none;
	opacity: .99
}
`
	document.head.appendChild(css);
	document.body.appendChild(up)
}
