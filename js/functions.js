//Variables globales
var n = 1, cron = 0;

//Asigna el tema seleccionado almacenado, se utiliza en todas las paginas
function checkTheme() {
	if (localStorage.getItem('data-theme') == "dark") {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
	}
}

//Cambia el icono del modo oscuro en la pagina principal en funcion del tema
function changeIconTheme() {
	if (localStorage.getItem('data-theme') == "dark") {
		document.getElementById("btnDarkMode").src = "svg/btnLight.svg";
	}
	else {
		document.getElementById("btnDarkMode").src = "svg/btnDark.svg";
	}
}

//Cambia el tema
function changeTheme() {
	var image = document.getElementById("btnDarkMode")

	if (image.getAttribute("src") == "svg/btnDark.svg") {
		image.src = "svg/btnLight.svg";
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('data-theme', 'dark');
	}
	else {
		image.src = "svg/btnDark.svg";
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('data-theme', 'light');
	}
}

function load() {
	if (sessionStorage["start"] == "true") {
		let seconds = 0;
		let s = document.getElementById("sec");

		cron = setInterval(
			function () {
				s.innerHTML = seconds;
				seconds++;
			}
			, 1000);
	}
	else {
		document.getElementById("btnStop").remove();
		document.getElementById("h1").innerHTML = "Esperando inicio, pulse 'Reiniciar Arduino'";
	}
}

function stopCron() {
	clearInterval(cron);
	cron = 0;
	document.getElementById("h1").innerHTML = "Prueba finalizada";
	sessionStorage["sec"] = document.getElementById("sec").innerHTML;
	sessionStorage["mov"] = document.getElementById("mov").innerHTML;
	sessionStorage["time"] = getTime();
	sessionStorage["start"] = false;
	document.querySelector("link[rel*='icon']").href = "svg/btnStop.svg";
}

function restart() {
	if (cron != 0) {
		let answer = confirm("Prueba en ejecución, ¿desea volver al inicio? (Si lo hace, la prueba se detendrá)");
		if (answer == true) {
			stopCron();
			innerRestart();
		}
	}
	else {
		innerRestart();
	}
	function innerRestart() {
		sessionStorage.removeItem("sec");
		sessionStorage.removeItem("mov");
		sessionStorage.removeItem("time");
		location.replace("index.html");
	}
}

function getTime() {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();

	if (dd < 10) { dd = '0' + dd; }
	if (mm < 10) { mm = '0' + mm; }
	if (h < 10) { h = '0' + h; }
	if (m < 10) { m = '0' + m; }
	if (s < 10) { s = '0' + s; }

	today = dd + '/' + mm + '/' + yyyy + " " + h + ":" + m + ":" + s;
	return today;
}

function getData() {
	if (sessionStorage["sec"] == null) {
		alert("No hay datos, realice una prueba.")
	}
	else {
		document.getElementById("ftiempo").value = sessionStorage["sec"];
		document.getElementById("ffecha").value = sessionStorage["time"];
		document.getElementById("fmovimiento").value = sessionStorage["mov"];
	}

}

function saveEntry() {
	var time = document.getElementById("ftiempo").value;
	var date = document.getElementById("ffecha").value;
	var treat = document.getElementById("ftratamiento").value;
	var move = document.getElementById("fmovimiento").value;
	var obs = document.getElementById("fobservaciones").value;

	if (time == "" || date == "" || treat == "" || move == "" || obs == "") {
		let answer = confirm("Algunos campos estan vacios, ¿desea continuar?");
		if (answer == true) {
			innerSave();
		}
	}
	else {
		innerSave();
	}
	function innerSave() {
		var table = document.getElementById("tbResults");
		var row = table.insertRow(-1);
		var nro = row.insertCell(0);
		var tiempo = row.insertCell(1);
		var fecha = row.insertCell(2);
		var tratamiento = row.insertCell(3);
		var movimiento = row.insertCell(4)
		var observaciones = row.insertCell(5);

		nro.innerHTML = n++;
		tiempo.innerHTML = time
		fecha.innerHTML = date
		tratamiento.innerHTML = treat
		movimiento.innerHTML = move
		observaciones.innerHTML = obs

		if (treat == "") {
			tratamiento.innerHTML = "-";
		}
		if (obs == "") {
			observaciones.innerHTML = "-";
		}
	}
}

function clearInputResults() {
	document.getElementById("frmDataResults").reset();
}

function timeWait() {
	let seconds = 0;
	sessionStorage["start"] = false;
	let tWait = setInterval(
		function () {
			seconds++;
			if (seconds == 2) {
				document.getElementById("messageText").innerHTML = "Probando sensores..."
			}
			if (seconds == 4) {
				document.getElementById("messageText").innerHTML = "Configuración completa..."
			}
			/*if (seconds == 7) {
				clearInterval(tWait);
				let logoElements = document.getElementsByClassName("logoContainer");
				for (let i = 0; i < logoElements.length; i++) {
					logoElements[i].style.visibility = "hidden";
				}
				let errorElements = document.getElementsByClassName("errorContainer");
				for (let i = 0; i < errorElements.length; i++) {
					errorElements[i].style.visibility = "visible";
				}
			}*/
			if (seconds == 8) {
				clearInterval(tWait);
				sessionStorage["start"] = true;
				location.replace("test.html")
			}
		}
		, 1000);
}

function arduinoState() {
	let seconds = 0;
	let tWait = setInterval(
		function () {
			seconds++;
			if (seconds == 2) {
				clearInterval(tWait)
				document.getElementById("arduinoStatus").innerHTML = "Esperando..."
			}

		}
		, 1000);
}