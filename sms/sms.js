const dbUrl = `https://murray-surgical.herokuapp.com`;

$('#form').submit(function(e) {
	e.preventDefault();
	$('#submitIcon').toggleClass('fa-sms');
	$('#submitIcon').toggleClass('fa-spinner');
	$('#submitIcon').toggleClass('fa-spin');

	$.ajax({
		url: $('#form').attr('action'),
		type: 'POST',
		data: $('#form').serialize(),
		success: function(data) {
			$('#submitIcon').toggleClass('fa-sms');
			$('#submitIcon').toggleClass('fa-spinner');
			$('#submitIcon').toggleClass('fa-spin');

			const output = `<b>Success!</b><hr>
      From: ${data.from}<br>
      To: ${data.to}<br>
      Msg: ${data.body}`;
			$('#formResult').html(output);
		},
		error: function(data) {
			$('#formResult').html('FAILED TO SEND');
		}
	});
	return false;
});

$('#previewButton').click(function(e) {
	e.preventDefault();
	$('#previewIcon').toggleClass('fa-info-circle');
	$('#previewIcon').toggleClass('fa-spinner');
	$('#previewIcon').toggleClass('fa-spin');

	$.ajax({
		url: 'https://murray-surgical.herokuapp.com/api/preview-sms',
		type: 'POST',
		data: $('#form').serialize(),
		success: function(data) {
			$('#previewIcon').toggleClass('fa-info-circle');
			$('#previewIcon').toggleClass('fa-spinner');
			$('#previewIcon').toggleClass('fa-spin');

			const output = `<b>SMS Preview:</b><hr>
      Msg: ${data}`;
			$('#formResult').html(output);
		},
		error: function(data) {
			$('#formResult').html(`FAILED TO GET PREVIEW - ${JSON.stringify(data)}`);
		}
	});
	return false;
});

$('#logsButton').click(() => {
	window.open('./log', 'self');
});

$(document).ready(() => {
	$.ajax({
		url: `${dbUrl}/api/wake`,
		type: 'GET',
		success: function(data) {
			console.info('Server is listening!');
		}
	});
});
