/**
 * Simulation Class
 *
 */



function Simulation(x, y) {
	this.environment = new Environment("", x,y);
	this.org_count = 0;
	this.turn = 0;


	plant1template = { 
	"species_name": "grass",
	"chromosome_count": 5,
	"attributes": {
		"turn_speed": 1,
		"color_1": "130",
		"color_2": "170",
		"color_3": "150",
		"mature_age": 10,
		"virility": 2,
		"flowering_rate": 15,
		"sprout_temperature": 70,
		"sprout_water": 30,
		"mutation_rate": 0.001
	}
}

s = new Species(1, plant1template, this.environment, this);




organisms  = [];
for (var i = 0; i < 200; i++) {
	var o = s.organism();
	organisms.push(o);
}

this.environment.render();


this.start = function() {
	this.environment.render();
	for (var i = 0; i < organisms.length; i++) {
		window.setInterval("organisms[" + i +"].run()",500);
	}
}


this.run = function() { 
	var start = time();
	l("turn: " + this.turn);
	sim.environment.render();
	l("size: " + organisms.length);
	this.turn += 1;
	l(time() - start);
	l('------------');
}


window.setInterval("sim.run()",500);


this.start();
}
