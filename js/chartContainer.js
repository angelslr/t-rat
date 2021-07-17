var randomColorGenerator = function () {
	return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
};

const borColor = [
	"#25CCF7", "#FD7272", "#54a0ff", "#00d2d3",
	"#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e",
	"#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
	"#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6",
	"#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d",
	"#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#dfe6e9",
	"#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7",
	"#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055",
	"#d63031", "#feca57", "#5f27cd", "#54a0ff", "#01a3a4"
]

const backColor = [
	"rgba(37, 204, 247, 0.2)", "rgba(253, 114, 114, 0.2)", "rgba(84, 160, 255, 0.2)", "rgba(0, 210, 211, 0.2)", "rgba(26, 188, 156, 0.2)", "rgba(46, 204, 113, 0.2)", "rgba(52, 152, 219, 0.2)", "rgba(155, 89, 182, 0.2)", "rgba(52, 73, 94, 0.2)", "rgba(22, 160, 133, 0.2)", "rgba(39, 174, 96, 0.2)", "rgba(41, 128, 185, 0.2)", "rgba(142, 68, 173, 0.2)", "rgba(44, 62, 80, 0.2)", "rgba(241, 196, 15, 0.2)", "rgba(230, 126, 34, 0.2)", "rgba(231, 76, 60, 0.2)", "rgba(236, 240, 241, 0.2)", "rgba(149, 165, 166, 0.2)", "rgba(243, 156, 18, 0.2)", "rgba(211, 84, 0, 0.2)", "rgba(192, 57, 43, 0.2)", "rgba(189, 195, 199, 0.2)", "rgba(127, 140, 141, 0.2)", "rgba(85, 239, 196, 0.2)", "rgba(129, 236, 236, 0.2)", "rgba(116, 185, 255, 0.2)", "rgba(162, 155, 254, 0.2)", "rgba(223, 230, 233, 0.2)", "rgba(0, 184, 148, 0.2)", "rgba(0, 206, 201, 0.2)", "rgba(9, 132, 227, 0.2)", "rgba(108, 92, 231, 0.2)", "rgba(255, 234, 167, 0.2)", "rgba(250, 177, 160, 0.2)", "rgba(255, 118, 117, 0.2)", "rgba(253, 121, 168, 0.2)", "rgba(253, 203, 110, 0.2)", "rgba(225, 112, 85, 0.2)", "rgba(214, 48, 49, 0.2)", "rgba(254, 202, 87, 0.2)", "rgba(95, 39, 205, 0.2)", "rgba(84, 160, 255, 0.2)", "rgba(1, 163, 164, 0.2)"
]
/*var data;
(
	async () => {
		data = (await dataToChart())
	}
)()*/

/*var ctx = document.getElementById('chartRegByCD').getContext('2d');
var chartRegByCD = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['Control', 'Droga'],
		datasets: [{
			label: '# de registros',
			data: [0],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1
		}]
	},
	options: {}
});
*/

/*var ctx = document.getElementById('chartDrugs').getContext('2d');
var chartDrugs = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['-'],
		datasets: [{
			label: 'Drogas usadas',
			data: [0],
			backgroundColor: backColor,
			borderColor: borColor,
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					stepSize : 1
				},
				scaleLabel: {
					display: true,
					labelString: 'Cantidad de Registros'
				}
			}]
		}
	}
});
*/

var ctx = document.getElementById('chartDateData').getContext('2d');
var chartDateData = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['-'],
		datasets: [{
			label: 'ID Registro / Movimiento',
			backgroundColor: backColor,
			borderColor: borColor,
			data: [0],
			borderWidth: 1
		}]
	},
	options: {
		tooltips: {
			callbacks: {
				label: function (tooltipItem, data) {
					var value = data.datasets[0].data[tooltipItem.index];
					if (value === 1) {
						value = 0;
					}
					let opt = document.getElementById('selectOpt');
					let text = opt.options[opt.selectedIndex].text;
					return 'Fecha Registro / ' + text + ': ' + value;
				}
			}
		},
		scales: {
			xAxes: [{
				ticks: {
					autoSkip: true,
					maxTicksLimit: 5
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Movimiento/Duración'
				}
			}]
		}
	}
});

var ctx = document.getElementById('chartResearchers').getContext('2d');
var chartResearchers = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['-'],
		datasets: [{
			label: 'Pruebas realizadas por investigadores',
			data: [0],
			backgroundColor: backColor,
			borderColor: borColor,
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					stepSize : 1
				},
				scaleLabel: {
					display: true,
					labelString: 'Nro de pruebas realizadas'
				}
			}]
		}
	}
});

var ctx = document.getElementById('chartDrugsMov').getContext('2d');
var chartDrugsMov = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['-'],
		datasets: [{
			label: 'Relación Movimiento/Droga',
			data: [{
				label: "Blue",
				backgroundColor: "blue",
				data: [3, 7, 4]
			}, {
				label: "Red",
				backgroundColor: "red",
				data: [4, 3, 5]
			}, {
				label: "Green",
				backgroundColor: "green",
				data: [7, 2, 6]
			}],
			backgroundColor: backColor,
			borderColor: borColor,
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Cantidad de movimiento'
				}
			}]
		}
		/*scales: {
			yAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false
				}
			}],
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false
				}
			}]
		}*/
	}
});

var ctx = document.getElementById('chartDrugsMovByDose').getContext('2d');
var chartDrugsMovByDose = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['-'],
		datasets: [{
			label: 'Relación Movimiento/Droga',
			data: [{
				label: "Blue",
				backgroundColor: "blue",
				data: [3, 7, 4]
			}, {
				label: "Red",
				backgroundColor: "red",
				data: [4, 3, 5]
			}, {
				label: "Green",
				backgroundColor: "green",
				data: [7, 2, 6]
			}],
			backgroundColor: backColor,
			borderColor: borColor,
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Cantidad de movimiento'
				}
			}]
		}
		/*scales: {
			yAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false
				}
			}],
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					display: false
				}
			}]
		}*/
	}
});


getDataForCharts();



async function getDataForCharts() {
	let results;
	jsonREGS = await toBackGETAll(epRegAll);
	jsonDRUGS = await toBackGETAll(epDrugAll);
	jsonRES = await toBackGETAll(epReserAll);

	//await dataChartDrugs();

	fillDateData();

	results = await dataChartRes();
	updateReplaceDataLabel(results, chartResearchers);

	results = await dataChartMov();
	updateDataLabelDrugs(results, chartDrugsMov);

	results = await dataChartMovByDose();
	updateDataLabelDrugs(results, chartDrugsMovByDose);
}

/*function addElement() {
	let results = addDrugToChart();
	updateReplaceDataLabel(results, chartDrugs);
}

function removeElement() {
	let results = removeDrugItemChart();
	updateReplaceDataLabel(results, chartDrugs);
}*/

function fillDateData() {
	results = dataDateChart();
	updateReplaceDataLabel(results, chartDateData);
}

function dateFilter() {
	let results = dateFilterChart();
	updateReplaceDataLabel(results, chartDateData);
}


function updateReplaceDataLabel(results, chart) {
	chart.data.labels = results[0];
	chart.data.datasets.forEach((dataset) => {
		dataset.data = results[1];
	});
	chart.update();
}

function updateDataLabelDrugs(results, chart) {
	var data = {
		labels: results[0],
		datasets: [
			{
				label: "Min",
				backgroundColor: "rgba(37, 204, 247, 0.4)",
				data: results[1]
			},
			{
				label: "Prom",
				backgroundColor: "rgba(253, 114, 114, 0.4)",
				data: results[2]
			},
			{
				label: "Max",
				backgroundColor: "rgba(84, 160, 255, 0.4)",
				data: results[3]
			}
		]
	};
	chart.data = data;
	chart.update();
}