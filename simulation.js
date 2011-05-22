/**
 * Simulation Class
 *
 */



function Simulation(x, y) {
	this.environment = new Environment("", x,y);
	this.org_count = 0;
	this.turn = 0;
	this.species = [];


	plant1template = { 
	"species_name": "cow",
	"chromosome_count": 5,
	"attributes": {
		"turn_speed": 1,
		"color_1": "130",
		"color_2": "170",
		"color_3": "150",
		"mature_age": 25,
		"virility": 2,
		"flowering_rate": 15,
		"sprout_temperature": 70,
		"sprout_water": 30,
		"mutation_rate": 0.02,
		"longevity": 100
	}
}

plant2template = { 
	"species_name": "wolf",
	"chromosome_count": 10,
	"attributes": {
		"turn_speed": 1,
		"color_1": "130",
		"color_2": "170",
		"color_3": "150",
		"mature_age": 25,
		"virility": 2,
		"flowering_rate": 15,
		"sprout_temperature": 70,
		"sprout_water": 30,
		"mutation_rate": 0.12,
		"longevity": 100
	}
}

s1 = new Species(1, plant1template, this.environment, this);
this.species.push(s1);

s2 = new Species(1, plant2template, this.environment, this);
this.species.push(s2);


this.run_organism = function(id) {
	var o = this.organisms[id];
	if (typeof o != 'undefined')
		o.run();
	else
		l(id);
}

this.organisms  = [];

this.add_organism = function(organism) {
	this.organisms.push(organism);
	/*var id = this.org_count;
	organism.id = id;
	this.organisms[id] = organism;
	var string = "sim.run_organism(" + id + ")";
	var interval = setTimeout(string,500);
	this.organisms[id].interval = interval;
	this.org_count += 1;*/
}


this.environment.render();




this.start = function() {
	this.environment.render();

	for (var i = 0; i < 400; i++) {
		var o1 = s1.organism();
		this.add_organism(o1);
		var o2 = s2.organism();
		this.add_organism(o2);
	}
	l(1);
	window.setInterval("sim.run()",400);
}

var last_turn = time();
this.run = function() {  var start = time();
	//l("turn: " + this.turn);
	sim.environment.render();
	//l("size: " + organisms.length);
	this.turn += 1;
	//l(time() - last_turn);
	last_turn = time();
	//l('------------');
	for (var i = 0; i < this.organisms.length; i++) {
		if (typeof this.organisms[i] == 'undefined' || this.organisms[i].dead) {
			this.organisms.splice(i, 1);
			i--;
		} else {
			this.organisms[i].run();
		}
	}
	//l(time() - start);
}




this.alive_organisms = function() {
	var all = organisms.length;
	var dead = 0;
	for (var i = 0; i < organisms.length; i++) {
		if (organisms[i].dead) {
			dead += 1;
		}
	}
	return all - dead;
}


this.start();
}
