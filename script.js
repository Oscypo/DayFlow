var all_register_data = [];
PushToAll = () => {
	localstorage_register_counter = localStorage.getItem("register_counter");
	all_register_data.length = 0;
	for (let i = 1; i <= localstorage_register_counter; i++) {
		all_register_data.push(localStorage.getItem("register_data" + i));
	}
	return all_register_data;
};

typingEffect = (text, placeID) => {
	for (let i = 0; i < text.length; i++) {
		setTimeout(() => {
			document.getElementById(placeID).innerHTML += text[i];
		}, 100 * i);
	}
};
let onas = document.querySelector(".onas");
if (window.location.pathname.includes("onas.html")) {
	window.onload = () => {
		typingEffect("Kim Jesteśmy?", "onas_h");
		setTimeout(() => {
			onas.style.opacity = "1";
		}, 1500);
	};
}
if (window.location.pathname.includes("index.html")) {
	if (!window.location.pathname.includes("in-index.html")) {
		window.onload = () => {
			document.getElementById("effectH3").innerText = "W";
			typingEffect("itamy na DayFlow", "effectH3");
			setTimeout(() => {
				if (onas) {
					onas.style.opacity = "1";
				}
			}, 1500);
		};
	}
}
//API
let apiQuote = document.querySelector(".api i");
let apiAuthor = document.querySelector(".authorBox");
fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		let quote = data[0].q;
		let author = data[0].a;
		if (apiQuote && apiAuthor) {
			apiQuote.innerText = quote;
			apiAuthor.innerText = "~ " + author;
		}
	})
	.catch((error) => console.error("Błąd:", error));

var logout_buttons = document.querySelectorAll(".logout_button");
if (localStorage.getItem("logged_in") == "true") {
	localStorage.setItem("logged_in", true);
	logout_buttons.forEach((button) => {
		button.addEventListener("click", () => {
			localStorage.setItem("logged_in", false);
			logged_in_miniprofile.style.display = "none";
			profile_svg.style.display = "block";
			window.location.href = "login.html";
			PushToAll();
		});
	});
} else {
	localStorage.setItem("logged_in", false);
	localStorage.setItem("login_notification_showed", false);
	localStorage.setItem("instructions_showed", false);
}
expand = document.getElementById("expand");
let allSpans = document.querySelectorAll("span");
var extended = false;

//intersection observer

var observer = new IntersectionObserver(function (entries) {
	entries.forEach(function (entry) {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
		} else {
			entry.target.classList.remove("visible");
		}
	});
});

// document.querySelectorAll("#list_body").forEach((e) => {
// 	observer.observe(e);
// });
let accessibilitySettings = document.querySelector(".accessibility-settings");
//nav code
let sidebar_extend = () => {
	if (!extended) {
		document.getElementById("sidebar").style.flex = 2;
		extended = true;
		allSpans.forEach((span) => {
			span.style.display = "inline";
		});
	} else {
		accessibilitySettings.classList.remove("active");
		document.getElementById("sidebar").style.flex = 0.5;
		extended = false;
		profile.style.flex = 1;
		allSpans.forEach((span) => {
			span.style.display = "none";
		});
		profile_svg.style.display = "block";
		if (logged_in_miniprofile) {
			logged_in_miniprofile.style.display = "none";
		}
	}
};
expand.addEventListener("click", () => {
	sidebar_extend();
});
profile = document.getElementById("profile");
profile_svg = document.getElementById("profile_svg");
profile_svg1 = document.getElementById("profile_svg1");
logged_in_miniprofile = document.getElementById("logged_in_miniprofile");

extendProfile = () => {
	setTimeout(() => {
		console.log("pressed profile as logged in");
		profile_svg.style.display = "none";
		logged_in_miniprofile.style.display = "block"; // This line will execute after 1s delay
		document.getElementById("profile_name").innerHTML = `<h2>${
			localStorage
				.getItem(localStorage.getItem("currently_logged_as"))
				.split(" ")[0]
		}</h2>`;
	}, 1000); // 1000 milliseconds = 1 second
};
profile.addEventListener("click", () => {
	extended = false;
	sidebar_extend();
	if (localStorage.getItem("logged_in") == "true") {
		extendProfile();
	}
	profile.style.flex = 6;
});
//accessibility settings
let accessibility = document.querySelector(".accessibility-button");
if (accessibility) {
	accessibility.addEventListener("click", () => {
		extended = false;
		sidebar_extend();
		accessibilitySettings.classList.toggle("active");
	});
}
let accessibilitySettingsList = document.querySelectorAll(
	".accessibility-settings ol li"
);
function updateAccessibilitySettings() {
	if (localStorage.getItem("greyscale") == "true") {
		document.body.style.filter = "grayscale(100%)";
	} else {
		document.body.style.filter = "none";
	}
	document.body.style.fontSize = localStorage.getItem("fontsize") + "rem";
}
accessibilitySettingsList.forEach((e, i) => {
	e.addEventListener("click", () => {
		if (i == 0) {
			if (localStorage.getItem("greyscale") == "true") {
				localStorage.setItem("greyscale", false);
			} else {
				localStorage.setItem("greyscale", true);
			}
		}
		if (i == 1) {
			localStorage.setItem(
				"fontsize",
				parseFloat(localStorage.getItem("fontsize")) + 0.1
			);
		}
		if (i == 2) {
			localStorage.setItem(
				"fontsize",
				parseFloat(localStorage.getItem("fontsize")) - 0.1
			);
		}
		updateAccessibilitySettings();
	});
});

//FooterClass
class TFooter extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<footer>
		<div class="minifooter">projekt ucznia ZSK</div>
		<div class="minifooter" id="midfooter">Michał Wietrzyński 2d</div>
		<div class="minifooter">Kontakt: <a href="mailto:abcd@gmail.com">example@gmail.com</a></div>
	</footer>`;
	}
}
customElements.define("t-footer", TFooter);

// Funkcja do przełączania trybów jasny/ciemny
const themeToggleButton = document.getElementById("theme-toggle");
function toggleTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
}
let getFormattedDate = () => {
	//tworzenie zmiennej z data sformatowana do validacji formularzy
	const d = new Date();
	const dt = d.getDate();
	const month = d.getMonth() + 1;
	const year = d.getFullYear();
	if (dt < 10) {
		var dtFormat = "0" + dt;
	} else {
		var dtFormat = dt;
	}
	if (month < 10) {
		var monthFormat = "0" + month;
	} else {
		var monthFormat = month;
	}
	return year + "-" + monthFormat + "-" + dtFormat;
};
document.addEventListener("DOMContentLoaded", () => {
	if (!localStorage.getItem("fontsize")) {
		localStorage.setItem("fontsize", 1);
	}
	updateAccessibilitySettings();

	const currentDate = getFormattedDate();
	console.log("currentDate=" + currentDate);

	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		document.documentElement.setAttribute("data-theme", savedTheme);
	}

	//wiadomosc po skontaktowaniu sie
	if (document.querySelector("[class*=formK]")) {
		document.querySelector("[class*=formK]").addEventListener("submit", (e) => {
			e.preventDefault(); // zatrzymuje domyślne wysyłanie formularza
			console.log("wiadomość została wysłana");
			notification(
				"var(--secondary)",
				"var(--text)",
				"wiadomość została wysłana"
			);
		});
	}

	let DisplayDifference = (date) => {
		let formattedCurrentDate = new Date(currentDate);
		let formattedTaskdate = new Date(date);
		let differenceBefore = formattedTaskdate - formattedCurrentDate;
		let difference = differenceBefore / (1000 * 3600 * 24);
		console.log(difference);
		return difference;
	};
	let DisplaytasksNumber = () => {
		let i = 0;
		JSON.parse(
			localStorage.getItem(
				localStorage.getItem("currently_logged_as") + "Tasks"
			)
		).tasksArray.forEach((task) => {
			let difference = DisplayDifference(task.date);
			if (difference <= 7 && difference >= 0) {
				i += 1;
			}
		});
		return i;
	};
	let tasksNumber = document.querySelector(".tasksNumber h1");
	if (tasksNumber) {
		tasksNumber.textContent = DisplaytasksNumber();
	}

	let dropdowns = document.querySelectorAll(".about_us_2 h2");
	dropdowns.forEach((e) => {
		e.addEventListener("click", () => {
			if (e.textContent.includes("Funkcje")) {
				let content1 = document.querySelector(".about_us_2 ul:nth-of-type(1)");
				content1.classList.toggle("active");
			}
			if (e.textContent.includes("Nasza")) {
				let content1 = document.querySelector(".about_us_2 p:nth-of-type(1)");
				content1.classList.toggle("active");
			}
			if (e.textContent.includes("Dlaczego")) {
				let content1 = document.querySelector(".about_us_2 ul:nth-of-type(2)");
				content1.classList.toggle("active");
			}
		});
	});
	//nav home redirection
	let headerH1 = document.querySelector("header h1");
	headerH1.addEventListener("click", () => {
		if (localStorage.getItem("logged_in") == "true") {
			window.location.href = "logged-in-index.html";
		} else {
			window.location.href = "index.html";
		}
	});
	//To-Do List
	var tasksArray = [];
	if (
		localStorage.getItem(localStorage.getItem("currently_logged_as") + "Tasks")
	) {
		tasksArray = [
			...JSON.parse(
				localStorage.getItem(
					localStorage.getItem("currently_logged_as") + "Tasks"
				)
			).tasksArray,
		];
	}
	class Task {
		constructor(title, date) {
			this.title = title;
			this.date = date;
		}
	}
	class userTasks {
		constructor(user, tasksArray) {
			this.user = user;
			this.tasksArray = tasksArray;
		}
	}
	let addTaskButton = document.querySelector("#add_task");
	let listBody = document.querySelector("#list_body");

	let createTask = (taskName = "", taskDateValue = "") => {
		let newTask = document.createElement("section");
		newTask.className = "newTask";

		let taskForm = document.createElement("form");
		taskForm.className = "taskForm";

		let taskInput = document.createElement("input");
		taskInput.type = "text";
		taskInput.className = "taskInput";
		taskInput.placeholder = "nazwa:";
		taskInput.required = true;
		taskInput.value = taskName;

		let taskDelete = document.createElement("button");
		taskDelete.className = "taskDelete";
		taskDelete.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

		let taskDate = document.createElement("input");
		taskDate.placeholder = "kilknij aby ustawić datę";
		taskDate.type = "date";
		taskDate.className = "taskDate";
		taskDate.required = true;
		taskDate.value = taskDateValue;

		//adding everything to the task
		listBody.appendChild(newTask);
		newTask.appendChild(taskForm);
		newTask.appendChild(taskDelete);
		taskForm.appendChild(taskInput);
		taskForm.appendChild(taskDate);
		taskInput.focus();
		taskForm.addEventListener("submit", (event) => {
			if (taskDate.value < currentDate) {
				notification(
					"var(--secondary)",
					"var(--text)",
					"data nie może być z przeszłości"
				);
				event.preventDefault();
				console.log(taskDate.value);
				taskDate.focus();
			} else if (taskInput.value.length > 20) {
				notification(
					"var(--secondary)",
					"var(--text)",
					"tekst nie może zawierać więcej niż 10 znaków"
				);
				event.preventDefault();
				taskInput.focus();
			} else {
				//tworzenie objektu
				let taskObj = new Task(taskInput.value, taskDate.value);
				tasksArray.push(taskObj);
				console.log(taskObj); //temporary
				console.log(tasksArray);
				let userTasksObj = new userTasks(
					localStorage.getItem("currently_logged_as"),
					tasksArray
				);
				localStorage.setItem(
					localStorage.getItem("currently_logged_as") + "Tasks",
					JSON.stringify(userTasksObj)
				);
				console.log(userTasksObj); //temporary
				console.log(JSON.parse(localStorage.getItem("register_data2Tasks")));

				//wylaczenie edycji po utworzeniu
				console.log("Task submitted: " + taskInput.value);
				taskInput.disabled = true;
				newTask.classList.remove("NewTask");
				newTask.classList.add("task");
			}
		});
		taskDelete.addEventListener("click", () => {
			listBody.removeChild(newTask);
			console.log("Task deleted");
		});

		console.log("Task added");
	};

	function showTask(task, container) {
		let newTask = document.createElement("section");
		newTask.className = "newTask";

		let taskForm = document.createElement("section");
		taskForm.className = "taskForm";

		let taskInput = document.createElement("section");
		taskInput.className = "taskInput";
		taskInput.innerHTML = task.title + "<br>";

		let taskDate = document.createElement("section");
		taskDate.className = "taskDate";
		taskDate.textContent = task.date;

		taskForm.style.backgroundColor = "var(--secondary)";
		taskForm.style.borderRadius = "var(--default-angle)";
		// Adding everything to the task
		if (container) {
			container.appendChild(newTask);
		}
		newTask.appendChild(taskForm);
		taskForm.appendChild(taskInput);
		taskForm.appendChild(taskDate);
		newTask.classList.remove("NewTask");
		newTask.classList.add("task");

		console.log("Task added");
	}

	let todaysTasksContainer = document.querySelector(".todaysTasks");

	if (todaysTasksContainer) {
		JSON.parse(
			localStorage.getItem(
				localStorage.getItem("currently_logged_as") + "Tasks"
			)
		).tasksArray.forEach((task) => {
			if (todaysTasksContainer.children.length < 5) {
				if (task.date == currentDate) {
					showTask(task, todaysTasksContainer);
				}
			}
		});
	}

	let createExistingTasks = (userTasks) => {
		for (let i = 0; i < userTasks.tasksArray.length; i++) {
			let newTask = document.createElement("section");
			newTask.className = "newTask";

			let taskForm = document.createElement("section");
			taskForm.className = "taskForm";

			let taskInput = document.createElement("section");
			taskInput.className = "taskInput";
			taskInput.innerHTML = userTasks.tasksArray[i].title + "<br>";

			let taskDelete = document.createElement("button");
			taskDelete.className = "taskDelete";
			taskDelete.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

			let taskDate = document.createElement("section");
			taskDate.className = "taskDate";
			taskDate.textContent = userTasks.tasksArray[i].date;
			if (taskDate.textContent < currentDate) {
				console.log("Difference = " + DisplayDifference(taskDate.textContent));
				if (Math.abs(DisplayDifference(taskDate.textContent)) > 7) {
					let tasks = JSON.parse(
						localStorage.getItem(
							localStorage.getItem("currently_logged_as") + "Tasks"
						)
					);

					tasks.tasksArray.splice(i, 1);

					localStorage.setItem(
						localStorage.getItem("currently_logged_as") + "Tasks",
						JSON.stringify(tasks)
					);
				} else {
					newTask.style.filter = "brightness(0.5)";
					let taskDateCopy = taskDate.textContent;
					taskDate.innerHTML = `<span class="linespan">${taskDateCopy}</span> ${Math.abs(
						DisplayDifference(taskDateCopy)
					)} dzień po terminie`;
				}
			}

			//adding everything to the task
			if (listBody) {
				listBody.appendChild(newTask);
			}
			newTask.appendChild(taskForm);
			newTask.appendChild(taskDelete);
			taskForm.appendChild(taskInput);
			taskForm.appendChild(taskDate);
			taskDelete.addEventListener("click", () => {
				listBody.removeChild(newTask);
				userTasks.tasksArray.splice(i, 1);
				localStorage.setItem(
					localStorage.getItem("currently_logged_as") + "Tasks",
					JSON.stringify(userTasks)
				);
				console.log("Task deleted");
				window.location.reload();
			});
			newTask.classList.add("task");

			console.log("Task added");
		}
	};
	if (addTaskButton) {
		addTaskButton.addEventListener("click", () => {
			createTask();
		});
	}
	// createExistingTasks(JSON.parse(localStorage.getItem("register_data2Tasks")));
	createExistingTasks(
		JSON.parse(
			localStorage.getItem(
				localStorage.getItem("currently_logged_as") + "Tasks"
			)
		)
	);
	//kalendarz
	function getDaysInMonth() {
		const d = new Date();
		const month = d.getMonth() + 1;
		const year = d.getFullYear();
		return new Date(year, month, 0).getDate();
	}

	let calendar = document.querySelector(".calendar");
	function createCalendar(amountOfDays) {
		for (let i = 0; i < amountOfDays; i++) {
			let day = document.createElement("div");
			day.className = "day";
			let dayNumber = document.createElement("h4");
			dayNumber.textContent = i + 1;
			if (dayNumber.textContent == getFormattedDate().slice(-2)) {
				day.classList.add("today");
			}
			day.appendChild(dayNumber);
			if (calendar) {
				calendar.appendChild(day);
			}
		}
	}
	createCalendar(getDaysInMonth());

	let days = document.querySelectorAll(".day");
	JSON.parse(
		localStorage.getItem(localStorage.getItem("currently_logged_as") + "Tasks")
	).tasksArray.forEach((task) => {
		if (task.date.substring(0, 4) == getFormattedDate().substring(0, 4)) {
			console.log(task.date);
			showTask(task, days[task.date.slice(-2) - 1]);
		}
	});
	document.querySelectorAll(".day .task").forEach((el) => {
		el.classList.add("calendarTask");
	});
});
document.getElementById("theme-toggle").addEventListener("click", () => {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	if (currentTheme === "light") {
		toggleTheme("dark");
	} else {
		toggleTheme("light");
	}
});
//image gallery code
var current_image_index = 0;
function image_swap() {
	current_image_index = (current_image_index + 1) % images.length;
	if (picture_gallery) {
		picture_gallery.style.backgroundImage = images[current_image_index];
	}
}
setInterval(image_swap, 8000);
picture_gallery = document.getElementById("picture_gallery");
var images = [
	'url("images/space-7011298_1920.jpg")',
	'url("images/planet2expanded.png")',
	'url("images/planet3expanded.png")',
];

//login
var change_button = document.getElementById("fix");
var change_button_2 = document.getElementById("fix1");
if (change_button) {
	change_button.addEventListener("click", () => {
		toggleForms();
	});
}
if (change_button_2) {
	change_button_2.addEventListener("click", () => {
		toggleForms();
	});
}
toggleForms = () => {
	var login_box = document.getElementById("login-box");
	var register_box = document.getElementById("register-box");
	if (login_box.style.display == "none") {
		login_box.style.display = "block";
		register_box.style.display = "none";
	} else {
		register_box.style.display = "block";
		login_box.style.display = "none";
	}
};

//logowanie sie i localstorage system
// Get the register counter from localStorage or initialize it
var register_counter = parseInt(localStorage.getItem("register_counter")) || 0;

register_form = document.getElementById("register-form");
login_form = document.getElementById("login-form");

// Handle registration form submission
if (register_form) {
	register_form.addEventListener("submit", (event) => {
		event.preventDefault();
		PushToAll();
		let email = document.getElementById("usernames1").value;
		let password = document.getElementById("password1").value;
		let register_data = email + " " + password;
		all_register_data.push(register_data);
		localStorage.setItem("register_counter", register_counter + 1);
		localStorage.setItem(`register_data${register_counter + 1}`, register_data);
		register_form.reset();
	});
}

// Retrieve all register data into an array
var localstorage_register_counter = localStorage.getItem("register_counter");

// Handle login form submission
if (login_form) {
	login_form.addEventListener("submit", (event) => {
		event.preventDefault();
		PushToAll();
		let email = document.getElementById("usernames").value;
		let password = document.getElementById("password").value;
		let login_data = email + " " + password;
		let found = false;

		for (let i = 0; i < all_register_data.length; i++) {
			if (all_register_data[i] == login_data) {
				console.log("Zalogowano pomyślnie");
				localStorage.setItem("currently_logged_as", `register_data${i + 1}`);
				login_form.reset();
				found = true;
				localStorage.setItem("logged_in", true);
				localStorage.setItem("login_notification_showed", false);
				localStorage.setItem("instructions_showed", false);

				window.location.href = "logged-in-index.html";
				console.log("Zalogowano");
				break;
			}
		}

		if (!found) {
			notification(
				"var(--secondary)",
				"var(--text)",
				"nieprawidłowy login lub hasło"
			);
		}

		// Clear input fields
		document.getElementById("usernames").value = "";
		document.getElementById("password").value = "";
	});
}

//helpful temporary function for testing

localreset = () => {
	localStorage.clear();
	console.log("All data cleared from local storage");
};

//notifications
function notification(color, linecolor, message) {
	console.log("Notification shown");
	let notificationElement = document.createElement("div");
	notificationElement.className = "notification";
	let notificationDivLine = document.createElement("div");
	notificationDivLine.className = "notification-line";
	notificationElement.style.backgroundColor = color;
	notificationDivLine.style.backgroundColor = linecolor;
	notificationElement.textContent = message;
	notificationElement.appendChild(notificationDivLine);
	document.body.appendChild(notificationElement);
	let width = 130;
	const intervalId = setInterval(() => {
		width -= 1;
		document.body.querySelector(".notification-line").style.width = width + "%";
	}, 20);
	setTimeout(() => {
		notificationElement.parentNode.removeChild(notificationElement);
		clearInterval(intervalId);
	}, 3000);
}
function instructions() {
	if (localStorage.getItem("instructions_showed") == "false") {
		console.log("Instructions shown");
		let instructionsDiv = document.createElement("div");
		instructionsDiv.className = "instructionsDiv";
		instructionsDiv.textContent =
			"Instrukcja: Naciśnij przycisk dodaj w prawym dolnym rogu. Następnie wprowadź treść oraz termin zadania. Po uzupełnieniu wymaganych pól naciśnij enter. Twoje zadanie będzie zapisane nawet po wylogowaniu się.";
		let instructionsClose = document.createElement("button");
		instructionsClose.textContent = "OK";
		instructionsClose.className = "instructionsClose";
		instructionsDiv.appendChild(instructionsClose);
		document.body.appendChild(instructionsDiv);
		instructionsClose.addEventListener("click", () => {
			instructionsDiv.parentNode.removeChild(instructionsDiv);
		});
		localStorage.setItem("instructions_showed", true);
	}
}

//temporary JSON for register 21 zsk
// {
// 	"user": "register_data21",
// 	"tasksArray": [
//   {"title": "syuhh", "date": "2025-01-04"},
//   {"title": "rizz", "date": "2025-01-04"},
//   {"title": "wdwdddd", "date": "2025-02-09"},
//   {"title": "Overdue", "date": "2024-12-22"},
//   {"title": "Yesterday", "date": "2025-01-04"},
//   {"title": "Tomorrow", "date": "2025-01-06"}
// 	]
//   }
