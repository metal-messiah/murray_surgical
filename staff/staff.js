//////////////////////////////////////////////////////////////
//////////// EDIT HERE FOR CHANGES TO STAFF PAGE /////////////
//////////////////////////////////////////////////////////////

// SHOW STAFF PHOTOS?
const showAdmin = true;

// SHOW NURSE PHOTOS?
const showNurses = true;

// SHOW CRNA PHOTOS ?
const showCrnas = true;

// EDIT AND/OR ADD STAFF MEMBERS HERE
let staffMembers = [
	{
		name: 'Megan',
		title: 'Office Manager',
		email: 'megan@murraysurgical.com',
		image: '../img/team/megan.jpg',
		group: 'admin'
	},
	{
		name: 'Daraleen',
		title: 'Office Assistant',
		email: 'murraysurgicalinfo@gmail.com',
		image: '../img/team/daraleen.jpg',
		group: 'admin'
	},
	{
		name: 'Janesa',
		title: 'Registered Nurse',
		email: '',
		image: '../img/team/janesa.jpg',
		group: 'nurses'
	},
	{
		name: 'Katelyn',
		title: 'Registered Nurse',
		email: '',
		image: '',
		group: 'nurses'
	},
	{
		name: 'Korri',
		title: 'Registered Nurse',
		email: '',
		image: '',
		group: 'nurses'
	},
	{
		name: 'Dan',
		title: 'Certified Nurse Anesthetist',
		email: '',
		image: '../img/team/dan.PNG',
		group: 'crnas'
	},
	{
		name: 'Wayne',
		title: 'Certified Nurse Anesthetist',
		email: '',
		image: '',
		group: 'crnas'
	},
	{
		name: 'Krystal',
		title: 'Certified Nurse Anesthetist',
		email: '',
		image: '../img/team/krystal.PNG',
		group: 'crnas'
	}
];

////////////////////////////////////////////////////////////////////////
//////////////////// DO NOT EDIT BELOW THIS LINE ///////////////////////
////////////////////////////////////////////////////////////////////////

const staffRenderer = (group) => {
	let shouldRender = false;
	if (group === 'admin' && showAdmin) {
		shouldRender = true;
	}
	if (group === 'nurses' && showNurses) {
		shouldRender = true;
	}
	if (group === 'crnas' && showCrnas) {
		shouldRender = true;
	}

	return shouldRender
		? staffMembers
				.filter((e) => e.group === group)
				.map((member, i, v) => {
					let bigLength;
					let factor = 12 / v.length;

					if (factor <= 3) {
						bigLength = 3;
					} else if (factor <= 4) {
						bigLength = 4;
					} else if (factor <= 6) {
						bigLength = 6;
					} else {
						bigLength = 12;
					}

					return `<div>
					<div class="single-team-member" style="width: 175px; margin: 0 auto;">
					  <div class="team-img">
									
											<div class="headshot" style="background-image: url(${member.image ||
												'../img/team/missing-profile-photo.png'})"></div>
						
						${member.email
							? `<div class="team-social-icon text-center">
						  <ul>
							<li>
							  <a href="mailto:${member.email}">
								<i class="fas fa-envelope"></i>
							 </a>
							</li>
							
						  </ul>
						</div>`
							: ''}
					  </div>
					  <div class="team-content text-center">
						<h4>${member.name}</h4>
						<p>${member.title}</p>
					  </div>
					</div>
				  </div>`;
				})
				.join('')
		: '';

	// 				return `<div class="col-md-${bigLength} col-sm-${bigLength} col-xs-12">
	//     <div class="single-team-member" style="width: 175px; margin: 0 auto;${member.name === 'Megan' &&
	// 	window.innerWidth >= 770
	// 		? 'float: right'
	// 		: ''};${member.name === 'Daraleen' && window.innerWidth >= 770 ? 'float: left' : ''}">
	//       <div class="team-img">

	// 							<div class="headshot" style="background-image: url(${member.image ||
	// 								'../img/team/missing-profile-photo.png'})"></div>

	//         ${member.email
	// 			? `<div class="team-social-icon text-center">
	//           <ul>
	//             <li>
	//               <a href="mailto:${member.email}">
	//                 <i class="fas fa-envelope"></i>
	//              </a>
	//             </li>

	//           </ul>
	//         </div>`
	// 			: ''}
	//       </div>
	//       <div class="team-content text-center">
	//         <h4>${member.name}</h4>
	//         <p>${member.title}</p>
	//       </div>
	//     </div>
	//   </div>`;
	// 			})
	// 			.join('')
	// 	: '';
};
