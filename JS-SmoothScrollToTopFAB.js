// Add this : <script src="./JS-SmoothScrollToTopFAB.js"></script>

function SFAB() {
	window.SFAB = undefined
	var up = document.createElement("div");
	up.className = "FABdo";	up.id = "FABup";

	function home() {window.scrollTo({top: 0, behavior: "smooth"})}
	up.addEventListener("click", home, {passive: true});
	
	function chktp() {up.setAttribute("IO", +!(window.pageYOffset < 100))}
	window.addEventListener("scroll", chktp, {passive: true})
	chktp();

	const css = document.createElement("style");
	css.textContent = `
	.FABdo {
		all: initial;
		--FABsize: calc(8vh + 4px);
		z-index: 9999;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		-moz-user-select: none;
		user-select: none;
		position: fixed;
		border-radius: 100%;
		padding: calc(var(--FABsize) / 3);
		width: var(--FABsize);
		height: var(--FABsize);
		background: hsl(0,0%,33%);
		text-align: center;
		transition: transform .15s, opacity .15s;
		border: calc(var(--FABsize) / 2) solid transparent;
		background-clip: padding-box;
		opacity:.66;
	}

	.FABdo:before {
		content: "";
		font-size: 0;
		display: block;
		height: var(--FABsize);
		background: white;
		top:-6.7%;
		position: relative;
		clip-path: polygon(50% 0%, 100% 86.6%, 0% 86.6%);
	}

	.FABdo[IO]:active:hover {
		box-shadow: inset 0 0 0 0.5px hsl(0,0%,33%), inset 0 0 0 4px var(--highlight, highlight);
		opacity: .99;
	}

	@media (hover: hover) and (pointer: fine) {
	.FABdo:not([IO="0"]):hover {
		opacity: .825;
	}
	.FABdo[IO="0"]:hover {
		transition: transform .15s 1.5s, opacity .15s;
	}
	}

	.FABdo[D="1"] {
		opacity: 0.25 !important;
	}

/**/
	#FABup {
		bottom: 0;
		right: 0;
		transform: translateY(0px);
	}

	#FABup[IO="0"]:not(:active) {
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