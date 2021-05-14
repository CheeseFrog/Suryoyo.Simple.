// Add this if JS-HorizontalNavigationFAB.js is running : <script src="./JS-VFABaddon.js"></script>

function VFAB() {
	window.VFAB = undefined
	var B = document.createElement("div"), T = document.createElement("div");
		B.className = T.className = "FABdo";
		T.id = "TFAB"; T.setAttribute("X",0);
		B.id = "BFAB"; B.setAttribute("X",0);
	var oldY = 0, Z=122;

	function setX(Fon,Foff,X) {
		if (Fon) {
			(Fon).setAttribute("X",X);
			setTimeout(function(){if ((Fon).getAttribute("X")==X) (Fon).setAttribute("X",0);}, 1500);
		}
		(Foff).setAttribute("X",0);
	}

	function home() {window.scrollTo({top: 0, behavior: "smooth"})} // (CSS.supports("-moz-user-select","none")?"smooth":"smooth")
	B.addEventListener("click", home, {passive: true});
	function reload() {location.reload();}
	T.addEventListener("click", reload, {passive: true});

	function end() {
	var c = [document.body.scrollHeight, document.body.offsetHeight]
	return (window.innerHeight + window.scrollY + 2 >= (c[0]>c[1]?c[0]:c[1]))
	}

	function wheel(e) {
		if (!oldY || Math.abs(oldY)>Z) {
			if (!window.pageYOffset && oldY<-Z && (T.getAttribute("X")!=1)) {
				if (e.deltaY<-Z) setX(T,B,1)
					else
				if (e.deltaY<-Z/2) setX(T,B,0.5)
			}
				else
			if (oldY>Z && end() && (B.getAttribute("X")!=1)) {
				if (e.deltaY>Z) setX(B,T,1)
					else
				if (e.deltaY>Z/2) setX(B,T,0.5)
			}
		}
		oldY = Math.round(e.deltaY/10)*10
	}

	window.addEventListener('wheel', wheel, {passive: true});

	const css = document.createElement("style");
	css.textContent = `
	#TFAB:before {
		clip-path: none;
		border-radius: 100%;
		top: 0;
	}

	#TFAB {
		top: 0; left: 50%;
		transform: translate(-50%, 0);
	}

	#TFAB[X="0.5"]:not(:hover):not(:active) {
		transform: translate(-50%, -50%);
	}

	#TFAB[X="0"]:not(:hover):not(:active) {
		transform: translate(-50%, -100%);
	}

	#BFAB {
		transform: translate(0);
		bottom: 0; right: 0;
	}

	#BFAB[X="0.5"]:not(:hover):not(:active) {
		transform: translate(0, 50%);
	}

	#BFAB[X="0"]:not(:hover):not(:active) {
		transform: translate(0, 100%);
	}
	`
	document.head.appendChild(css);
		document.body.appendChild(B);
		document.body.appendChild(T);
}

if (document.readyState != "loading") VFAB(); else window.addEventListener("load", VFAB);	

	// function scrollpause() {
	// function SP(e) {e.preventDefault();e.stopPropagation();}
	// window.addEventListener('scroll', SP, {passive: false});
	// window.addEventListener('wheel', SP, {passive: false});
	// setTimeout(function(){window.removeEventListener('scroll', SP);window.removeEventListener('wheel', SP)}, 500);}