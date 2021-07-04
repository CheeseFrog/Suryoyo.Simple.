// FABigation 0.92
// Add this : <script src="./JS-FABigation.js"></script>

var FABkey = {
	"TSS": 100, // touchscreen sensitivity
	"TPS": 100, // touchpad sensitivity
	"Auto": 1, // automatic gestures
	"Sticky": 1, // sticky scroll-to-top
	"Hori": 1, // enable horizontal gestures
	"Vert": 1 // enable vertical gestures
}

function FABigation() { window.FABigation = function() {}

	var webx = (typeof browser !== "undefined" || typeof chrome !== "undefined")

	function sync() { noIO()
		function output(result) {
			FABkey[Object.keys(result)[0]] = Number(result[Object.keys(result)])
		}
		for (var i in FABkey) {
			if (typeof browser !== 'undefined') browser.storage.sync.get(i).then(output);
			 else chrome.storage.sync.get(i,output)
		}
	}
	if (webx) ((typeof browser !== 'undefined')?browser:chrome).storage.onChanged.addListener(sync)

	function auto(F) {
		if (auto.pause) return;
		if (F==L) back();
		if (F==R) forward();
		if (F==T) reload();
		if (F==B && !isScroll.on) home();
		auto.pause=setTimeout(function(){auto.pause=0;},500)
	}

	function setIO(Fon,Foff,IO) {
		if (Fon) {
			if ((Fon==R || Fon==L)) {
				if (!FABkey["Hori"]) return;
				(Fon).setAttribute("D",window.history.length);
			}
			if ((Fon==T || Fon==B))
				if (!FABkey["Vert"]) return;
			if (Fon==B && atEnd()) (Fon).setAttribute("D", atTop())
			if (Fon==B && FABkey["Sticky"]) return;
			clearTimeout(Fon.T);
			Fon.T = setTimeout(function(){(Fon).setAttribute("IO",0);(Fon).IO=0;}, 1500*IO);
			(Fon).setAttribute("IO",IO); (Fon).IO = IO;
			if (FABkey["Auto"] && IO==1) auto(Fon)
		}
		(Foff).setAttribute("IO",0); (Foff).IO = 0;
	}

	var BG = document.createElement("span"), L = document.createElement("div"), R = document.createElement("div"), B = document.createElement("div"), T = document.createElement("div");
		L.className = R.className = B.className = T.className = "FABdo", TAr = [];
		L.id = "LFAB"; R.id = "RFAB"; T.id = "TFAB"; B.id = "BFAB";
		BG.appendChild(L); BG.appendChild(R); BG.appendChild(B); BG.appendChild(T);
	function noIO() {setIO(0,L,0);setIO(0,R,0);setIO(0,T,0);setIO(0,B,0);} noIO() 
	if (webx) sync();

	function back() {window.history.back()}
	L.addEventListener("click", back, {passive: true});
	function forward() {window.history.forward()}
	R.addEventListener("click", forward, {passive: true});
	function home() {window.scrollTo({top:0, behavior:(isScroll.on?"auto":"smooth")})}
	B.addEventListener("click", home, {passive: true});
	function reload() {location.reload();}
	T.addEventListener("click", reload, {passive: true});

	function atTop(y) {return +(window.pageYOffset < (y||3))}
	function atEnd() {return (window.innerHeight + window.scrollY + 3 >= ([document.body.scrollHeight, document.body.offsetHeight, document.scrollingElement.scrollHeight].sort(function(a,b){return b-a}))[0]);}

	function sticky() {var IO = +!atTop(100); if (FABkey["Sticky"] && IO!=B.getAttribute("IO")) B.setAttribute("IO", IO)}
	window.addEventListener("scroll", sticky, {passive: true})

	function isScroll() {clearTimeout(isScroll.on); isScroll.on=setTimeout(function(){isScroll.on=0},10)}

	function wheel(e) { isScroll();
		var Z = 210 - FABkey["TPS"] || 91; 
		if (!e.deltaY && wheel.oldCX==e.clientX) {
		    if (e.deltaX>Z) setIO(R,L,1);
				else
			if (e.deltaX>Z/2) setIO(R,L,(R.IO==1?1:0.5))
				else
			if (e.deltaX<-Z) setIO(L,R,1)
				else
			if (e.deltaX<-Z/2) setIO(L,R,(L.IO==1?1:0.5))
		}
		wheel.oldCX = e.clientX

		if (atTop() && wheel.oldDY<-Z) {
			if (e.deltaY<-Z) setIO(T,B,1)
				else
			if (e.deltaY<-Z/2) setIO(T,B,(T.IO==1?1:0.5))
		}
			else
		if (atEnd() && wheel.oldDY>Z) {
			if (e.deltaY>Z) setIO(B,T,1)
				else
			if (e.deltaY>Z/2) setIO(B,T,(B.IO==1?1:0.5))
		}
		wheel.oldDY = Math.round(e.deltaY/10)*10
	}
	window.addEventListener('wheel', wheel, {passive: true});

	function TArO(N,n) {TAr[N] = TAr[0][n] - TAr[TAr.length-1][n]}
	function Tmove(e) { isScroll();
		var Z = 210 - FABkey["TSS"] || 91; 
		TAr.push([e.changedTouches[0].pageX,e.changedTouches[0].pageY,e.changedTouches[0].clientX,e.changedTouches[0].clientY])
		TAr.multi = (TAr.multi?true:(e.changedTouches[1]!=undefined))
		TArO("PdX", 0); TArO("PdY", 1); TArO("CdX", 2); TArO("CdY", 3);
		if (Math.abs(TAr.CdY) > Z/2) TAr.Ying = 1;
		if (Math.abs(TAr.CdX) > Z/2) TAr.Xing = 1;

		if (!TAr.multi) {
			if (TAr.Xing && !TAr.Ying) {
				if (TAr.PdX > Z*2) setIO(R,L,1);
					else
				if (TAr.PdX > Z/2) setIO(R,L,0.5);
					else
				if (TAr.PdX < -Z*2)	setIO(L,R,1);
					else
				if (TAr.PdX < -Z/2) setIO(L,R,0.5);
			}
			if (TAr.Ying && !TAr.Xing) {
				if (atEnd()) {
					if (TAr.PdY > Z*2) setIO(B,T,1);
						else
					if (TAr.PdY > Z/2) setIO(B,T,0.5);
				}
				if (atTop()) {
					if (TAr.PdY < -Z*2) setIO(T,B,1);
						else
					if (TAr.PdY < -Z/2) setIO(T,B,0.5);
				}
			}
		}
	}
	window.addEventListener('touchmove', Tmove, {passive: true});
	function Tstart(e) {TAr = [];}
	window.addEventListener('touchstart', Tstart, {passive: true});	

	const css = document.createElement("style");
	css.textContent = `
	.FABdo {
		all: initial;
		--FABsize: calc(8vh + 4px);
		z-index: 10001;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		position: fixed;
		border-radius: 100%;
		padding: calc(var(--FABsize) / 3);
		width: var(--FABsize);
		height: var(--FABsize);
		background: hsl(0,0%,33%);
		text-align: center;
		border: calc(var(--FABsize) / 2) solid transparent;
		background-clip: padding-box;
		opacity:.66;
		transition: transform .4s 0s;
	}

	.FABdo:not([IO="0"]) {
		transition: transform .2s 0s;
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
	.FABdo:hover {
		opacity: .825;
	}
	.FABdo[IO="0"]:hover {
		transition: transform .4s 2.5s;
	}
	}

	.FABdo[D="1"] {
		opacity: 0.25 !important;
	}

/**/
	html, body {overscroll-behavior-x: none; overscroll-behavior-y: none;}

	#LFAB, #RFAB {
		top: 50%;
	}

	#LFAB {
		left: 0;
		transform: translate(0,-50%) rotate(-90deg);
	}

	#LFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(-50%,-50%) rotate(-90deg);
	}

	#LFAB[IO="0"]:not(:active) {
		transform: translate(-100%,-50%) rotate(-90deg);
	}

	#RFAB {
		right:0;
		transform: translate(0,-50%) rotate(90deg);
	}

	#RFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(50%,-50%) rotate(90deg);
	}

	#RFAB[IO="0"]:not(:active) {
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

	#TFAB[IO="0"]:not(:active) {
		transform: translate(-50%, -100%);
	}

	#BFAB {
		transform: translate(0);
		bottom: 0; right: 0;
	}

	#BFAB[IO="0.5"]:not(:hover):not(:active) {
		transform: translate(0, 50%);
	}

	#BFAB[IO="0"]:not(:active) {
		transform: translate(0, 100%);
	}
	`
	document.head.appendChild(css);
	document.body.appendChild(BG);
}

if (document.readyState != "loading") FABigation(); else window.addEventListener("load", FABigation);