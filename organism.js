function Organism(id, species, pairs, habitat, size) {
	this.id = id;
	this.species = species;
	this.chromosomes = pairs;
	this.attributes = {};
	this.habitat = habitat;
	this.age = 0; 
	this.food = 1;
	this.babies_had = 0;
	this.parents = [];
	this.children = [];
	this.size = size ? size : 1;
	this.dead = false;

	this.run = function() {
		var start = time();
		if (this.death_check()) {
			this.die();
			return;
		}

		this.run_behavior();
		this.age += 1;
		this.sim.add_times('total_runtime', time() - start);
	}

	this.carnivore_behavior = function() {

	}

	this.herbivore_behavior = function() {
		this.random_move();

		if (this.hungry())
			this.graze();

		

		if (this.can_mate()) {
			this.attempt_mate(); 
		}

		if (this.can_grow()) {
			this.grow();
		}

		this.metabolism();
	}

	this.plant_behavior = function() { 
		if (this.can_pollenate()) {
			this.pollenate();
		}

		if (this.can_grow()) {
			this.grow();
		}

		this.photosynthesize();
		this.metabolism();
	}

	this.calculate_attributes = function() {
		var start = time();
		var attributes = {}
		var effects = {};
		for (i in this.chromosomes) { 
			var pair = this.chromosomes[i];
			for (p in pair.c1.genes) {
				var g1 = pair.c1.genes[p];
				if (g1) {
					var g2 = pair.c2.genes[p];
					if (g1.dominance == g2.dominance ) {
						var effect = (g1.effect + g2.effect) / 2.0;
					} else {
						var effect = ( g1.effect * g1.dominance + g2.effect * g2.dominance ) / (g1.dominance + g2.dominance);
					}
					if (typeof attributes[g1.attribute] == 'undefined')
						attributes[g1.attribute] = effect;
					else
						attributes[g1.attribute] = ( attributes[g1.attribute] + effect ) / 2.0;
				}
			}
		}
		this.attributes = attributes;
		sim.add_times('calculate_attributes', time() - start);
	}

	this.meoisis = function() {
		var start = time();
		var gamete = [];
		for (var i = 0; i < this.chromosomes.length; i++) {
			if ( Math.random() > 0.5) {
				var c = this.chromosomes[i].c1;
			} else {
				var c = this.chromosomes[i].c2;
			}
			var cn = new Chromosome(0, 0, c.genes);
			cn.mutate(this.attributes["mutation_rate"]);
			gamete[i] = cn;
		}
		this.sim.add_times('meiosis', time() - start);
		return gamete;
	}

	this.mate = function(partner) {
		var start = time();
		var egg = this.meoisis();
		var sperm = partner.meoisis();
		var nucleus = [];
		for (var i = 0; i < egg.length; i++) {
			nucleus[i] = new ChromosomePair(0, egg[i], egg[i]);
		}
		this.sim.add_times('mate', time() - start);
		this.babies_had += 1;
		partner.babies_had += 1;
		var o = new Organism(0, this.species, nucleus);
		
		return o;
	}

	this.mating_match = function(partner) {
		var start = time();
		if (
			partner != this && partner.species === this.species && 
			this.age >= this.attributes["mature_age"] && 
			partner.age > partner.attributes["mature_age"] && 
			this.babies_had < this.attributes["virility"] && 
			partner.babies_had < partner.attributes["virility"]
		) {
			this.sim.add_times('mating_match', time() - start);
			return true; 
		} else { 
			this.sim.add_times('mating_match', time() - start);
			return false;
		}
	}

	this.can_mate = function() {
		if (this.age > this.attributes["mature_age"] && this.babies_had < this.attributes["virility"])
			return true;
		return false;
	}

	this.attempt_mate = function() {
		for (var i = 0; i < this.habitat.organisms.length; i++) {
			if (this.mating_match(this.habitat.organisms[i])) {
				var baby = this.mate(this.habitat.organisms[i]);
				baby.sim = this.sim;
				sim.add_organism(baby, this.habitat);
				return;
			}
		}
	}

	this.die = function() {
		this.dead = true;
		this.death_time = time();
		this.species.remove_organism(this);
		this.habitat.remove_organism(this);
	}
	
	this.death_check = function() {
		if (this.age > this.attributes["longevity"]) {
			return true;
		}
		
		if (this.food < 0) {
			return true;
		}

		if (this.size < 0.1) {
			return true;
		}
		return false;
	}

	this.random_move = function() {
		this.move(rand(3) - 1, rand(3) - 1);
	}

	this.move = function(x,y) {
		this.x = this.habitat.x;
		this.y = this.habitat.y;
		
		var habitats = this.habitat.environment.habitats;
		if (habitats[this.x + x] && habitats[this.x + x][this.y + y] && habitats[this.x + x][this.y + y].type != 'water' && habitats[this.x + x][this.y + y].type != 'mountain') {
			this.habitat.remove_organism(this);
			this.habitat = habitats[this.x + x][this.y + y];
			this.habitat.organisms.push(this);
			this.x += x;
			this.y += y;
		}
	}

	this.hungry = function() {
		if (this.food < 25)
			return true;
		return false;
	}
	
	this.eat = function() {
		if (this.attributes["carnivore"] > 10 && this.food < 15 && this.habitat.organisms.length > 1) {
			for (var i = 0; i < this.habitat.organisms.length; i++) {
				var prey = this.habitat.organisms[i];
				if (this.species != prey.species) {
					prey.die();
					this.food += prey.food + 5;
				}
			}
		}
	
		if (this.attributes["herbivore"] > 10 && this.food < 10 && this.habitat.food > 0) {
			this.habitat.food -= 1;
			this.food += 1;
		}
	}

	this.graze = function() {
		for (var i = 0; i < this.habitat.organisms.length; i++ ) {
			var o = this.habitat.organisms[i];
			if (o.attributes["plant"] > 10) {
				var eat = this.energy_maintenence() * 4.5;
				if (eat > o.size) {
					this.food += o.size * 2.0;
					o.size = o.size / 4.0
				} else {
					this.food += eat * 2.0;
					o.size -= eat;
					return;
				}
			}
		}
	}

	this.find_prey = function() {
		var habitats = this.habitat.neighbors();
		while (habitats.length > 1) {
			var r = rand(habitats.length);
			var habitat = habitats[r];
			for (var x = 0; x < habitat.organisms.length; x++) {
				var o = habitat.organisms[x];
				if (o.species != this.species) {
					return habitat;
				}
			}
			habitats.splice(habitats.indexOf(habitat), 1);
		}
		return habitats[0];
	}

	this.predator_move = function() {
		var habitat = this.find_prey();
		this.move(habitat.x - this.x, habitat.y - this.y);	
	}


	this.can_grow = function() {
		if (this.food > this.energy_maintenence() + 0.5 && this.attributes["max_size"] > this.size)
			return true;
		return false;
	}

	this.grow = function() {
		var growth = Math.min(this.food - 0.50, 0.50);
		this.food -= growth;
		this.size += growth * 1.5;
	}

	this.energy_maintenence = function() {
		return Math.sqrt(this.size / 1.5);
	}

	this.metabolism = function() {
		this.food -= this.energy_maintenence();
	}

	/*********************************************************************
	 * PLANT FUNCTIONS
	 *
	 *********************************************************************/

	this.can_pollenate = function() {
		if (this.age > this.attributes["mature_age"])
			return true;
		return false;
	}

	this.pollenate = function() {
		var start = time();
		var partner = this.plant_find_partner();

		if (!partner)
			return;

		var habitat = this.habitat.environment.get_habitat(this.habitat.x + rand(12) - 4, this.habitat.y +  rand(12) - 4 ); 
		if (!habitat || habitat.type == 'water' || habitat.type == 'mountain')
			return;

		var baby = this.mate(partner);
		baby.sim = this.sim;
		this.sim.add_organism(baby, habitat);
		this.food -= 0.4
		this.sim.add_times('pollenate', time() - start);
	}

	this.plant_find_partner = function() {
		var start = time();
		var hab =  this.habitat.environment.get_habitat(this.habitat.x + rand(12) - 4, this.habitat.y +  rand(12) - 4 ); 
		if (!hab)
			return;
		this.sim.add_times('random_neighbor', time() - start);
		for (var i = 0; i < hab.organisms.length; i++) {
			var o = hab.organisms[i];
			if (this.mating_match(o))
			return o;
		}

		return false;
	}

	this.photosynthesize = function() {
		var start = time();
		var e = this.energy_maintenence();
		var diff = ( this.habitat.moisture - this.attributes['ideal_moisture']) / 1.75 + ( this.habitat.temperature - this.attributes['ideal_temperature']) / 1.75 + (this.habitat.shade - this.size) * 7.0 ;
		diff =  Math.max(1, Math.sqrt( Math.abs(diff) / 2.5 ));
		this.food += Math.sqrt(this.size) * 2.0 / diff ;
		this.sim.add_times('photosynthesize', time() - start);
	}

	 /*=========================================*/


	this.type = function() {
		if (this.attributes["plant"] > 10)
			return 'plant';
		if (this.attributes["herbivore"] > 10)
			return 'herbivore';
		if (this.attributes["carnivore"] > 10)
			return 'carnivore';
	}

	this.init = function() {
		this.calculate_attributes();
		this.species.organisms.push(this);
		this.color = 'rgb('+ this.attributes["color_1"].toFixed(0) +',' + this.attributes["color_2"].toFixed(0)  +',' + this.attributes["color_3"].toFixed(0)  +');';

		if (this.attributes["plant"])
			this.run_behavior = this.plant_behavior;
		else if (this.attributes["herbivore"])
			this.run_behavior = this.herbivore_behavior;
		else if (this.attributes["carnivore"])
			this.run_behavior = this.carnivore_behavior;
	}

	this.init();
}
