debugger;
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

debugger;
var ctx = document.getElementById('chartRegByCD').getContext('2d');
var chartRegByCD = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['Control', 'Droga'],
		datasets: [{
			label: '# de registros',
			data: [1, 1],
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

debugger;
var ctx = document.getElementById('chartDrugs').getContext('2d');
var chartDrugs = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['Control', 'Droga'],
		datasets: [{
			label: 'Drogas usadas',
			data: [1, 1],
			backgroundColor: backColor,
			borderColor: borColor,
			borderWidth: 1
		}]
	},
	options: {}
});


var ctx = document.getElementById('chartIDMov').getContext('2d');
var chartIDMov = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',

	// The data for our dataset
	data: {
		labels: ['0'],
		datasets: [{
			label: 'ID Registro / Movimiento',
			backgroundColor: 'rgb(255, 99, 132, 0.7)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0],
			borderWidth: 1
		}]
	},

	// Configuration options go here
	options: {}
});

var ctx = document.getElementById('chartIDDur').getContext('2d');
var chartIDDur = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',

	// The data for our dataset
	data: {
		labels: ['0'],
		datasets: [{
			label: 'ID Registro / Duración (s)',
			backgroundColor: 'rgb(255, 99, 132, 0.7)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0],
			borderWidth: 1
		}]
	},

	// Configuration options go here
	options: {}
});



getDataForCharts();
async function getDataForCharts() {
	let results;
	results = await dataChartRegs();
	updateRegCD(results, chartRegByCD);

	results = await dataChartDrugs();
	updateDrugsCount(results, chartDrugs);

	results = await dataChartIDMov('mov');
	updateIDMov(results, chartIDMov);

	results = await dataChartIDMov();
	updateIDMov(results, chartIDDur);
}

function updateRegCD(results, chart) {
	chart.data.datasets.forEach((dataset) => {
		dataset.data = results;
	});
	chart.update();
}

function updateDrugsCount(results, chart) {
	chart.data.labels = results[0];
	chart.data.datasets.forEach((dataset) => {
		dataset.data = results[1];
	});
	chart.update();
}

function updateIDMov(results, chart) {
	chart.data.labels = results[0];
	chart.data.datasets.forEach((dataset) => {
		dataset.data = results[1];
	});
	chart.update();
}
// this is a utility function to fetch the variables from the CSS
/*function cssvar(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name);
}

var chart = new Chart('chartTest', {
	type: 'line',
	data: {
		labels: ['a', 'b', 'c'],
		datasets: [{
			label: 'the line',
			data: [1, 2, 3],
			// the folloving are fetched from the CSS
			backgroundColor: cssvar('--chart-bg-color'),
			borderColor: cssvar('--chart-border-color'),
			borderWidth: cssvar('--chart-border-width')
		}],
	}
})*/