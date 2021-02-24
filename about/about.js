/////////////////////////////////////////////////////////////////////////
////////////// EACH ITEM CREATES A NEW BLOCK ON THE ABOUT PAGE //////////
/////////////////////////////////////////////////////////////////////////

// see https://fontawesome.com/icons?d=gallery&m=free for list of icon names

const services = [
	{
		name: 'Pediatric Dentistry',
		description: '',
		// 'We provide pediatric patients with a myriad of sedated dental procedures. Whether your child needs composite fillings, crowns, bridges, root canals or even sedated cleanings, our services allow for comfortable, quick, effective care.',
		icon: 'tooth'
	},
	{
		name: 'Oral Surgery',
		description: '',
		// 'Our specialized oral surgery providers offer a wide range of services, from surgical extractions and frenectomies to restorative procedures. Patient comfort, satisfaction, and overall wellness are our top priority.',
		icon: 'teeth-open'
	},
	// {
	// 	name: 'Ears Nose & Throat',
	// 	description: 'Treatment of disorders of the head and neck, including particularly the ears, nose, and throat.',
	// 	icon: 'user-md'
	// },
	{
		name: 'Pain Management',
		description: '',
		// 'Our highly-trained anesthesia professionals offer a wide range of pain management solutions for treatment of your chronic pain. Whether you need formainal epidurals, facet injections, steroidal injections, or any other anesthetic treatment, our experts can help you acheive longterm wellness.',
		icon: 'pills'
	}
	// {
	// 	name: 'Opthamology',
	// 	description: 'Treatment of disorders and diseases of the eye and surrounding tissues.',
	// 	icon: 'eye'
	// },
	// {
	// 	name: 'Podiatry',
	// 	description: 'Medical and surgical treatment of disorders of the foot, ankle and lower extremities.',
	// 	icon: 'shoe-prints'
	// },
	// {
	// 	name: 'Urology',
	// 	description: 'Treatment of issues concerned with the function and disorders of the urinary system.',
	// 	icon: 'toilet'
	// },
	// {
	// 	name: 'Endoscopy',
	// 	description:
	// 		'Procedures in which an instrument is introduced into the body to give a view of its internal parts.',
	// 	icon: 'binoculars'
	// }
];

//////////////////////////////////////////////////
/////////////// DO NOT EDIT BELOW THIS LINE //////
//////////////////////////////////////////////////

const serviceRenderer = () => {
	return services
		.map((service) => {
			return `<div class="col-md-12 col-sm-12 col-xs-12">
        <!-- end col-md-4 -->
        <div class=" about-move">
          <div class="services-details">
            <div class="single-services">
              <a class="services-icon" href="#">
                  <i class="fas fa-${service.icon}"></i>
                </a>
              <h4>${service.name}</h4>
              <p>
                ${service.description}
              </p>
            </div>
          </div>
          <!-- end about-details -->
        </div>
      </div>`;
		})
		.join('');
};
