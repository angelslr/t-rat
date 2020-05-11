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

var cronometro;
function detenerse() {
    clearInterval(cronometro);
    cronometro = 0;
    document.getElementById("h1").innerHTML = "Prueba finalizada";
}

function restart() {
    if (cronometro != 0) {
        var answer = confirm("Prueba en ejecucion, ¿desea volver al inicio? (Si lo hace, la prueba se detendra)");
        if (answer == true) {
            detenerse();
            location.replace("index.html")
        }
    }
    else {
        location.replace("index.html")
    }
}

function load() {
    contador_s = 0;
    contador_m = 0;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");

    cronometro = setInterval(
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
    a = 0;
    while (a < 10) {
        var table = document.getElementById("tbResults");
        var row = table.insertRow(-1);
        var nro = row.insertCell(0);
        var farmaco = row.insertCell(1);
        var duracion = row.insertCell(2);
        var pasos = row.insertCell(3)
        var observaciones = row.insertCell(4);

        nro.innerHTML = n++;
        farmaco.innerHTML = document.getElementById("ffarmaco").value;
        duracion.innerHTML = "5:40";
        pasos.innerHTML = "500"
        observaciones.innerHTML = "Evidente disminucion de la actividad"

        a++;
    }
}