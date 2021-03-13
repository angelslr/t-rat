﻿//Variables globales
var id = 1, cron = 0;
var hour = 0;
var jsonDRUGS = jsonRES = jsonREGS = 0;
var put = false;
sessionStorage['id'] = 0;
var drugXusageY = [];
var ErasedrugXusageY = []

//Usadas en saveData, loadAllData y showRowTable
//var duration = 0, move = 0, date = 0, treat = 0, obs = 0, drug = 0, researcher = 0;
//localStorage["l_username"] = 'angelslr';
//Inserta el header en cada documento HTML
document.addEventListener("DOMContentLoaded", function () {
	var header = document.getElementById("header");
	header.innerHTML = `<a id="logoLink" href="index.html"><img src="svg/TRatCircle.svg" title="T-Rat" alt="T-Rat"></a>`
	if (localStorage["l_username"] !== undefined) {
		header.innerHTML += `<ul id="option_links">
		<a class="function_nav" href="results.html" target="_new">
			<svg width="3.994mm" height="3.039mm" version="1.1" viewBox="0 0 6.4384 4.9"
				xmlns="http://www.w3.org/2000/svg">
				<g fill="#26a17a" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".7">
					<path d="m0.3502 0.35h5.7382" />
					<path d="m5.8562 1.75h-5.2751" />
					<path d="m0.4742 3.15h5.4901" />
					<path d="m6.0882 4.55h-5.7382" />
				</g>
			</svg>
			Resultados
		</a>
		<a href="researchers.html" target="_new">
			<svg class="function_nav_icon" width="5.0047mm" height="5.0047mm" version="1.1" viewBox="0 0 5.0047 5.0047"
				xmlns="http://www.w3.org/2000/svg">
				<ellipse cx="2.5023" cy="2.5023" rx="2.37" ry="2.37" fill="none" stroke="#000003" stroke-linecap="round"
					stroke-width=".26458" />
				<g transform="translate(.034223 .0056297)" stroke="#000" stroke-linecap="round" stroke-width=".26988">
					<g transform="translate(-2.6671 -1.8779)">
						<g fill="none">
							<circle cx="4.1066" cy="4.039" r=".54976" />
							<circle cx="6.1638" cy="4.039" r=".54976" />
						</g>
						<path d="m4.6996 4.016h0.87127" fill="#f287ff" />
					</g>
					<g transform="translate(-2.5264 -1.9624)" fill="none">
						<path d="m3.3256 4.1768h-0.66865" />
						<path d="m7.3321 4.1768h-0.66865" />
					</g>
				</g>
			</svg>
			Investigadores
		</a>
		<a href="drugs.html" target="_new">
			<svg class="function_nav_icon" width="4.9643mm" height="4.9644mm" version="1.1" viewBox="0 0 4.9643 4.9644"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="m4.5059 0.45841c0.43626 0.43628 0.43626 1.1387 0 1.575l-2.4725 2.4726c-0.43626 0.43628-1.1387 0.43628-1.575 0-0.43626-0.43628-0.43626-1.1387-7e-8 -1.575l2.4725-2.4726c0.43626-0.43628 1.1387-0.43628 1.575 7e-8z"
					fill="none" stroke="#000" stroke-width=".26458" />
				<path d="m4.0933 0.92201 0.15322 0.15322c0.16406 0.16406 0.16406 0.42821 0 0.59227l-0.87186 0.87186"
					fill="none" stroke="#000" stroke-linecap="round" stroke-width=".26458" />
			</svg>
			Drogas
		</a>
		<a href="statistics.html" target="_new">
		<svg class="function_nav_icon" width="5.006mm" height="5.0083mm" version="1.1" viewBox="0 0 5.006 5.0083" xmlns="http://www.w3.org/2000/svg">
		<path d="m0.13229 0.13229v4.7437h4.7415" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".26458"/>
		<path d="m0.78499 4.0052 0.70036-1.2131 0.36541 0.63291 0.73574-1.2743 0.61621 0.61621 1.0183-1.7638" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".26458"/>
	   </svg>
			Estadísticas
		</a>
		<a onclick="operation('popupAbout')">
			<svg class="function_nav_icon" width="4.6302mm" height="4.6302mm" version="1.1" viewBox="0 0 4.6302 4.6302"
				xmlns="http://www.w3.org/2000/svg">
				<g transform="matrix(.43656 0 0 .43656 -15.568 -57.45)" fill="none" stroke="#000" stroke-width=".60606">
					<circle cx="40.963" cy="136.9" r="5" fill="none" stroke="#000" stroke-width=".60606" />
				</g>
				<g transform="translate(.056603 .050236)">
					<path
						d="m2.2141 3.2582v0.034392m-0.45605-1.907c0.33113-0.22846 0.87401-0.20432 0.98056 0.15268 0.12354 0.41393-0.30534 0.57336-0.47704 0.8657-0.063784 0.1086-0.047475 0.23228-0.047475 0.41805"
						fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
						stroke-width=".26458" />
				</g>
			</svg>
			Acerca de
		</a>
		<div id="popupAbout" class="modal">
		<form id="frmAbout" class="modal-content animate">
			<div class="imgcontainer">
				<span onclick="cancel('popupAbout')" class="close" title="Cerrar">&times;</span>
			</div>
			<div class="containerAbout">
			<svg width="10.054mm" height="10.054mm" version="1.1" viewBox="0 0 10.054 10.054" xmlns="http://www.w3.org/2000/svg">
			<g transform="scale(.019105)">
			 <path d="m279.95 280.19v246.07a263.67 263.67 0 0 0 246.3-246.07z" fill="#888785"/>
			 <path d="m0.020154 280.19a263.67 263.67 0 0 0 246.13 246.06v-246.06z" fill="#b4b4b4"/>
			 <path d="m246.15 0.010852a263.67 263.67 0 0 0-246.15 246.36h246.15z" fill="#151515"/>
			 <path d="m279.95 0v246.38h246.32a263.67 263.67 0 0 0-246.32-246.38z" fill="#414444"/>
			 <path d="m153.35 141.87c-10.689 0.3058-23.544 14.048-20.132 26.577-15.931 14.507-40.642 9.1169-57.142 22.778-11.816 12.485-47.734 19.332-40.695 39.927 11.515 13.066 26.139 25.305 44.74 26.227 28.186-0.96199 57.76 8.6439 75.469 32.532 13.767 18.57 12.06 49.607-9.571 59.904-10.528-3.7444-39.632 11.91-17.69 7.9039-18 15.71 22.123-5.0638 7.6528 7.2982 3.393 5.4722-12.739 7.667-14.951 9.6206-2.0115 1.7763 2.534 1.1405 6.5293 0.57721 1.0658-0.15031-3.2976 3.6293-2.173 3.8416 1.3977 0.26392 5.1749-2.6415 6.4895-2.2877 1.7692 0.4762-5.0226 5.4506-3.1006 5.2503 2.617-0.27278 12.112-5.6971 15.144-7.1499h6e-3c11.324-5.4262-2.5962 5.8847 6.0342 7.3758 6.795-7.3986 14.237-12.337 20.348-16.112 10.586-17.053 35.107-21.447 51.192-33.134 18.825-13.678 35.907-1.4071 54.973 2.0118 16.539 6.5691 42.934-6.559 52.873 11.699-15.86 12.961-42.343-3.2722-60.572 7.0978-19.883 9.0135 20.747-3.3424 2.5931 7.3546-10.226 8.544-3.0064 7.7726 4.1863 2.2645 15.814-8.3029-2.5372 17.007 13.25 6.9024 16.984-6.7447 37.101-2.9121 55.148-7.599 17.897-0.97801 10.294-21.807 29.399-16.944 23.182 5.902 41.823-20.403 64.637-11.338 22.886 7.786 50.967 12.651 64.66 34.829 0.37222 0.61384 0.71528 1.2264 1.033 1.8381a263.67 263.67 0 0 0 4.5925-10.875c-16.063-19.785-42.281-29.484-64.162-41.563-22.375-19.614-24.078-51.009-33.207-77.428-12.656-36.625-45.725-62.132-82.199-70.157-26.757-5.8874-56.022-9.3188-82.392 2.5492-22.741 10.234-50.304 10.5-75.221 1.8846-16.344-5.651-8.0427-12.498-5.7795-22.785-2.0393-7.9666-6.7426-11.022-11.963-10.873zm325.68 272.63c-4.2354 1.4809-8.5856 2.3556-12.758 2.4918-45.632 5.6157-92.784-5.1429-137.63 7.7551-14.285 3.1519-7.7024 5.8151 2.4686 3.2241 46.168-12.254 94.248 8.7616 140.07-2.851a263.67 263.67 0 0 0 7.8507-10.62z" fill="#fff"/>
			</g>
		   </svg>
		   
				<div class="containerAboutText">
				<p style="font-size: 16pt;"><strong>Acerca de T-Rat</strong></p>
				<p><strong>Versión 3.7 (Testing)</strong></p>
				<p>Universidad Nacional de La Rioja</p>
				<p>Angel Salazar</p>
				<p>Ignacio Andrada</p>
				<p>David Gomez</p>
				<div style="margin-left:auto; margin-right:0;">
				</div>
				</div>
				
			</div>
			<p style="text-align: right;margin: 0 22px 12px 0px;">2021</p>
		</form>
	</div>
	</ul>`
	}
	let path = window.location.pathname;
	path = path.split("/").pop();
	if (path == 'statistics.html') {
		header.innerHTML += `<div class="toggle-container">
		<input type="checkbox" id="switch" onclick="changeTheme(true)"><label for="switch"></label>
	</div>`;
	}
	else {
		header.innerHTML += `<div class="toggle-container">
		<input type="checkbox" id="switch" onclick="changeTheme()"><label for="switch"></label>
	</div>`;
	}
	header.innerHTML += `<nav>
		<ul id="nav_links">
		</ul>
	</nav>`;

	if (localStorage["l_username"] == null) {
		header.innerHTML += `<a class="cta"><button type="button" onclick="operation('id01')">Ingresar</button></a>
		<a class="cta"><button type="button" onclick="operation('id02')">Registrarse</button></a>`
	}
	else {
		document.getElementById("nav_links").innerHTML += `<li><a id="user" href="javascript:void(0)"></a>
		<ul class="submenu">
			<li><a onclick="logout()" href="javascript:void(0)">Salir</a></li>
		</ul>
	</li>`;
		document.getElementById("user").innerHTML = localStorage["l_username"];
	}
});


//////////* CONEXION CON BACKEND *//////////

var url = "http://localhost:8080/";

/*ENDPOINTS*/

//GET, PUT, DELETE by ID
var epReg = "trat/register/";
var epDrug = "trat/drug/";
var epReser = "trat/researcher/";

//POST
var epRegPOST = "trat/register";
var epDrugPOST = "trat/drug";
var epReserPOST = "trat/researcher";

//All
var epRegAll = "trat/registers";
var epDrugAll = "trat/drugs";
var epReserAll = "trat/researchers";

//Login
var epLogin = "trat/user/login";

//New User
var epNew = "trat/user/new";

async function toBackPOST(endpoint, jsonString) {
	const response = await fetch(url + endpoint, {
		method: 'POST',
		body: JSON.stringify(jsonString),
		headers: {
			"Content-type": "application/json"
		}
	});
	return response.json();
}

async function toBackGET(id) {
	var response = await fetch(url + epDrug + id, {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	var json = await response.json();
	return json;
}

async function toBackGETAll(endpoint) {
	var response = await fetch(url + endpoint, {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	return response.json();
}

async function toBackDELETE(endpoint, id) {

	var response = await fetch(url + endpoint + id, {
		method: 'DELETE',
	})
	return response.json();
}

async function toBackPUT(endpoint, id, jsonString) {

	var response = await fetch(url + endpoint + id, {
		method: 'PUT',
		body: JSON.stringify(jsonString),
		headers: {
			"Content-type": "application/json"
		}
	})
	return response;
}

//////* FIN DE CONEXION CON GOLANG API *///////


//////* CONEXION CON PYTHON API *///////

var urlArduino = "http://127.0.0.1:5000/arduino";

async function toArduinoPOST() {

	var response = await fetch(urlArduino, {
		method: 'POST',
	});
	return response.json();
}
async function toArduinoGET() {
	var response = await fetch(urlArduino, {
		method: 'GET',
	})
	var json = await response.json();
	return json;
}


//Actualizan variables globales de datos
async function updateJsonREGS() {
	if (jsonREGS == 0) {
		jsonREGS = await toBackGETAll(epRegAll);
	}
}
async function updateJsonDRUGS() {
	if (jsonDRUGS == 0) {
		jsonDRUGS = await toBackGETAll(epDrugAll);
	}
}
async function updateJsonRES() {
	if (jsonRES == 0) {
		jsonRES = await toBackGETAll(epReserAll);
	}
}

//Asigna el tema seleccionado almacenado, se utiliza en todas las páginas
if (localStorage.getItem('data-theme') == "dark") {
	document.documentElement.setAttribute('data-theme', 'dark');
}
else {
	document.documentElement.setAttribute('data-theme', 'light');
}

//Si hay una sesión válida, se oculta la pantalla de bienvenida
function hideWelcome() {
	if (localStorage["l_username"] != null) {
		location.replace("index.html");
	}
}

//Comprueba si se inició sesión, en caso negativo, se retorna a la página de bienvenida
function validateSession() {
	if (localStorage["l_username"] == "" || localStorage["l_username"] == null) {
		location.replace("welcome.html");
	}
}

//Muestra las ventanas de carga de datos
function operation(item) {
	document.getElementById(item).style.display = 'block';
}

//Oculta las ventanas de carga de datos
function cancel(item) {
	document.getElementById(item).style.display = 'none';
}

//Cerrar sesión
function logout() {
	localStorage.removeItem("l_username");
	location.reload();
}

//Iniciar sesión
async function login() {
	let us = document.getElementById("l_username").value;
	let ps = document.getElementById("l_password").value;

	if (us == "" || ps == "") {
		alert("Algunos campos estan vacíos.");
	}
	else {
		let response = await toBackPOST(epLogin, { 'username': us, 'password': ps });

		if (response.Code == 500) {
			alert('Usuario o contraseña incorrectos.')
		}
		else {
			localStorage["l_username"] = response.username;
			location.replace("index.html");
		}
	}
}

//Registrar un usuario
async function signUp() {
	let username = document.getElementById("r_username").value;
	let name = document.getElementById("r_name").value;
	let lastname = document.getElementById("r_surname").value;
	let password = document.getElementById("r_password").value;

	if (name == "" || lastname == "" || username == "" || password == "") {
		alert('Algunos campos estan vacíos.');
	}
	else {
		let response = await toBackPOST(epNew, { 'username': username, 'firstname': name, 'lastname': lastname, 'password': password });

		if (response == null) {
			innerSign();
		}
		else if (response.Code == 409) {
			alert('El usuario ya existe, elija otro.');
		}
	}
	function innerSign() {
		alert('Usuario registrado con éxito, ya puede iniciar sesión.');
		clearInputs('frmRegister');
		cancel('id02');
	}
}

//Cambia el switch del modo oscuro en función del tema
function changeIconTheme() {
	if (localStorage.getItem('data-theme') == "dark") {
		document.getElementById('switch').checked = true;
	}
	else {
		document.getElementById('switch').checked = false;
	}
}

//Cambia el tema
function changeTheme(statistics) {

	var checkbox = document.getElementById('switch');
	if (checkbox.checked == true) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('data-theme', 'dark');
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('data-theme', 'light');
	}
	if (statistics) {
		updateColorChart();
	}
}

//Verifica el tema actual y cambia el color de los textos y grillas de los charts
function updateColorChart() {
	let colorFont;
	let colorGrid;
	if (localStorage.getItem('data-theme') == "dark") {
		colorFont = "rgba(200, 200, 200)";
		colorGrid = "#686868";
	}
	else {
		colorFont = "rgba(100, 100, 100)";
		colorGrid = "#d2d2d2";
	}
	Chart.defaults.global.defaultFontColor = colorFont;
	Chart.helpers.each(Chart.instances, function (instance) {

		instance.options.legend.display = false;
		instance.options.scales.yAxes[0].gridLines.color = colorGrid;
		instance.options.scales.yAxes[0].gridLines.zeroLineColor = colorGrid;

		instance.options.scales.xAxes[0].gridLines.color = colorGrid;
		instance.options.scales.xAxes[0].gridLines.zeroLineColor = colorGrid;

		instance.options.scales.yAxes[0].ticks.min = 0;





		//if (instance != chartDrugsMov) {
		/*instance.options = {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					gridLines: {
						color: colorGrid,
						zeroLineColor: colorGrid,
					},
					ticks: {
						min: 0
					}
				}],
				xAxes: [{
					gridLines: {
						color: colorGrid,
						zeroLineColor: colorGrid,
					},
					ticks: {
						autoSkip: true,
						maxTicksLimit: 5
					}
				}]
			}
		};*/
		//}

		instance.update();
		//instance.chart.update();
	});
}

//Cronómetro
function cronometer() {
	if (sessionStorage["start"] == "true") {
		let seconds = 4;
		let s = document.getElementById("sec");

		cron = setInterval(
			function () {
				s.innerHTML = seconds;
				seconds++;
			}
			, 1000);
	}
	else {
		removeButtons();
		document.getElementById("h1").innerHTML = "Esperando inicio, pulse 'Reiniciar Arduino'";
	}
}
function removeButtons() {
	document.getElementById("divStop").remove();
	document.getElementById("divNew").style.display = "block";
}

function getTime() {
	localDate = toISOLocal(new Date());
	strSplit = localDate.split('T');
	hour = strSplit[1];
	return strSplit[0];
}

function toISOLocal(d) {
	var z = n => ('0' + n).slice(-2);
	var zz = n => ('00' + n).slice(-3);
	var off = d.getTimezoneOffset();
	var sign = off < 0 ? '+' : '-';
	off = Math.abs(off);

	return d.getFullYear() + '-'
		+ z(d.getMonth() + 1) + '-' +
		z(d.getDate()) + 'T' +
		z(d.getHours()) + ':' +
		z(d.getMinutes()) + ':' +
		z(d.getSeconds()) + '.' +
		zz(d.getMilliseconds()) +
		sign + z(off / 60 | 0) + ':' + z(off % 60);
}
//Detiene el cronómetro
function stopCron() {
	clearInterval(cron);
	cron = 0;
	document.getElementById("h1").innerHTML = "Prueba finalizada";
	document.querySelector("link[rel*='icon']").href = "svg/btnStop.svg";

}

//Reinicia el sistema
async function restart() {
	if (cron != 0) {
		let answer = confirm("Prueba en ejecución, ¿desea volver al inicio? (Si lo hace, la prueba se detendrá)");
		if (answer == true) {
			stopCron();
			await toArduinoGET();
			innerRestart();
		}
	}
	else {
		innerRestart();
	}
	//Elimina los datos de la prueba y retorna a la pantalla principal
	function innerRestart() {
		/*sessionStorage.removeItem("sec");
		sessionStorage.removeItem("mov");
		sessionStorage.removeItem("date");*/
		location.replace("index.html");
	}
}

//Recupera los datos de la última prueba para rellenar los campos con datos obligatorios automáticamente

async function getData() {
	let sec;
	let mov;
	let date;
	let result;
	document.getElementById('popupTitle').innerHTML = 'Esperando datos...';

	while (result == undefined) {
		result = await toArduinoGET();
	}

	document.getElementById('popupTitle').innerHTML = 'Completar datos de prueba:';
	sec = parseInt(result.ms / 1000);
	mov = result.score;

	document.getElementById('sec').innerHTML = sec;
	document.getElementById('mov').innerHTML = mov;

	date = getTime();
	sessionStorage["start"] = false;
	if (sec == null) {
		alert("No hay datos, realice una prueba.")
	}
	else {
		document.getElementById("fduration").value = sec;
		document.getElementById("fdate").value = date;
		document.getElementById("fmovement").value = mov;
	}
}

//Limpia los campos de entrada
function clearInputs(formId) {
	document.getElementById(formId).reset();
}

function toWait() {
	location.replace('wait.html');
}

//Verifica el estado del módulo Arduino antes de comenzar una prueba. En caso de haber un error, se informará. En caso contrario, la prueba iniciará
async function timeWait() {
	let seconds = 0;
	sessionStorage["start"] = false;
	let response;
	debugger;
	document.getElementById("messageText").innerHTML = "Probando sensores..."

	while (response == undefined) {
		response = await toArduinoPOST();
	}

	if (response.status == 200) {
		document.getElementById("messageText").innerHTML = "Configuración completa..."
		seconds = 6;
	}
	else {
		clearInterval(tWait);
		let logoElements = document.getElementsByClassName("logoContainer");
		for (let i = 0; i < logoElements.length; i++) {
			logoElements[i].style.visibility = "hidden";
		}
		let errorElements = document.getElementsByClassName("errorContainer");
		for (let i = 0; i < errorElements.length; i++) {
			errorElements[i].style.visibility = "visible";
		}
	}

	let tWait = setInterval(
		async function () {
			seconds++;
			if (seconds == 2) {

			}
			if (seconds == 7) {
				clearInterval(tWait);
				sessionStorage["start"] = true;
				location.replace("test.html")
			}
		}
		, 1000);
}

//Espera que el módulo Arduino se haya encendido
function arduinoState() {
	let seconds = 0;
	let tWait = setInterval(
		function () {
			seconds++;
			if (seconds == 2) {
				clearInterval(tWait)
				document.getElementById("arduinoStatus").innerHTML = "Listo..."
			}
		}
		, 1000);
}

//Añade una fila nueva a la tabla, es utilizada tanto en loadAllData() como en saveData()
function showRowTable(id, dat, res, dur, mov, dru, tre, obs) {
	var table = document.getElementById("tbBody");
	var row = table.insertRow(-1);
	row.id = id;
	var rowNro = row.insertCell(0);
	rowNro.id = 'r_id';
	var rowDate = row.insertCell(1);
	rowDate.id = 'date';
	var rowResearcher = row.insertCell(2);
	rowResearcher.id = 'res';
	var rowDuration = row.insertCell(3);
	rowDuration.id = 'dur';
	var rowMov = row.insertCell(4);
	rowMov.id = 'mov';
	var rowDrug = row.insertCell(5);
	rowDrug.id = 'dru';
	var rowTreat = row.insertCell(6);
	rowTreat.id = 'tre'
	var rowObs = row.insertCell(7);
	rowObs.id = 'obs'

	rowNro.innerHTML = id;
	rowDate.innerHTML = dat;
	rowResearcher.innerHTML = res;
	rowDuration.innerHTML = dur;
	rowMov.innerHTML = mov;
	rowDrug.innerHTML = dru;
	rowTreat.innerHTML = tre;

	if (tre == "") {
		rowTreat.innerHTML = "-";
	}
	if (obs.length > 11) {
		rowObs.innerHTML = `<a id="seeMore" href="javascript:void(0)">Ver</a>`
	}
	else {
		rowObs.innerHTML = obs;
	}
	if (obs == "") {
		rowObs.innerHTML = "-";
	}
}
var lastButtonPressed = 'page1';
async function loadControl(opt, isPage, items, idp) {

	if (idp != lastButtonPressed) {
		if (opt == "drug") {
			await updateJsonDRUGS();
			dT = jsonDRUGS;
		}
		else if (opt == 'researcher') {
			await updateJsonRES();
			dT = jsonRES;
		}
		else {
			await updateJsonREGS();
			await updateJsonDRUGS();
			await updateJsonRES();

			dT = jsonREGS;
		}

		let tableLen = parseInt(document.getElementById("tableLength").value, 10);
		if (tableLen == -1 || tableLen > dT.length) {
			tableLen = dT.length;
		}
		if (lc > tableLen) {
			lc = 0;
			subClearT();
		}
		if (isPage == 'page') {
			tableLen = items;
			subClearT();
		}
		if (opt == 'drug') {
			load_DR_Table('drug', tableLen);
		}
		else if (opt == 'researcher') {
			load_DR_Table('researcher', tableLen);
		}
		else {
			loadAllData(tableLen);
		}
		if (isPage != 'page') {
			pageCalc(tableLen, dT.length, opt)
		}
		if (idp != undefined) {
			lastButtonPressed = idp;
		}
	}
}

function pageCalc(tableLen, rlen, dr) {

	var pagination = document.getElementById('pagination');
	pagination.innerHTML = "";
	pagination.lastChild = "";
	pagination.innerHTML += `<a id="ant" href="javascript:void(0)">&laquo;</a>`;

	let pages = 1;
	while (rlen > tableLen) {
		rlen -= tableLen;
		pages += 1;
	}

	let value = 1;
	while (value <= pages) {
		let a = document.createElement('a');
		a.appendChild(document.createTextNode(value));
		let idp = '"' + 'page' + value + '"';
		a.textContent = value;
		a.href = 'javascript:void(0)';
		if (dr == undefined) {
			a.setAttribute("onclick", "loadControl('', 'page'," + tableLen + ',' + idp + ");");
		}
		else if (dr == 'drug') {
			a.setAttribute("onclick", "loadControl('drug', 'page'," + tableLen + ',' + idp + ");");
		}
		else if (dr == 'researcher') {
			a.setAttribute("onclick", "loadControl('researcher', 'page'," + tableLen + ',' + idp + ");");
		}
		tableLen += tableLen;

		pagination.appendChild(a);
		value += 1;
	}
	pagination.innerHTML += `<a id="post" href="javascript:void(0)">&raquo;</a>`
}

function clearTable(opt) {

	subClearT();
	lc = 0;
	lastButtonPressed = 'page1';
	if (opt == 'drug') {
		loadControl('drug');
	}
	else if (opt == 'researcher') {
		loadControl('researcher');
	}
	else {
		loadControl();
	}
}

function subClearT() {
	let table = document.getElementById('tbBody');
	table.innerHTML = "";
	table.lastChild = "";
}

var lc = 0;
//Muestra todos los registros de la base de datos
async function loadAllData(tableLen) {
	if (jsonREGS.length != 0) {
		//Se lee cada key de la cadena JSON, y se utiliza la función showRowTable para añadirlas a la tabla
		while (lc < tableLen) {
			if (jsonREGS[lc] == undefined) {
				break;
			}
			let d = jsonDRUGS.find(function (jsonDRUGS) { return jsonDRUGS.drug_id == jsonREGS[lc].drug_id });
			let r = jsonRES.find(function (jsonRES) { return jsonRES.researcher_id == jsonREGS[lc].researcher_id });

			let t = new Date(jsonREGS[lc].date);
			t = t.toLocaleString();

			showRowTable(jsonREGS[lc].register_id, t, r.name, jsonREGS[lc].duration, jsonREGS[lc].movement, d.name + ' ' + d.dosage + 'mg', jsonREGS[lc].treatment, jsonREGS[lc].observations);
			lc += 1;
		}
	}
	else {
		document.getElementById("noData").style.display = "block";
	}
	document.getElementById("registers").innerHTML = jsonREGS.length;
	updateAutocompleteList();
}

//Guarda un registro
async function saveData(inResults) {

	drug = document.getElementById("selectDrugs");
	drug = parseInt(drug.options[drug.selectedIndex].id, 10);

	researcher = document.getElementById("selectResearchers");
	researcher = parseInt(researcher.options[researcher.selectedIndex].id, 10);

	duration = parseInt(document.getElementById("fduration").value, 10);

	date = document.getElementById("fdate").value;
	treat = document.getElementById("ftreatment").value;
	move = parseInt(document.getElementById("fmovement").value, 10);
	obs = document.getElementById("fobservations").value;

	if (duration == "" || date == "" || treat == "" || obs == "" || drug == "" || researcher == "") {
		alert("Algunos campos estan vacios.");
	}
	else {
		let localDate = toISOLocal(new Date());
		strSplit = localDate.split('T');
		hour = strSplit[1];
		date += 'T' + hour;
		let data = { 'drug_id': drug, 'researcher_id': researcher, 'duration': duration, 'date': date, 'treatment': treat, 'movement': move, 'observations': obs };
		if (put == false) {
			response = await toBackPOST(epRegPOST, data);
		}
		else {
			id = parseInt(sessionStorage['id'], 10);
			response = await toBackPUT(epReg, id, data);
		}
		jsonREGS = await toBackGETAll(epRegAll);

		alert("Registro guardado.");
		cancel('popup');

		if (inResults == true) {
			//Al guardar un registro, se mostrará de inmediado, sin necesidad de recargar la página
			let regs = parseInt(document.getElementById("registers").innerHTML, 10);
			document.getElementById("registers").innerHTML = (regs + 1).toString();

			let d = jsonDRUGS.find(function (jsonDRUGS) { return jsonDRUGS.drug_id == drug });
			let r = jsonRES.find(function (jsonRES) { return jsonRES.researcher_id == researcher });

			let t = new Date(date);
			t = t.toLocaleString();

			if (put == false) {
				showRowTable(jsonREGS[jsonREGS.length - 1].register_id, t, r.name, duration, move, d.name, treat, obs);
			}
			else {
				let row = document.getElementById(id).querySelectorAll('td');
				row[1].innerHTML = t;
				row[2].innerHTML = r.name;
				row[3].innerHTML = duration;
				row[4].innerHTML = move;
				row[5].innerHTML = d.name;
				row[6].innerHTML = treat;
				if (obs.length > 11) {
					row[7].innerHTML = `<a id="seeMore" href="javascript:void(0)">Ver</a>`
				}
				else {
					row[7].innerHTML = obs;
				}
				put = false
			}
		}
	}
}

//Despues de seleccionar una fila de la tabla y utilizar el respectivo boton, esta función desplegará el menu de edicion, además de rellenarlo con los datos de la fila enviados desde "results.html"
function editData(id) {
	if (id == -1 || id == "") {
		alert("Debe seleccionar una fila de la tabla");
	}
	else {
		//Despliega menu
		operation('popup');
		loadRes_drug();
		//Rellena datos
		register = searchReg(id);
		document.getElementById("idPopup").innerHTML = "Modificar datos del registro " + id;
		document.getElementById("fduration").value = register.duration;
		document.getElementById("fmovement").value = register.movement;

		d = new Date(register.date);
		//d.setHours(d.getHours() - 3);
		localDate = d.toISOString()
		strSplit = localDate.split('T');
		hour = strSplit[1];

		document.getElementById("fdate").value = strSplit[0];
		document.getElementById("ftreatment").value = register.treatment;
		document.getElementById("fobservations").value = register.observations;
		document.getElementById("selectDrugs").options.namedItem((register.drug_id).toString()).selected = true;
		document.getElementById("selectResearchers").options.namedItem((register.researcher_id).toString()).selected = true;
		put = true;
	}
}

function toResults() {
	location.replace('results.html');
}

function saveRes_Drug(opt, inResults) {

	if (opt == "researcher") {
		innersaveRes_Drug('resNameNew', 'resCatNew', epReser, epReserAll, epReserPOST, "El investigador ya existe, elija otro.", "Investigador guardado con éxito.", 'frmResearcher', 'popupNewRes', 'selectResearchers', 'category', 'researcher_id')
	}
	else if (opt == "drug") {
		innersaveRes_Drug('drugNameNew', 'drugDoseNew', epDrug, epDrugAll, epDrugPOST, "La droga ya existe, elija otra.", "Droga guardada con éxito.", 'frmDrug', 'popupNewDrug', 'selectDrugs', 'dosage', 'drug_id')
	}

	async function innersaveRes_Drug(field1, field2, epPUT, epALL, endpointPOST, alertExist, confirm, frmInput, cancelElement, sel, prop, prop2) {

		let val1 = document.getElementById(field1).value;
		let val2 = document.getElementById(field2).value;

		if (val1 == "" || val2 == "") {
			alert("Algunos campos estan vacíos.");
		}
		else {
			var dT = await toBackGETAll(epALL);

			let exist = false;
			let i = 0;
			if (dT.length != 0) {
				while (i < dT.length) {
					if (val1 == dT[i].name && val2 == dT[i][prop]) {
						alert(alertExist)
						exist = true;
						break;
					}
					i += 1;
				}
				if (exist == false) {
					innerFromInnerSave(dT);
				}
			}
			else {
				innerFromInnerSave(dT);
			}
		}

		async function innerFromInnerSave(dT) {

			let data = { 'name': val1, [prop]: val2 };
			if (put == true) {
				id = parseInt(sessionStorage['id'], 10);
				toBackPUT(epPUT, id, data);

				let row = document.getElementById(id).querySelectorAll('td');
				row[1].innerHTML = val1;
				row[2].innerHTML = val2;
				put = false
			}
			else {
				toBackPOST(endpointPOST, data);
				if (inResults) {
					showRowDrugTable(dT[dT.length - 1][prop2] + 1, val1, val2);
				}

			}

			alert(confirm);
			clearInputs(frmInput);
			cancel(cancelElement);

			if (inResults == true) {
				if (opt == "drug") {
					jsonDRUGS = await toBackGETAll(epDrugAll);
				}
				else {
					jsonRES = await toBackGETAll(epReserAll);
				}
			}
			else {
				let select = document.getElementById(sel);
				let option = document.createElement('option');
				let value = val1 + ' (' + val2 + ')';
				option.id = dT[dT.length - 1][prop2];

				option.appendChild(document.createTextNode(value));
				option.value = value;

				select.appendChild(option);
			}
		}
	}
}

async function loadRes_drug(inTest) {

	innerLoadRes_drug('selectResearchers', 'researcher', epReserAll, 'category', 'researcher_id')
	innerLoadRes_drug('selectDrugs', 'drug', epDrugAll, 'dosage', 'drug_id')

	async function innerLoadRes_drug(sel, opt, endpoint, v1, id) {

		if (inTest == true) {
			dT = await toBackGETAll(endpoint);
		}
		else {
			if (opt == 'researcher') {
				dT = jsonRES;
			}
			else {
				dT = jsonDRUGS;
			}
		}

		let select = document.getElementById(sel);
		let selectL = select.length - 1;
		let i = 0;

		if (dT != null) {
			if (selectL == 0) {
				innerFromInnerLoad();
			}
			else if (selectL < dT.length) {
				i = selectL - 1;
				innerFromInnerLoad();
			}
			else if (selectL > dT.length) {
				document.getElementById(sel).options.length = 0;
				innerFromInnerLoad();
			}
		}
		function innerFromInnerLoad() {
			while (i < dT.length) {
				let option = document.createElement('option');
				let value = dT[i].name + ' (' + dT[i][v1] + ')';
				option.id = dT[i][id];
				option.appendChild(document.createTextNode(value));
				option.value = value;

				select.appendChild(option);
				i += 1;
			}
		}
	}
}

async function deleteReg(opt) {

	var id = sessionStorage['id'];
	if (id == 0 || id == undefined) {
		alert("Debe seleccionar una fila de la tabla");
	}
	else {
		id = parseInt(id, 10);

		result = confirm('Desea eliminar el registro ' + id + '?');
		if (result == true) {
			switch (opt) {
				case 'reg':
					response = await toBackDELETE(epReg, id);
					break;
				case 'res':
					response = await toBackDELETE(epReser, id);
					break;
				case 'drug':
					response = await toBackDELETE(epDrug, id);
					break;
			}

			if (response == null) {
				elem = document.getElementById(id.toString());
				elem.parentNode.removeChild(elem);
				sessionStorage['id'] = 0;
				alert('Registro ' + id + ' eliminado.');
			}
			else {
				alert('Error.');
			}
		}
	}
}

function searchReg(id) {
	return jsonREGS.find(function (jsonREGS) { return jsonREGS.register_id == id });
}

async function load_DR_Table(opt, tableLen) {

	if (opt == "drug") {
		innerLoad(dT, 'drug_id', 'dosage');
	}
	else {
		innerLoad(dT, 'researcher_id', 'category');
	}
	function innerLoad(dT, v1, v2) {

		if (dT.length != 0) {
			while (lc < tableLen) {
				if (dT[lc] == undefined) {
					break;
				}
				showRowDrugTable(dT[lc][v1], dT[lc].name, dT[lc][v2]);
				lc += 1;
			}
		}
		else {
			document.getElementById("noData").style.display = "block";
		}
		document.getElementById("registers").innerHTML = dT.length;
	}
}

function showRowDrugTable(r1, r2, r3) {
	var table = document.getElementById("tbBody");
	var row = table.insertRow(-1);
	row.id = r1;
	var row1 = row.insertCell(0);
	var row2 = row.insertCell(1);
	var row3 = row.insertCell(2);

	row1.innerHTML = r1;
	row2.innerHTML = r2;
	row3.innerHTML = r3;
}

function editReg(id, opt) {
	if (id == -1 || id == "") {
		alert("Debe seleccionar una fila de la tabla");
	}
	else {
		if (opt == 'drug') {
			innerEdit(id, 'popupNewDrug', 'drugNameNew', 'drugDoseNew', jsonDRUGS, 'drug_id', 'dosage')
		}
		else {
			innerEdit(id, 'popupNewRes', 'resNameNew', 'resCatNew', jsonRES, 'researcher_id', 'category')

		}
		function innerEdit(id, pup, f1, f2, dT, v1, v2) {
			operation(pup);
			register = dT.find(function (dT) { return dT[v1] == id });

			document.getElementById("idPopup").innerHTML = "Modificar datos del registro " + id;
			document.getElementById(f1).value = register.name;
			document.getElementById(f2).value = register[v2];
			put = true;
		}
	}
}

function search() {

	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("tbResults");
	tr = table.getElementsByTagName("tr");
	searchBy = parseInt(document.getElementById("searchBy").value, 10);

	//i = filas de la tabla, j = columnas
	if (searchBy == -1) {
		for (i = 0; i < tr.length; i++) {
			for (j = 0; j < 7; j++) {
				td = tr[i].getElementsByTagName("td")[j];
				if (td) {
					txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
						break;
					} else {
						tr[i].style.display = "none";
					}
				}
			}
		}
	}
	else {
		j = searchBy;
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[j];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
				}
			}

		}
	}
}

function sortTable(n, isNumber) {

	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("tbResults");
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/
			if (dir == "asc") {
				if (isNumber) {
					if (parseInt(x.innerHTML, 10) > parseInt(y.innerHTML, 10)) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
				else {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			}
			else if (dir == "desc") {
				if (isNumber) {
					if (parseInt(x.innerHTML, 10) < parseInt(y.innerHTML, 10)) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
				else {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						//if so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

async function dataChartRegs() {
	var c = 0, d = 0;
	for (i = 0; i < jsonREGS.length; i++) {
		if (jsonREGS[i].treatment == 'Control') {
			c += 1;
		}
		else if (jsonREGS[i].treatment == 'Droga') {
			d += 1;
		}
	}
	drugXusageY[0].push('Control', 'Droga');
	drugXusageY[1].push(c, d);
}

async function dataChartDrugs() {

	let array1 = [];
	let counter = []

	//LLena un array con todos los id de las drogas en todos los registros
	for (i = 0; i < jsonREGS.length; i++) {
		array1.push(jsonREGS[i].drug_id);
	}
	for (i = 0; i < array1.length; i++) {
		let d = jsonDRUGS.find(function (jsonDRUGS) { return jsonDRUGS.drug_id == array1[i] });
		array1[i] = d.name;
	}

	//Elimina duplicados
	simplifiedArray = array1.filter(function (item, pos) {
		return array1.indexOf(item) == pos;
	});

	simplifiedArray.forEach(el => counter.push(array1.filter(x => x == el).length));

	drugXusageY = [
		simplifiedArray,
		counter
	];

	let select = document.getElementById('selectDrugs');
	for (i = 0; i < drugXusageY[0].length; i++) {
		let option = document.createElement('option');
		let value = drugXusageY[0][i];
		option.appendChild(document.createTextNode(value));
		option.value = value;

		select.appendChild(option);
	}
	dataChartRegs();
}

async function dataChartMov() {
	//array1 corresponde a los ids de las drogas. array2 a los movimientos por prueba
	let array1 = [];
	let array2 = [];
	let aux = [];
	let mins = [];
	let avg = [];
	let maxs = [];

	//Extrae ids de drogas y movimientos
	for (i = 0; i < jsonREGS.length; i++) {
		array1.push(jsonREGS[i].drug_id);
		array2.push(jsonREGS[i].movement);
	}
	//Reemplaza cada id contenido en array1 con el nombre de su correspondiente droga
	for (i = 0; i < array1.length; i++) {
		let d = jsonDRUGS.find(function (jsonDRUGS) { return jsonDRUGS.drug_id == array1[i] });
		array1[i] = d.name;
	}
	//Asigna esos datos a un arreglo auxiliar
	aux = [
		array1,
		array2
	]
	//Todos los (ahora) nombres duplicados en array1 son eliminados y asignados a una nueva
	simplifiedArray = array1.filter(function (item, pos) {
		return array1.indexOf(item) == pos;
	});

	//simplifiedArray se usa como control, dado que hay que buscar X numero de drogas diferentes
	for (i = 0; i < simplifiedArray.length; i++) {
		let arr2 = [];
		let c = 0;
		for (j = 0; j < aux[0].length; j++) {
			//Si el nombre de la droga contenido en aux coincide con simplifiedArray, se almacena su
			//valor de movimiento en arr2, mientras que se suma a un contador
			if (aux[0][j] == simplifiedArray[i]) {
				arr2.push(aux[1][j]);
				c += aux[1][j];
			}
		}
		//Cuando finaliza el ciclo de buscar una droga, se calcula el minimo, promedio y maximo movimiento
		mins.push(getMinOfArray(arr2));
		avg.push(parseFloat(c / arr2.length).toFixed(2));
		maxs.push(getMaxOfArray(arr2));
	}
	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}
	function getMinOfArray(numArray) {
		return Math.min.apply(null, numArray);
	}
	/*for (i = 0; i < jsonREGS.length; i++) {
		let d = jsonREGS.filter(function (jsonREGS) { return jsonREGS.drug_id == array1[i] });
	}
*/
	//let aux = simplifiedArray.forEach(el => counter.push(array1.filter(x => x == el).length));

	return [
		simplifiedArray,
		mins,
		avg,
		maxs
	];
}

var dataMovByDose = [];
async function dataChartMovByDose() {
	let array1 = [];
	let array2 = [];
	let aux = [];
	let mins = [];
	let avg = [];
	let maxs = [];

	//Extrae ids de drogas y movimientos
	for (i = 0; i < jsonREGS.length; i++) {
		array1.push(jsonREGS[i].drug_id);
		array2.push(jsonREGS[i].movement);
	}
	//Asigna esos datos a un arreglo auxiliar
	aux = [
		array1,
		array2
	]

	//simplifiedArray se usa como control, dado que hay que buscar X numero de drogas diferentes
	for (i = 0; i < jsonDRUGS.length; i++) {
		let arr2 = [];
		let c = 0;
		for (j = 0; j < aux[0].length; j++) {
			//Si el nombre de la droga contenido en aux coincide con simplifiedArray, se almacena su
			//valor de movimiento en arr2, mientras que se suma a un contador
			if (aux[0][j] == jsonDRUGS[i].drug_id) {
				arr2.push(aux[1][j]);
				c += aux[1][j];
			}
		}
		//Cuando finaliza el ciclo de buscar una droga, se calcula el minimo, promedio y maximo movimiento
		mins.push(getMinOfArray(arr2));
		avg.push(parseFloat(c / arr2.length).toFixed(2));
		maxs.push(getMaxOfArray(arr2));
	}
	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}
	function getMinOfArray(numArray) {
		return Math.min.apply(null, numArray);
	}

	let simplifiedArray = [];
	for (i = 0; i < jsonDRUGS.length; i++) {
		simplifiedArray.push(jsonDRUGS[i].name + ' ' + jsonDRUGS[i].dosage + 'mg');
	}
	dataMovByDose = [
		simplifiedArray,
		mins,
		avg,
		maxs
	];
	fillSelectMov();
	return dataMovByDose;
}

function fillSelectMov() {
	let select = document.getElementById('selectDose1');
	for (i = 0; i < dataMovByDose[0].length; i++) {
		let option = document.createElement('option');
		let value = i;
		option.appendChild(document.createTextNode(dataMovByDose[0][i]));
		option.value = value;

		select.appendChild(option);
	}
	select = document.getElementById('selectDose2');
	for (i = 0; i < dataMovByDose[0].length; i++) {
		let option = document.createElement('option');
		let value = i;
		option.appendChild(document.createTextNode(dataMovByDose[0][i]));
		option.value = value;

		select.appendChild(option);
	}
}

function calcPercentage() {
	debugger;

	let s1 = document.getElementById("selectDose1").value;
	let s2 = document.getElementById('selectDose2').value;

	if (s1 == '' || s2 == '') { }
	else {
		s1 = parseInt(s1);
		s2 = parseInt(s2);
		let per;
		let first;
		let second;
		let result;
		per = document.getElementById('perMin');
		first = dataMovByDose[1][s1];
		second = dataMovByDose[1][s2];
		second = second - first;
		result = (second * 100) / first
		per.innerHTML = 'La diferencia porcentual entre valores mínimos es: ' + parseFloat(result).toFixed(2) + '%';

		per = document.getElementById('perAvg');
		first = dataMovByDose[2][s1];
		second = dataMovByDose[2][s2];
		second = second - first;
		result = (second * 100) / first
		per.innerHTML = 'La diferencia porcentual entre valores promedios es: ' + parseFloat(result).toFixed(2) + '%';

		per = document.getElementById('perMax');
		first = dataMovByDose[3][s1];
		second = dataMovByDose[3][s2];
		second = second - first;
		result = (second * 100) / first
		per.innerHTML = 'La diferencia porcentual entre valores máximos es: ' + parseFloat(result).toFixed(2) + '%';
	}

}

async function dataChartRes() {
	let array1 = [];
	let counter = []

	for (i = 0; i < jsonREGS.length; i++) {
		array1.push(jsonREGS[i].researcher_id);
	}

	simplifiedArray = array1.filter(function (item, pos) {
		return array1.indexOf(item) == pos;
	});

	simplifiedArray.forEach(el => counter.push(array1.filter(x => x == el).length));

	for (i = 0; i < simplifiedArray.length; i++) {
		let d = jsonRES.find(function (jsonRES) { return jsonRES.researcher_id == simplifiedArray[i] });
		simplifiedArray[i] = d.name;
	}
	return [
		simplifiedArray,
		counter
	];
}
var dateXdataY = [];

function dataDateChart() {
	let ids = [];
	let movs = [];
	let field = document.getElementById('selectOpt').value;

	//Se añaden todas las fechas de todos los registros
	for (i = 0; i < jsonREGS.length; i++) {
		//ids.push(jsonREGS[i].register_id);
		let t = new Date(jsonREGS[i].date);
		//t = t.toLocaleString('it-IT');
		t = t.toLocaleString('default', { month: 'short' }) + ' ' + t.toLocaleString('default', { day: 'numeric' });
		ids.push(t);
	}

	if (field == 'mov') {
		for (i = 0; i < jsonREGS.length; i++) {
			if (jsonREGS[i].movement == 0) {
				movs.push(1);
			}
			else {
				movs.push(jsonREGS[i].movement)
			}
		}
	}
	else if (field == 'dur') {
		for (i = 0; i < jsonREGS.length; i++) {
			movs.push(jsonREGS[i].duration)
		}
	}
	dateXdataY = [
		ids,
		movs
	];
	return dateXdataY;
}

function addDrugToChart() {
	debugger;
	let id = drugXusageY[0].indexOf(document.getElementById('selectDrugs').value);
	let drug = drugXusageY[0][id];
	let count = drugXusageY[1][id];

	let select = document.getElementById('selectErase');
	let option = document.createElement('option');
	option.appendChild(document.createTextNode(drug));
	option.id = id;
	option.value = drug;
	select.appendChild(option);

	if (ErasedrugXusageY.length == 0) {
		ErasedrugXusageY[0] = [drug];
		ErasedrugXusageY[1] = [count];
	}
	else {
		ErasedrugXusageY[0].push(drug);
		ErasedrugXusageY[1].push(count);
	}

	return ErasedrugXusageY;
}

function removeDrugItemChart() {
	let select = document.getElementById('selectErase');
	let opSelect = select.value;
	select.options[select.selectedIndex] = null;
	let id = ErasedrugXusageY[0].indexOf(opSelect);

	ErasedrugXusageY[0].splice(id, 1);
	ErasedrugXusageY[1].splice(id, 1);

	return ErasedrugXusageY;
}

function dateFilterChart() {
	debugger;
	let d1 = document.getElementById('dateSince').value;
	if (d1 == "") {
		d1 = '01/01/1970';
	}
	let since = new Date(d1);
	since.setHours(since.getHours() + 3);

	d1 = document.getElementById('dateUntil').value;
	let until
	if (d1 == "") {
		until = new Date(Date.now());
	}
	else {
		until = new Date(d1);
	}
	until.setHours(until.getHours() + 3);
	let x = [];
	let y = [];
	let d = 0;
	for (i = 0; i < dateXdataY[0].length; i++) {
		d = dateXdataY[0][i].split(', ')[0];

		var dateParts = d.split("/");
		// month is 0-based, that's why we need dataParts[1] - 1
		d = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

		if (d >= since) {

			if (d <= until) {
				x.push(dateXdataY[0][i]);
				y.push(dateXdataY[1][i]);
			}
		}
	}
	return [
		x,
		y
	];
	//console.log(dateXdataY[0][0].split(', ')[0]);
}

function updateAutocompleteList() {
	let auto = document.getElementById('autocompleteList');
	auto.innerHTML = "";
	auto.lastChild = "";

	let array1 = [];
	let array2 = [];

	debugger;
	for (i = 0; i < jsonDRUGS.length; i++) {
		array1.push(jsonDRUGS[i].drug_id);
	}

	for (i = 0; i < array1.length; i++) {
		let d = jsonDRUGS.find(function (jsonDRUGS) { return jsonDRUGS.drug_id == array1[i] });
		array1[i] = d.name;
	}
	for (i = 0; i < jsonRES.length; i++) {
		array2.push(jsonRES[i].researcher_id);
	}

	for (i = 0; i < array2.length; i++) {
		let d = jsonRES.find(function (jsonRES) { return jsonRES.researcher_id == array2[i] });
		array2[i] = d.name;
	}
	simplifiedArray = array1.filter(function (item, pos) {
		return array1.indexOf(item) == pos;
	});
	sa2 = array2.filter(function (item, pos) {
		return array2.indexOf(item) == pos;
	});

	simplifiedArray = simplifiedArray.concat(sa2);

	let option = document.createElement('option');
	let value = 'Control';

	option.appendChild(document.createTextNode(value));
	option.value = value;

	auto.appendChild(option);

	option = document.createElement('option');
	value = 'Droga';

	option.appendChild(document.createTextNode(value));
	option.value = value;

	auto.appendChild(option);

	for (let i = 0; i < simplifiedArray.length; i++) {
		option = document.createElement('option');
		value = simplifiedArray[i];

		option.appendChild(document.createTextNode(value));
		option.value = value;

		auto.appendChild(option);
	}

}