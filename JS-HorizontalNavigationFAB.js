// Add this : <script src="./JS-HorizontalNavigationFAB.js"></script>

function HFAB() {
	window.HFAB = undefined
	var L = document.createElement("div"), R = document.createElement("div");
		L.className = R.className = "FABdo"; 
		L.id = "LFAB"; L.setAttribute("X",0);
		R.id = "RFAB"; 	R.setAttribute("X",0);
	var oldY = oldX = 0, Z=122;

	function setX(Fon,Foff,X) {
		if (Fon) {
			(Fon).setAttribute("X",X);
			setTimeout(function(){if ((Fon).getAttribute("X")==X) (Fon).setAttribute("X",0);}, 1500);
		}
		(Foff).setAttribute("X",0);
	}

	function back() {window.history.back()}
	L.addEventListener("click", back, {passive: true});
	function forward() {window.history.forward()}
	R.addEventListener("click", forward, {passive: true});

	function wheel(e) {
		if (!e.deltaY && oldX==e.clientX && window.history.length>1) {
		    if (e.deltaX>Z && (R.getAttribute("X")!=1)) {
		    	setX(R,L,1); forward();
		    }
				else
			if (e.deltaX>Z/2 && (R.getAttribute("X")!=1)) setX(R,L,0.5)
				else
			if (e.deltaX<-Z && (L.getAttribute("X")!=1)) {
				setX(L,R,1); back();
			}
				else
			if (e.deltaX<-Z/2 && (L.getAttribute("X")!=1)) setX(L,R,0.5)
		}
		oldX = e.clientX
	}

	window.addEventListener('wheel', wheel, {passive: true});

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

/**/
	html, body {overscroll-behavior-x: none;}

	#LFAB, #RFAB {
		top: calc(41vmin - 2.5vh);
		xpointer-events: none;
	}

	#LFAB {
		left:0;
		transform: translateX(0) rotate(-90deg);
	}

	#LFAB[X="0.5"]:not(:hover):not(:active) {
		transform: translateX(-50%) rotate(-90deg);
	}

	#LFAB[X="0"]:not(:hover):not(:active) {
		transform: translateX(-100%) rotate(-90deg);
	}

	#RFAB {
		right:0;
		transform: translateX(0) rotate(90deg);
	}

	#RFAB[X="0.5"]:not(:hover):not(:active) {
		transform: translateX(50%) rotate(90deg);
	}

	#RFAB[X="0"]:not(:hover):not(:active) {
		transform: translateX(100%) rotate(90deg);
	}
	`
	document.head.appendChild(css);
	document.body.appendChild(L);
	document.body.appendChild(R);
}

if (document.readyState != "loading") HFAB(); else window.addEventListener("load", HFAB);