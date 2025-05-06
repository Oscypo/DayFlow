function updateFinisherHeader() {
	let finisherbgc =
		localStorage.getItem("theme") === "dark" ? "#080a0d" : "#f2f4f7";

	document.querySelectorAll("canvas").forEach((canvas) => canvas.remove());
	document.body.style.backgroundColor = finisherbgc;

	setTimeout(() => {
		new FinisherHeader({
			count: 20,
			size: {
				min: 2,
				max: 40,
				pulse: 0.1,
			},
			speed: {
				x: {
					min: 0,
					max: 0.5,
				},
				y: {
					min: 0,
					max: 0.2,
				},
			},
			colors: {
				background: finisherbgc,
				particles: ["#507ab1", "#385171"],
			},
			blending: "screen",
			opacity: {
				center: 1,
				edge: 0.9,
			},
			skew: 0,
			shapes: ["c"],
		});
	}, 100);
}

updateFinisherHeader();

window.addEventListener("storage", (event) => {
	if (event.key === "theme") {
		updateFinisherHeader();
	}
});

document.getElementById("theme-toggle")?.addEventListener("click", () => {
	let currentTheme =
		localStorage.getItem("theme") === "dark" ? "light" : "dark";
	localStorage.setItem("theme", currentTheme);
	updateFinisherHeader();
});
