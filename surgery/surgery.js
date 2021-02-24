///////////////////////////////////////////////////////////////////
////////// EACH LINE ON INSTRUCTIONS WILL ADD TO PAGE /////////////
///////////////////////////////////////////////////////////////////

const instructions = [
	'For safety reasons, no food or drink can be consumed after 12:00 AM on the day of the scheduled surgery.',
	'Please arrive 20 minutes prior to your appointment to complete preoperative paperwork or you may be rescheduled.',
	'In preparation for surgery, take a bath or shower the night before or morning of the appointment.',
	'Your child will need your full attention and our facility is small, so please make arrangements for other children if possible.',
	'Please bring all insurance cards.',
	'Pediatric patients should wear 2 piece clothing and socks, bring a change of clothes and a diaper or pull up for newly potty trained children.',
	'If interpreter is required, please notify Murray Surgical at least one week prior to surgery date.',
	// 'Scheduled patients should be cancelled within 24 hours.',
	'Failure to follow any pre-surgery instruction may result in a rescheduling charge of $100.'
];

///////////////////////////////////////////////////////////////////
///////////// DO NOT EDIT BELOW THIS LINE /////////////////////////
///////////////////////////////////////////////////////////////////

const height = Math.floor(1 / instructions.length * 100);
const offset = Math.round(70 / instructions.length);

const instructionsRenderer = () => {
	return instructions
		.map((ins, i) => {
			return `<li class="surgical-list-item">${ins}</li>`;
		})
		.join('');
};
