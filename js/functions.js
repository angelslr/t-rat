function checkTheme() {
    if (localStorage.getItem('data-theme') == "dark") {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("dark-mode").src = "svg/btnLight.svg";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("dark-mode").src = "svg/btnDark.svg";
    }
}

function changeTheme() {
    var image = document.getElementById("dark-mode")
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

function restart() {
    if (cron != 0) {
        var answer = confirm("Prueba en ejecución, ¿desea volver al inicio? (Si lo hace, la prueba se detendrá)");
        if (answer == true) {
            stopCron();
            location.replace("index.html");
        }
    }
    else {
        location.replace("index.html");
    }
}

var cron;
function stopCron() {
    clearInterval(cron);
    cron = 0;
    document.getElementById("h1").innerHTML = "Prueba finalizada";
}

function load() {
    contador_s = 0;
    contador_m = 0;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");

    cron = setInterval(
        function () {
            if (contador_s == 60) {
                contador_s = 0;
                contador_m++;
                m.innerHTML = contador_m;

                if (contador_m == 60) {
                    contador_m = 0;
                }
            }
            s.innerHTML = contador_s;
            contador_s++;
        }
        , 1000);
}

n = 1;
function generateTable() {
    var table = document.getElementById("tbResults");
    var row = table.insertRow(-1);
    var nro = row.insertCell(0);
    var farmaco = row.insertCell(1);
    var duracion = row.insertCell(2);
    var pasos = row.insertCell(3)
    var observaciones = row.insertCell(4);

    nro.innerHTML = n++;
    farmaco.innerHTML = document.getElementById("ffarmaco").value;
    duracion.innerHTML = document.getElementById("fduracion").value;
    pasos.innerHTML = document.getElementById("fpasos").value;
    observaciones.innerHTML = document.getElementById("fobservaciones").value;

    a++;
}