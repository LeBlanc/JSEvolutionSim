/*
 Organism Class
*/

function Organism(id, species, pairs, habitat) {

	this.id = id;
	this.species = species;
	this.chromosomes = pairs;
	this.attributes = {};
	this.habitat = habitat;
	this.age = 0; 
	this.food = 1;
	this.babies_had = 0;
	this.interval = null;
	this.parents = [];
	this.children = [];
	if (habitat)
		this.habitat.organisms.push(this);
	
	this.calculate_attributes = function() {
		var attributes = {}
		var effects = {};
		$.each(this.chromosomes, function(i, pair) { 
			$.each(pair.c1.genes, function(p, g1) {
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
			} );
		} );
		this.attributes = attributes;
	}
	this.calculate_attributes();

	this.meoisis = function() {
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
		return gamete;
	}

	this.mate = function(partner) {
		var egg = this.meoisis();
		var sperm = partner.meoisis();
		var nucleus = [];
		for (var i = 0; i < egg.length; i++) {
			nucleus[i] = new ChromosomePair(0, egg[i], egg[i]);
		}
		this.babies_had += 1;
		partner.babies_had += 1;
		return new Organism(0, this.species, nucleus);
	}

	this.can_mate = function(partner) {
		if (
			partner != this && partner.species === this.species && 
			this.age >= this.attributes["mature_age"] && 
			partner.age > partner.attributes["mature_age"] && 
			this.babies_had < this.attributes["virility"] && 
			partner.babies_had < partner.attributes["virility"]
		) {
			return true; 
		} else { 
			return false;
		}
	}

	this.start = function(habitat) {
		this.habitat = habitat;
		this.x = this.habitat.x;
		this.y = this.habitat.y;
		this.habitat.organisms.push(this);
		sim.add_organism(this);
		
	}

	this.die = function() {
		this.dead = true;
		this.death_time = time();
		delete sim.organisms[id];
		this.habitat.remove_organism(this);
	}

	this.run = function() {	
		if (this.dead) {
			delete sim.organisms[id];
			return;
		}
		
		//var string = "sim.run_organism(" + this.id + ")";
		//var interval = setTimeout(string,500);
	
		var start = time();
	
		if (this.age > this.attributes["longevity"]) {
			this.die();
			return;
		}
		if(this.babies_had > this.attributes["virility"] && rand(100) > 75 ) {
			this.die();
			return;
		}
		if (this.food < 0) {
			this.die();
			return;
		}
		this.eat();
		this.food -= 1;
		this.move(rand(3) - 1,rand(3) - 1);
		if (this.habitat.organisms.length > 1 && this.habitat.organisms.length < 5) {
			for (var i = 0; i < this.habitat.organisms.length; i++) {
				var partner = this.habitat.organisms[i];
				if (this.can_mate(partner)) {
					var baby = this.mate(partner);
					baby.start(this.habitat);
					this.children.push(baby);
					partner.children.push(baby);
					baby.parents.push(this, partner);
				}
			}
		}
		this.age += 1;
		if (time() - start > 490)
			l(time() - start);
	}

	this.move = function(x,y) {
		this.x = this.habitat.x;
		this.y = this.habitat.y;
		
		var habitats = this.habitat.environment.habitats;
		if (habitats[this.x + x] && habitats[this.x + x][this.y + y]) {
			this.habitat.remove_organism(this);
			this.habitat = habitats[this.x + x][this.y + y];
			this.habitat.organisms.push(this);
			this.x += x;
			this.y += y;
		}
	}

	this.eat = function() {
		if (this.food < 5 && this.habitat.food > 0) {
			this.habitat.food -= 1;
			this.food += 1;
		}
	}

	this.color = function() {
		return 'rgb('+ this.attributes["color_1"].toFixed(0) +',' + this.attributes["color_2"].toFixed(0)  +',' + this.attributes["color_3"].toFixed(0)  +');';
	}
}
