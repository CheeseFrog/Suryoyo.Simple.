// Add this : <script src="./JS-SmoothScrollToTopFAB.js"></script>

if (document.readyState === "complete") SFAB(); else window.addEventListener("load", SFAB);

function SFAB() {
	var up = document.createElement("div");
	up.className = "FABdo";	up.id = "FABup";

	function home() {window.scrollTo({top: 0, behavior: "smooth"})}
	up.addEventListener("click", home, {passive: false});
	
	function chktp() {document.body.setAttribute("FABtop", +(window.pageYOffset < 100))}
	window.addEventListener("scroll", chktp, {passive: true})
	chktp();

	const css = document.createElement("style");
	css.textContent = `
.FABdo {
	all: initial;
	z-index: 99;
	cursor: pointer;
	user-select: none;
	-moz-user-select: none;
	-webkit-tap-highlight-color: transparent;
	position: fixed;
	border-radius: 100%;
	padding: 2.5vh;
	width: 8vmin;
	height: 8vmin;
	margin: 5vmin;
	background: black;
	text-align: center;
	transition: transform .15s, opacity .15s;
}

.FABdo:before {
	content: "";
	font-size: 0;
	display: block;
	height: 8vmin;
	background: white;
	top:-6.7%;
	position: relative;
	clip-path: polygon(50% 0%, 100% 86.6%, 0% 86.6%);
}

#FABup {
	bottom: 0;
	right: 0;
	transform: translateY(0px);
	opacity: .5;
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
