// Add this : <script src="./JS-FABigation.js"></script>

function FABigation() {

	window.FABigation = undefined
	var L = document.createElement("div"), R = document.createElement("div");
		L.className = R.className = "FABdo"; 
		L.id = "LFAB"; L.setAttribute("IO",0);
		R.id = "RFAB"; 	R.setAttribute("IO",0);
	var B = document.createElement("div"), T = document.createElement("div");
		B.className = T.className = "FABdo";
		T.id = "TFAB"; T.setAttribute("IO",0);
		B.id = "BFAB"; B.setAttribute("IO",0);
	var oldDY = 0, oldCX = 0, Z = 91, TAr = [];

	function setIO(Fon,Foff,IO) {
		if (Fon) {
			(Fon).setAttribute("IO",IO);
			clearTimeout(Fon.T);
			Fon.T = setTimeout(function(){(Fon).setAttribute("IO",0);}, 1500*IO);
		}
		(Foff).setAttribute("IO",0);
	}

	function back() {window.history.back()}
	L.addEventListener("click", back, {passive: true});
	function forward() {window.history.forward()}
	R.addEventListener("click", forward, {passive: true});
	function home() {window.scrollTo({top: 0, behavior: "smooth"})} // (CSS.supports("-moz-user-select","none")?"smooth":"smooth")
	B.addEventListener("click", home, {passive: true});
	function reload() {location.reload();}
	T.addEventListener("click", reload, {passive: true});

	function atEnd() {
		var c = [document.body.scrollHeight, document.body.offsetHeight]
		return (window.innerHeight + window.scrollY + 2 >= (c[0]>c[1]?c[0]:c[1]))
	}

	function wheel(e) {
		if (!e.deltaY && oldCX==e.clientX && window.history.length>1) {
		    if (e.deltaX>Z && (R.getAttribute("IO")!=1)) {
		    	setIO(R,L,1); forward();
		    }
				else
			if (e.deltaX>Z/2 && (R.getAttribute("IO")!=1)) setIO(R,L,0.5)
				else
			if (e.deltaX<-Z && (L.getAttribute("IO")!=1)) {
				setIO(L,R,1); back();
			}
				else
			if (e.deltaX<-Z/2 && (L.getAttribute("IO")!=1)) setIO(L,R,0.5)
		}
		oldCX = e.clientX

		if (!oldDY || Math.abs(oldDY)>Z) {
			if (!window.pageYOffset && oldDY<-Z && (T.getAttribute("IO")!=1)) {
				if (e.deltaY<-Z) setIO(T,B,1)
					else
				if (e.deltaY<-Z/2) setIO(T,B,0.5)
			}
				else
			if (oldDY>Z && atEnd() && (B.getAttribute("IO")!=1)) {
				if (e.deltaY>Z) setIO(B,T,1)
					else
				if (e.deltaY>Z/2) setIO(B,T,0.5)
			}
		}
		oldDY = Math.round(e.deltaY/10)*10
	}

	window.addEventListener('wheel', wheel, {passive: true});

	function Tmove(e) {
		TAr.push([e.changedTouches[0].pageX,e.changedTouches[0].pageY,e.changedTouches[0].clientX,e.changedTouches[0].clientY])
		TAr.multi = (TAr.multi?true:(e.changedTouches[1]!=undefined))

		function TArO(N,n) {TAr[N] = TAr[0][n] - TAr[TAr.length-1][n]}
		TArO("PdX", 0); TArO("PdY", 1); TArO("CdX", 2); TArO("CdY", 3);
		if (Math.abs(TAr.CdY) > Z/2) TAr.Ying = 1;
		if (Math.abs(TAr.CdX) > Z/2) TAr.Xing = 1;

		if (!TAr.multi) {
			if (TAr.Xing && !TAr.Ying) {
				if (TAr.PdX > Z/2)  
					setIO(R,L,0.5);
				if (TAr.PdX > Z*2)
					setIO(R,L,1);
				if (TAr.PdX < -Z/2) 
					setIO(L,R,0.5);
				if (TAr.PdX < -Z*2)
					setIO(L,R,1);
			}
			if (TAr.Ying && !TAr.Xing) {
				if (atEnd()) {
					if (TAr.PdY > Z/2) setIO(B,T,0.5);
					if (TAr.PdY > Z*2) setIO(B,T,1);
				}
				if (!window.pageYOffset) {
					if (TAr.PdY < -Z/2) setIO(T,B,0.5);
					if (TAr.PdY < -Z*2) setIO(T,B,1);
				}
			}
		}
	}

	function Tstart(e) {TAr = [];}
	window.addEventListener('touchstart', Tstart, {passive: true});	
	window.addEventListener('touchmove', Tmove, {passive: true});

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
		background: hsl(0,0%,25%);
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

	.FABdo:hover:active {
		box-shadow: inset 0 0 0 1px hsla(0,0%,0%,.5), inset 0 0 0 4px var(--highlight, highlight);
		opacity: .99;
	}

	.FABdo[IO="0"]:not(:hover):not(:active) {
		pointer-events: none;
		transition: all 0 none;
		opacity: 0;
	}

	@media (hover: hover) and (pointer: fine) {
	.FABdo:hover {
		opacity: .825;
	}
	}

/**/
	html, body {overscroll-behavior-x: none;}

	#LFAB, #RFAB {
		top: 50%;
	}

	#LFAB {
		left:0;
		transform: translate(0,-50%) rotate(-90deg);
	}

	#LFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(-50%,-50%) rotate(-90deg);
	}

	#LFAB[IO="0"]:not(:hover):not(:active) {
		transform: translate(-100%,-50%) rotate(-90deg);
	}

	#RFAB {
		right:0;
		transform: translate(0,-50%) rotate(90deg);
	}

	#RFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(50%,-50%) rotate(90deg);
	}

	#RFAB[IO="0"]:not(:hover):not(:active) {
		transform: translate(100%,-50%) rotate(90deg);
	}

/**/
	#TFAB:before {
		clip-path: none;
		border-radius: 100%;
		top: 0;
	}

	#TFAB {
		top: 0; left: 50%;
		transform: translate(-50%, 0);
	}

	#TFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(-50%, -50%);
	}

	#TFAB[IO="0"]:not(:hover):not(:active) {
		transform: translate(-50%, -100%);
	}

	#BFAB {
		transform: translate(0);
		bottom: 0; right: 0;
	}

	#BFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(0, 50%);
	}

	#BFAB[IO="0"]:not(:hover):not(:active) {
		transform: translate(0, 100%);
	}
	`
	document.head.appendChild(css);
	document.body.appendChild(L);
	document.body.appendChild(R);
	document.body.appendChild(B);
	document.body.appendChild(T);
}

if (document.readyState != "loading") FABigation(); else window.addEventListener("load", FABigation);