// Add this : <script src="./JS-SmoothScrollToTopFAB.js"></script>

function SFAB() {
	window.SFAB = undefined
	var up = document.createElement("div");
	up.className = "FABdo";	up.id = "FABup";

	function home() {window.scrollTo({top: 0, behavior: "smooth"})}
	up.addEventListener("click", home, {passive: true});
	
	function chktp() {up.setAttribute("X", +!(window.pageYOffset < 100))}
	window.addEventListener("scroll", chktp, {passive: true})
	chktp();

	const css = document.createElement("style");
	css.textContent = `
	.FABdo {
		all: initial;
		z-index: 9999;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		-moz-user-select: none;
		user-select: none;
		position: fixed;
		border-radius: 100%;
		padding: 2.5vh;
		width: 8vmin;
		height: 8vmin;
		background: black;
		text-align: center;
		transition: transform .15s, opacity .15s;
		border: 5vh solid transparent;
		background-clip: padding-box;
		opacity:.5;
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

	.FABdo:hover {
		opacity: .75;
	}

	.FABdo:hover:active {
		box-shadow: inset 0 0 0 3px var(--highlight, highlight);
		opacity: .99;
	}

	.FABdo[X="0"]:not(:hover):not(:active) {
		pointer-events: none;
		opacity: 0;
	}

	#FABup {
		bottom: 0;
		right: 0;
		transform: translateY(0px);
	}

	#FABup[X="0"]:not(:hover):not(:active) {
		transform: translateY(100%);
	}

	#BFAB {
		display: none;
	}
	`
	document.head.appendChild(css);
	document.body.appendChild(up)
}

if (document.readyState != "loading") SFAB(); else window.addEventListener("load", SFAB);