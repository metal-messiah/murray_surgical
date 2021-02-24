class Timeline {
	constructor(data) {
		console.log('generate timeline');
		google.charts.load('current', { packages: [ 'timeline' ] });
		this.setData = this.setData.bind(this);
		google.charts.setOnLoadCallback(this.setData);

		this.dataTable = null;
		this.chart = null;
		this.elem = document.getElementById('timeline');

		this.data = data;
		this.options = {
			title: 'Appointments',
			height: window.innerHeight * 0.5,
			width: window.innerWidth * 0.8
		};
	}

	onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	addMinutes(date, minutes) {
		return new Date(date.getTime() + minutes * 60000);
	}

	setData() {
		this.dataTable = new google.visualization.DataTable();
		this.dataTable.addColumn({ type: 'string', id: 'Name' });
		this.dataTable.addColumn({ type: 'date', id: 'Start' });
		this.dataTable.addColumn({ type: 'date', id: 'End' });

		const rows = this.data
			.filter((d) => {
				// return new Date(d.date) - new Date() > 0;
				const then = new Date(d.date);
				const now = new Date();

				return (
					then.getDate() === now.getDate() &&
					then.getMonth() === now.getMonth() &&
					then.getFullYear() === now.getFullYear() &&
					d.response === 'yes'
				);
			})
			.map((d) => {
				return [
					d.name,
					new Date(Date.parse(`${d.date} ${d.time}`)),
					this.addMinutes(new Date(Date.parse(`${d.date} ${d.time}`)), 60)
				];
			})
			.reverse();

		$('#todayCount').html(rows.length.toLocaleString());

		this.dataTable.addRows(rows);

		this.chart = new google.visualization.Timeline(this.elem);

		this.draw();
	}

	draw() {
		this.chart.draw(this.dataTable, this.options);
		$(this.elem).hide();
	}
}
