//Variables globales
var id = 1, cron = 0;
var hour = 0;
var jsonDRUGS = jsonRES = jsonREGS = 0;
var put = false;
sessionStorage['id'] = 0;

//Usadas en saveData, loadAllData y showRowTable
//var duration = 0, move = 0, date = 0, treat = 0, obs = 0, drug = 0, researcher = 0;

//Inserta el header en cada documento HTML
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("header").innerHTML = `<a id="logoLink" href="index.html"><img src="svg/TRatCircle.svg" title="T-Rat" alt="T-Rat"></a>
	<div class="toggle-container">

		<input type="checkbox" id="switch" onclick="changeTheme()"/><label for="switch"></label>
	</div>
	<nav>
		<ul id="nav_links">
			<li><a href="javascript:void(0)">Texto1</a></li><li><a href="javascript:void(0)">Texto2</a></li>
		</ul>
	</nav>`;

	if (localStorage["l_username"] == null) {
		document.getElementById("header").innerHTML += `<a class="cta"><button type="button" onclick="operation('id01')">Ingresar</button></a>
		<a class="cta"><button type="button" onclick="operation('id02')">Registrarse</button></a>`
	}
	else {
		document.getElementById("nav_links").innerHTML += `<li><a id="user" href="javascript:void(0)"></a>
		<ul class="submenu">
			<li><a href="javascript:void(0)">Texto1</a></li>
			<li><a href="javascript:void(0)">Texto2</a></li>
			<li><a onclick="logout()" href="javascript:void(0)">Salir</a></li>
		</ul>
	</li>`;
		document.getElementById("user").innerHTML = localStorage["l_username"];
	}
});


//////////* CONEXION CON BACKEND *//////////


var url = "http://181.93.113.26:8080/";

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

//Obtiene una fecha actual, utilizada para indicar la fecha de la última prueba realizada


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
	debugger;
	var response = await fetch(url + endpoint + id, {
		method: 'DELETE',
	})
	return response.json();
}

async function toBackPUT(endpoint, id, jsonString) {
	debugger;
	var response = await fetch(url + endpoint + id, {
		method: 'PUT',
		body: JSON.stringify(jsonString),
		headers: {
			"Content-type": "application/json"
		}
	})
	return response;
}

//////* FIN DE CONEXION CON BACKEND *///////




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
function changeTheme() {
	var checkbox = document.getElementById('switch');
	if (checkbox.checked == true) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('data-theme', 'dark');
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('data-theme', 'light');
	}
}

//Cronómetro
function cronometer() {
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
	return strSplit[0];
}

//Detiene el cronómetro
function stopCron() {
	clearInterval(cron);
	cron = 0;
	document.getElementById("h1").innerHTML = "Prueba finalizada";
	sessionStorage["sec"] = document.getElementById("sec").innerHTML;
	sessionStorage["mov"] = document.getElementById("mov").innerHTML;
	sessionStorage["date"] = getTime();
	sessionStorage["start"] = false;
	document.querySelector("link[rel*='icon']").href = "svg/btnStop.svg";
}

//Reinicia el sistema
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
	//Elimina los datos de la prueba y retorna a la pantalla principal
	function innerRestart() {
		sessionStorage.removeItem("sec");
		sessionStorage.removeItem("mov");
		sessionStorage.removeItem("date");
		location.replace("index.html");
	}
}

//Recupera los datos de la última prueba para rellenar los campos con datos obligatorios automáticamente
function getData() {
	if (sessionStorage["sec"] == null) {
		alert("No hay datos, realice una prueba.")
	}
	else {
		document.getElementById("fduration").value = sessionStorage["sec"];
		document.getElementById("fdate").value = sessionStorage["date"];
		document.getElementById("fmovement").value = sessionStorage["mov"];
	}
}

//Limpia los campos de entrada
function clearInputs(formId) {
	document.getElementById(formId).reset();
}

//Verifica el estado del módulo Arduino antes de comenzar una prueba. En caso de haber un error, se informará. En caso contrario, la prueba iniciará
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
	debugger;

	if (idp != lastButtonPressed) {
		if (opt == "drug") {
			if (jsonDRUGS == 0) {
				jsonDRUGS = await toBackGETAll(epDrugAll);
			}
			dT = jsonDRUGS;
		}
		else if (opt == 'researcher') {
			if (jsonRES == 0) {
				jsonRES = await toBackGETAll(epReserAll);
			}
			dT = jsonRES;
		}
		else {
			if (jsonREGS == 0 || jsonRES == 0 || jsonDRUGS == 0) {
				jsonREGS = await toBackGETAll(epRegAll);
				jsonRES = await toBackGETAll(epReserAll);
				jsonDRUGS = await toBackGETAll(epDrugAll);
			}
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
	debugger;
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
	debugger;
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

	innerLoadData()

	function innerLoadData() {
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

				showRowTable(jsonREGS[lc].register_id, t, r.name, jsonREGS[lc].duration, jsonREGS[lc].movement, d.name, jsonREGS[lc].treatment, jsonREGS[lc].observations);
				lc += 1;
			}
		}
		else {
			document.getElementById("noData").style.display = "block";
		}
		document.getElementById("registers").innerHTML = jsonREGS.length;
	}
}

//Guarda un registro
async function saveData(inResults) {
	debugger;
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
		debugger;

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
	debugger;
	if (opt == "researcher") {
		innersaveRes_Drug('resNameNew', 'resCatNew', epReser, epReserAll, epReserPOST, "El investigador ya existe, elija otro.", "Investigador guardado con éxito.", 'frmResearcher', 'popupNewRes', 'selectResearchers', 'category', 'researcher_id')
	}
	else if (opt == "drug") {
		innersaveRes_Drug('drugNameNew', 'drugDoseNew', epDrug, epDrugAll, epDrugPOST, "La droga ya existe, elija otra.", "Droga guardada con éxito.", 'frmDrug', 'popupNewDrug', 'selectDrugs', 'dosage', 'drug_id')
	}

	async function innersaveRes_Drug(field1, field2, epPUT, epALL, endpointPOST, alertExist, confirm, frmInput, cancelElement, sel, prop, prop2) {
		debugger;
		let val1 = document.getElementById(field1).value;
		let val2 = document.getElementById(field2).value;

		if (val1 == "" || val2 == "") {
			alert("Algunos campos estan vacíos.");
		}
		else {
			var dT = await toBackGETAll(epALL);
			debugger;

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
			debugger;
			let data = { 'name': val1, [prop]: val2 };
			if (put == true) {
				id = parseInt(sessionStorage['id'], 10);
				toBackPUT(epPUT, id, data);
				debugger;
				let row = document.getElementById(id).querySelectorAll('td');
				row[1].innerHTML = val1;
				row[2].innerHTML = val2;
				put = false
			}
			else {
				toBackPOST(endpointPOST, data);
				showRowDrugTable(dT[dT.length - 1][prop2] + 1, val1, val2);
				debugger;
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
	debugger;
	innerLoadRes_drug('selectResearchers', 'researcher', epReserAll, 'category', 'researcher_id')
	innerLoadRes_drug('selectDrugs', 'drug', epDrugAll, 'dosage', 'drug_id')

	async function innerLoadRes_drug(sel, opt, endpoint, v1, id) {
		debugger;
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
			debugger;
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
	debugger;
	var id = sessionStorage['id'];
	if (id == 0 || id == undefined) {
		alert("Debe seleccionar una fila de la tabla");
	}
	else {
		id = parseInt(id, 10);

		result = confirm('Desea eliminar el registro ' + id + '?');
		if (result == true) {
			if (opt == 'reg') {
				response = await toBackDELETE(epReg, id);
			}
			else if (opt == 'res') {
				response = await toBackDELETE(epReser, id);
			}
			else if (opt == 'drug') {
				response = await toBackDELETE(epDrug, id);
				debugger
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
	debugger;
	return jsonREGS.find(function (jsonREGS) { return jsonREGS.register_id == id });
}

async function load_DR_Table(opt, tableLen) {
	debugger;
	if (opt == "drug") {
		innerLoad(dT, 'drug_id', 'dosage');
	}
	else {
		innerLoad(dT, 'researcher_id', 'category');
	}
	function innerLoad(dT, v1, v2) {
		debugger;
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
	debugger;
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("tbResults");
	tr = table.getElementsByTagName("tr");
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

function sortTable(n, isNumber) {
	debugger;
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