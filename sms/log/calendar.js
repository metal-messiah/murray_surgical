class Calendar {
	constructor(data) {
		console.log('make calendar');
		google.charts.load('current', { packages: [ 'calendar' ] });
		this.setData = this.setData.bind(this);
		google.charts.setOnLoadCallback(this.setData);

		this.dataTable = null;
		this.chart = null;
		this.elem = document.getElementById('calendar');

		this.data = data;
		this.options = {
			title: 'Appointments',
			height: 200,
			width: $(window).width * 0.8,
			calendar: { cellSize: 12 }
		};

		if (screen.width < 800) {
			this.options.calendar = { cellSize: 5 };
			this.options.height = 100;
		}
	}

	onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	setData() {
		this.dataTable = new google.visualization.DataTable();
		this.dataTable.addColumn({ type: 'date', id: 'Date' });
		this.dataTable.addColumn({ type: 'number', id: 'Appointments' });

		const dates = this.data.map((d) => d.date).filter(this.onlyUnique);

		let vals = {};
		this.data.forEach((d) => {
			vals[d.date] = vals[d.date] ? vals[d.date] + 1 : 1;
		});

		const rows = dates.map((d) => {
			return [ new Date(d), vals[d] ];
		});

		this.dataTable.addRows(rows);

		this.chart = new google.visualization.Calendar(this.elem);

		this.draw();
	}

	draw() {
		this.chart.draw(this.dataTable, this.options);
		$(this.elem).hide();
	}
}
