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