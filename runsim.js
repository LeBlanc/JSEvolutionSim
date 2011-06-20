var sim;
var dolog = true;

$(document).ready( function() {
	sim = new Simulation(100,70);
	sim.init();
	var selected_habitat = false;

	template3 = { 
		"species_name": "grass",
		"chromosome_count": 10,
		"attributes": {
			"turn_speed": 250,
			"color_1": "230",
			"color_2": "170",
			"color_3": "250",
			"mature_age": 5,
			"virility": 30,
			"mutation_rate": 0.005,
			"longevity": 120,
			"plant": 100,
			"max_size":10,
			'ideal_temperature': 70,
			'ideal_moisture': 50,
		}
	}

	template5 = { 
		"species_name": "shrub",
		"chromosome_count": 10,
		"attributes": {
			"turn_speed": 250,
			"color_1": "070",
			"color_2": "070",
			"color_3": "220",
			"mature_age": 5,
			"virility": 30,
			"mutation_rate": 0.005,
			"longevity": 120,
			"plant": 100,
			"max_size":25,
			'ideal_temperature': 70,
			'ideal_moisture': 50,
		}
	}

	template6 = { 
		"species_name": "redwood",
		"chromosome_count": 10,
		"attributes": {
			"turn_speed": 250,
			"color_1": "070",
			"color_2": "070",
			"color_3": "070",
			"mature_age": 5,
			"virility": 30,
			"mutation_rate": 0.005,
			"longevity": 120,
			"plant": 100,
			"max_size":85,
			'ideal_temperature': 90,
			'ideal_moisture': 75,
		}
	}

	template4 = { 
		"species_name": "bush",
		"chromosome_count": 10,
		"attributes": {
			"turn_speed": 250,
			"color_1": "030",
			"color_2": "210",
			"color_3": "250",
			"mature_age": 5,
			"virility": 30,
			"mutation_rate": 0.005,
			"longevity": 120,
			"plant": 100,
			"max_size":35,
			'ideal_temperature': 85,
			'ideal_moisture': 60,
		}
	}
	
	template1 = { 
		"species_name": "cow",
		"chromosome_count": 5,
		"attributes": {
			"turn_speed": 250,
			"color_1": "130",
			"color_2": "170",
			"color_3": "150",
			"mature_age": 10,
			"virility": 8,
			"mutation_rate": 0.005,
			"longevity": 400,
			"herbivore": 100,
			"max_size": 20,
		}
	}
	template2 = { 
		"species_name": "wolf",
		"chromosome_count": 10,
		"attributes": {
			"turn_speed": 350,
			"color_1": "030",
			"color_2": "170",
			"color_3": "250",
			"mature_age": 25,
			"virility": 4,
			"mutation_rate": 0.005,
			"longevity": 400,
			"carnivore": 100,
		}
	}
	s1 = new Species(1, template1, sim.environment, sim);
	s2 = new Species(1, template2, sim.environment, sim);
	s3 = new Species(1, template3, sim.environment, sim);
	s4 = new Species(1, template4, sim.environment, sim);
	s5 = new Species(1, template5, sim.environment, sim);
	s6 = new Species(1, template6, sim.environment, sim);
	
	sim.species.push(s1, s2, s3, s4, s5, s6);

	for (var i = 0; i < 400; i++) {
		for (var z = 0; z < 5; z++) {
			add_organism_to_random(s3);
			add_organism_to_random(s4);
			add_organism_to_random(s5);
			add_organism_to_random(s6);
		}
		for (var z = 0; z < 3; z++) {
			add_organism_to_random(s1);
		}
	}

	



	function add_organism_to_random(species) {
		var habitat = sim.environment.random_habitat();
		if (habitat.type == 'water' || habitat.type == 'mountain')
			return;
		var o = species.organism();
		sim.add_organism(o, habitat);	
	}











	$.fn.get_habitat = function() {
		var id = $(this).attr('id');
		var x = id.substring( id.indexOf('habitat') + 7, id.indexOf('_'));
		var y = id.substring( id.indexOf('_') + 1);
		return sim.environment.habitats[x][y];
	}

	function display_habitat(habitat) {
		$("#habitat_info dd.position").text(habitat.x + "," + habitat.y);
		$("#habitat_info dd.type").text(habitat.type);
		$("#habitat_info dd.height").text(habitat.height.toFixed(2));
		$("#habitat_info dd.moisture").text(habitat.moisture.toFixed(2));
		$("#habitat_info dd.soil").text(habitat.soil.toFixed(2));
		$("#habitat_info dd.temperature").text(habitat.temperature.toFixed(2));
		$("#habitat_info dd.food").text(habitat.food.toFixed(2));
		$("#habitat_info dd.organism_count").text(habitat.organisms.length);
		if (habitat.organisms.length > 0) {
			l(habitat);
		}
	}


	$('.habitat').click( function() {
		if (sim.selected_habitat) {
			$(sim.selected_habitat.element).children('.organism').removeClass('selector');
		}
		$(this).children('.organism').addClass('selector');
		var habitat = $(this).get_habitat();
		habitat.display_info();
		sim.selected_habitat = habitat;
	 });


	$("#controls #run").click( function() { 
		if (sim.paused) {
			sim.paused = false;
			sim.run();
		} else { 
			sim.paused = true;
		}
	 } );


	 sim.run();
});
