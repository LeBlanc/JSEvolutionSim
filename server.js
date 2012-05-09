var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

require('./utils.js').js
require('./gene.js').js
require('./chromosome.js').js
require('./chromosomepair.js').js
require('./organism.js').js
require('./habitat.js').js
require('./environment.js').js
require('./simulation.js').js
require('./species.js').js


io.set('log level', 1);

var viewdir = __dirname + '/views';

app.listen(3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render(viewdir + '/index.ejs');
});

app.get('/species/create', function(req, res) {
	res.render(viewdir + '/species/create.ejs')
});

io.sockets.on('connection', function (socket) {
	socket.emit('render', { data: sim.environment.render_all() });
});


dolog = true;

sim = new Simulation(090,090, io);
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
		"mature_age": 2,
		"virility": 90,
		"mutation_rate": 0.005,
		"longevity": 50,
		"plant": 100,
		"max_size":5,
		'ideal_temperature': 50,
		'ideal_moisture': 40,
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
		"mature_age": 15,
		"virility": 30,
		"mutation_rate": 0.005,
		"longevity": 120,
		"plant": 100,
		"max_size":25,
		'ideal_temperature': 50,
		'ideal_moisture': 40,
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
		"mature_age": 25,
		"virility": 90,
		"mutation_rate": 0.005,
		"longevity": 120,
		"plant": 100,
		"max_size":95,
		'ideal_temperature': 50,
		'ideal_moisture': 85,
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
		"mature_age": 15,
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
		'gestation_time': 10,
	}
}
template7 = { 
	"species_name": "buffalo",
	"chromosome_count": 5,
	"attributes": {
		"turn_speed": 250,
		"color_1": "130",
		"color_2": "070",
		"color_3": "150",
		"mature_age": 25,
		"virility": 30,
		"mutation_rate": 0.005,
		"longevity": 800,
		"herbivore": 100,
		"max_size": 15,
		"gestation_time": 5,
	}
}

template2 = { 
	"species_name": "wolf",
	"chromosome_count": 10,
	"attributes": {
		"turn_speed": 350,
		"color_1": "001",
		"color_2": "001",
		"color_3": "001",
		"mature_age": 50,
		"virility": 8,
		"mutation_rate": 0.005,
		"longevity": 400,
		"carnivore": 100,
		"gestation_time":20,
	}
}
s1 = new Species(1, template1, sim.environment, sim);
s2 = new Species(1, template2, sim.environment, sim);
s3 = new Species(1, template3, sim.environment, sim);
s4 = new Species(1, template4, sim.environment, sim);
s5 = new Species(1, template5, sim.environment, sim);
s6 = new Species(1, template6, sim.environment, sim);
s7 = new Species(1, template7, sim.environment, sim);

sim.species.push(s1, s2, s3, s4, s5, s6, s7);

for (var i = 0; i < 100; i++) {
	for (var z = 0; z < 40; z++) {
		add_organism_to_random(s3);
		add_organism_to_random(s4);
		add_organism_to_random(s5);
		add_organism_to_random(s6);
	}
	for (var z = 0; z < 8; z++) {
		add_organism_to_random(s1);
		add_organism_to_random(s7);
	}
	
	for (var z = 0; z < 4; z++) {
		add_organism_to_random(s2);
	}
}





function add_organism_to_random(species) {
	var habitat = sim.environment.random_habitat();
	if (habitat.type == 'water' || habitat.type == 'mountain')
		return;
	var o = species.organism();
	sim.add_organism(o, habitat);	
}

function runsim() {
	sim.run();
	setTimeout(runsim, Math.max(200 - sim.run_time, 50));
}


//sim.run();
this.iteration = setTimeout(runsim, Math.max(400 - sim.run_time, 50));