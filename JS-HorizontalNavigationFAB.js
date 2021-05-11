// Add this : <script src="./JS-HorizontalNavigationFAB.js"></script>

if (!document.getElementById("LFAB")) {
	if (document.readyState === "complete") HFAB(); else window.addEventListener("load", HFAB);
}

function HFAB() {
	var L = document.createElement("div"), R = document.createElement("div");
		L.className = R.className = "FABdo"; 
		L.id = "LFAB"; L.setAttribute("X",0);
		R.id = "RFAB"; 	R.setAttribute("X",0);
	var oldY = oldX = 0, Z=122;

	function wheel(e) {
		if (!e.deltaY && oldX==e.clientX && window.history.length>1) {
		    if (e.deltaX>Z && (R.getAttribute("X")==0)) {
			R.setAttribute("X",1); L.setAttribute("X",0);
			setTimeout(function(){R.setAttribute("X",0);}, 700);
			window.history.forward();
		    e.preventDefault();
		    }
		else
			if (e.deltaX<-Z && (L.getAttribute("X")==0)) {
			L.setAttribute("X",1); R.setAttribute("X",0);
			setTimeout(function(){L.setAttribute("X",0);}, 700);
			window.history.back();
			e.preventDefault();
			}
		}
		oldX = e.clientX
	}

	window.addEventListener('wheel', wheel, {passive: false});

	const css = document.createElement("style");
	css.textContent = `
	.FABdo {
		all: initial;
		z-index: 9999;
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

		opacity:0;
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

	.FABdo[X="1"] {
		opacity:.5;
	}

	#LFAB, #RFAB {
		top: calc(41vmin - 2.5vh);
		pointer-events: none;
	}

	#LFAB {
		left:0;
		transform: translateX(-100%) rotate(-90deg);
	}

	#RFAB {
		right:0;
		transform: translateX(100%) rotate(90deg);
	}

	#LFAB[X="1"] {
		transform: translateX(0%) rotate(-90deg);
	}

	#RFAB[X="1"] {
		transform: translateX(0%) rotate(90deg);
	}
	`
	document.head.appendChild(css);
	document.body.appendChild(L);
	document.body.appendChild(R);
}