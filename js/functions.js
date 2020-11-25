//Variables globales
var id = 1, cron = 0;

//Usadas en saveData, loadAllData y showRowTable
var duration = 0, move = 0, date = 0, treat = 0, obs = 0, drug = 0, researcher = 0;

debugger;
//localStorage.setItem('data', JSON.stringify());
//sessionStorage.clear();
//localStorage.removeItem('dataDrug');

//Inserta el header en cada documento HTML
document.addEventListener("DOMContentLoaded", function (event) {
	debugger;
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

//Asigna el tema seleccionado almacenado, se utiliza en todas las páginas
if (localStorage.getItem('data-theme') == "dark") {
	document.documentElement.setAttribute('data-theme', 'dark');
}
else {
	document.documentElement.setAttribute('data-theme', 'light');
}

//Si hay una sesión válida, se oculta la pantalla de bienvenida
function hideWelcome() {
	debugger;
	if (localStorage["l_username"] != null) {
		location.replace("index.html");
	}
}

//Comprueba si se inició sesión, en caso negativo, se retorna a la página de bienvenida
function validateSession() {
	debugger;
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
function login() {
	debugger;
	let us = document.getElementById("l_username").value;
	let ps = document.getElementById("l_password").value;

	if (us == "" || ps == "") {
		alert("Algunos campos estan vacíos.");
	}
	else {
		let dataReg = JSON.parse(localStorage.getItem('dataReg'));
		let tempUsername = document.getElementById("l_username").value;
		let tempPass = document.getElementById("l_password").value;
		let exist = false;
		let i = 0;
		if (dataReg != null) {
			while (i < dataReg.length) {
				if (tempUsername == dataReg[i].username) {
					exist = true;
					if (tempPass == dataReg[i].password) {
						localStorage["l_username"] = document.getElementById("l_username").value;
						location.replace("index.html");
						break;
					}
					else {
						alert("Contraseña incorrecta.")
					}
				}
				i += 1;
			}
			if (exist == false) {
				alert("Usuario inexistente.")
			}
		}
		else {
			alert("Usuario inexistente.")
		}
	}
}

//Registrar un usuario
function signUp() {
	debugger;
	let name = document.getElementById("r_name").value;
	let surname = document.getElementById("r_surname").value;
	let username = document.getElementById("r_username").value;
	let password = document.getElementById("r_password").value;

	if (name == "" || surname == "" || username == "" || password == "") {
		alert("Algunos campos estan vacíos.");
	}
	else {
		let dataReg = JSON.parse(localStorage.getItem('dataReg'));
		let exist = false;
		let i = 0;
		if (dataReg != null) {
			while (i < dataReg.length) {
				if (username == dataReg[i].username) {
					alert("El usuario ya existe, elija otro.")
					exist = true;
					break;
				}
				i += 1;
			}
			if (exist == false) {
				dataReg.push({ 'name': name, 'surname': surname, 'username': username, 'password': password });
				localStorage.setItem('dataReg', JSON.stringify(dataReg));
				innerSign();
			}
		}
		else {
			dataReg = [{ 'name': name, 'surname': surname, 'username': username, 'password': password }];
			localStorage.setItem('dataReg', JSON.stringify(dataReg));
			innerSign();
		}
	}
	function innerSign() {
		alert("Usuario registrado con éxito, ya puede iniciar sesión.");
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

//Detiene el cronómetro
function stopCron() {
	debugger;
	clearInterval(cron);
	cron = 0;
	document.getElementById("h1").innerHTML = "Prueba finalizada";
	sessionStorage["sec"] = document.getElementById("sec").innerHTML;
	sessionStorage["mov"] = document.getElementById("mov").innerHTML;
	sessionStorage["duration"] = getTime();
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
		sessionStorage.removeItem("duration");
		location.replace("index.html");
	}
}

//Obtiene una fecha actual, utilizada para indicar la fecha de la última prueba realizada
function getTime() {
	debugger;
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();
	/*let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();*/

	if (dd < 10) { dd = '0' + dd; }
	if (mm < 10) { mm = '0' + mm; }
	/*if (h < 10) { h = '0' + h; }
	if (m < 10) { m = '0' + m; }
	if (s < 10) { s = '0' + s; }*/

	today = yyyy + '-' + mm + '-' + dd/* + " " + h + ":" + m + ":" + s*/;
	return today;
}

//Recupera los datos de la última prueba para rellenar los campos con datos obligatorios automáticamente
function getData() {
	debugger;
	if (sessionStorage["sec"] == null) {
		alert("No hay datos, realice una prueba.")
	}
	else {
		document.getElementById("fduration").value = sessionStorage["sec"];
		document.getElementById("fdate").value = sessionStorage["duration"];
		document.getElementById("fmovement").value = sessionStorage["mov"];
	}
}

//Limpia los campos de entrada
function clearInputs(formId) {
	debugger;
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
	debugger;
	var table = document.getElementById("tbResults");
	var row = table.insertRow(-1);
	var rowNro = row.insertCell(0);
	var rowDate = row.insertCell(1);
	var rowResearcher = row.insertCell(2);
	var rowDuration = row.insertCell(3);
	var rowMov = row.insertCell(4);
	var rowDrug = row.insertCell(5);
	var rowTreat = row.insertCell(6);
	var rowObs = row.insertCell(7);

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

//Muestra todos los registros de la base de datos
function loadAllData() {
	debugger;
	var dataTemp = JSON.parse(localStorage.getItem('data'));
	var i = 0;
	if (dataTemp != null) {
		//Se lee cada key de la cadena JSON, y se utiliza la función showRowTable para añadirlas a la tabla
		while (i < dataTemp.length) {
			showRowTable(dataTemp[i].id, dataTemp[i].date, dataTemp[i].researcher, dataTemp[i].duration, dataTemp[i].move, dataTemp[i].drug, dataTemp[i].treat, dataTemp[i].obs);
			i += 1;
		}
	}
	else {
		document.getElementById("noData").style.display = "block";
	}
	document.getElementById("registers").innerHTML = "Cantidad de registros: " + i;
}

//Guarda un registro
function saveData(inResults) {
	debugger;

	duration = document.getElementById("fduration").value;
	move = document.getElementById("fmovement").value;
	date = document.getElementById("fdate").value;
	treat = document.getElementById("ftreatment").value;
	obs = document.getElementById("fobservations").value;
	drug = document.getElementById("selectDrugs").value;
	researcher = document.getElementById("selectResearchers").value;

	if (duration == "" || move == "" || date == "" || treat == "" || obs == "" || drug == "" || researcher == "") {

		let answer = confirm("Algunos campos estan vacios, ¿desea continuar?");
		if (answer == true) {
			innerSave();
			if (inResults == true) {
				showRowTable(id, date, researcher, duration, move, drug, treat, obs);
			}
			cancel('popup');
		}
	}
	else {
		innerSave();
		//Al guardar un registro, se mostrará de inmediado, sin necesidad de recargar la página
		if (inResults == true) {
			showRowTable(id, date, researcher, duration, move, drug, treat, obs);
		}
		cancel('popup');
	}
	//Funcion interna que verifica si el JSON esta vacío o no
	function innerSave() {
		debugger;
		let dataTemp = JSON.parse(localStorage.getItem('data'));

		if (dataTemp == null) {
			dataTemp = [{ 'id': id, 'duration': duration, 'move': move, 'date': date, 'treat': treat, 'obs': obs, 'drug': drug, 'researcher': researcher }];
			document.getElementById("noData").style.display = 'none';
		}
		else {
			id = dataTemp[dataTemp.length - 1].id + 1;
			dataTemp.push({ 'id': id, 'duration': duration, 'move': move, 'date': date, 'treat': treat, 'obs': obs, 'drug': drug, 'researcher': researcher });
		}
		localStorage.setItem('data', JSON.stringify(dataTemp));
		alert("Registro guardado.");
	}
}

//Despues de seleccionar una fila de la tabla y utilizar el respectivo boton, esta función desplegará el menu de edicion, además de rellenarlo con los datos de la fila enviados desde "results.html"
function editData(id, dat, res, dur, mov, dru, tre, obs) {
	debugger;
	if (id == null || id == "") {
		alert("Debe seleccionar una fila de la tabla");
	}
	else {
		//Despliega menu
		operation('popup');
		loadRes_drug();
		//Rellena datos
		document.getElementById("idPopup").innerHTML = "Modificar datos del registro " + id;
		document.getElementById("fduration").value = dur;
		document.getElementById("fmovement").value = mov;
		document.getElementById("fdate").value = dat;
		document.getElementById("ftreatment").value = tre;

		//En caso de encontrar un Ver más, se rellena con el campo observaciones correspondiente al ID
		if (obs.length > 11) {
			let dataTemp = JSON.parse(localStorage.getItem('data'));
			document.getElementById("fobservations").value = dataTemp[id - 1].obs;
		}
		//Todas las observaciones que no sean Ver más, serán salteadas
		else {
			document.getElementById("fobservations").value = obs;
		}
		document.getElementById("selectDrugs").value = dru;
		document.getElementById("selectResearchers").value = res;
	}
}

function toResults() {
	location.replace('results.html');
}

idRes = 1;
idDrug = 1;
function saveRes_Drug(opt) {
	debugger;

	if (opt == "researcher") {
		innersaveRes_Drug('resNameNew', 'resCatNew', 'dataRes', "El investigador ya existe, elija otro.", "Investigador guardado con éxito.", 'frmResearcher', 'popupNewRes', 'selectResearchers')
	}
	else if (opt == "drug") {
		innersaveRes_Drug('drugNameNew', 'drugDoseNew', 'dataDrug', "La droga ya existe, elija otra.", "Droga guardada con éxito.", 'frmDrug', 'popupNewDrug', 'selectDrugs')
	}

	function innersaveRes_Drug(field1, field2, localData, alertExist, confirm, frmInput, cancelElement, sel) {
		debugger;
		let res = document.getElementById(field1).value;
		let cat = document.getElementById(field2).value;

		if (res == "" || cat == "") {
			alert("Algunos campos estan vacíos.");
		}
		else {

			let dT = JSON.parse(localStorage.getItem(localData));
			let exist = false;
			let i = 0;
			if (dT != null) {
				while (i < dT.length) {
					if (res == dT[i].res) {
						alert(alertExist)
						exist = true;
						break;
					}
					i += 1;
				}
				if (exist == false) {
					if (opt == "researcher") {
						idRes = dT[dT.length - 1].id + 1;
						dT.push({ 'id': idRes, 'res': res, 'cat': cat });
					}
					else if (opt == "drug") {
						idDrug = dT[dT.length - 1].id + 1;
						dT.push({ 'id': idRes, 'drug': res, 'dose': cat });
					}
					localStorage.setItem(localData, JSON.stringify(dT));
					innerFromInnerSave();
				}
			}
			else {
				if (opt == "researcher") {
					dT = [{ 'id': idRes, 'res': res, 'cat': cat }];
				}
				else if (opt == "drug") {
					dT = [{ 'id': idDrug, 'drug': res, 'dose': cat }];
				}

				localStorage.setItem(localData, JSON.stringify(dT));
				innerFromInnerSave();
			}
		}
		function innerFromInnerSave() {
			debugger;
			alert(confirm);
			clearInputs(frmInput);
			cancel(cancelElement);

			let select = document.getElementById(sel);
			let option = document.createElement('option');
			option.appendChild(document.createTextNode(res));
			option.value = res;

			select.appendChild(option);
		}
	}
}

function loadRes_drug() {
	debugger;

	innerLoadRes_drug('dataRes', 'selectResearchers', 'researcher')
	innerLoadRes_drug('dataDrug', 'selectDrugs', 'drug')

	function innerLoadRes_drug(localData, sel, opt) {
		debugger;
		let dT = JSON.parse(localStorage.getItem(localData));
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
			if (opt == "researcher") {
				while (i < dT.length) {
					let option = document.createElement('option');
					option.appendChild(document.createTextNode(dT[i].res));
					option.value = dT[i].res;

					select.appendChild(option);
					i += 1;
				}
			}
			else if (opt == "drug") {
				while (i < dT.length) {
					let option = document.createElement('option');
					option.appendChild(document.createTextNode(dT[i].drug));
					option.value = dT[i].drug;

					select.appendChild(option);
					i += 1;
				}
			}
		}
	}
}