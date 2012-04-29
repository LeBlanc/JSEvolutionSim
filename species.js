/**
 * Species class
 *
 */

Species = function(id, input, environment, simulation)
{
	this.id = id;
	this.species_name = input.species_name;
	this.attributes = input.attributes;
	this.chromosome_count = input.chromosome_count;
	this.environment = environment;
	this.sim = simulation;
	this.organisms = [];


	


	this.template = {};
	this.chromosomes = [];
	for (var i=0; i < this.chromosome_count; i++)
	{
		var c = new Chromosome(i, 0, []);
		this.chromosomes.push(c);
	}

	var chromosomes = this.chromosomes;
	for (attr in this.attributes) {
		var val = this.attributes[attr];
		for (var i=0; i < Math.floor(Math.random()*5) + 2; i++) {
			var c = rand_element(chromosomes);
			var pos = c.genes.length; //l(rand_empty(c.genes, 100));
			var g = new Gene(0, pos, attr, val, rand(2));
			c.genes[pos] = g;
		}
	}
	

	
	this.nucleus = function() {
		var nucleus = [];
		for (i in this.chromosomes) { 
			var chromosome = this.chromosomes[i];
			
			var genes1 = [];
			var genes2 = [];
			for (p in chromosome.genes) {
				var gene = chromosome.genes[p];
				genes1[p] = new Gene(0, gene.position, gene.attribute,  (Math.random() / 2.0 + .75) * gene.effect, rand(2));
				genes2[p] = new Gene(0, gene.position, gene.attribute,  (Math.random() / 2.0 + .75) * gene.effect, rand(2));
			}
			
			var c1 = new Chromosome(0, 0, genes1);
			var c2 = new Chromosome(0, c1, genes2);
			c1.sister = c2;
			var cp = new ChromosomePair(0, c1, c2)
			nucleus.push(cp);
		}
		return nucleus;
	}

	this.organism = function() {
		var o = new Organism(this.sim.org_count, this, this.nucleus());
		o.size = 2;
		o.food += 25;
		o.sim = this.sim;
		return o;
	}

	this.population = function(size) {


	}

	this.average_attribute = function(attribute) {
		var total = 0;

		for (var i = 0; i < this.organisms.length; i++) {
			total += this.organisms[i].attributes[attribute];
		}
		return total / this.organisms.length;
	}

	this.average_size = function() {
		var total = 0;
		for (var i = 0; i < this.organisms.length; i++) {
			total += this.organisms[i].size;
		}
		return total / this.organisms.length;
	}

	this.remove_organism = function(org) {
		var index = this.organisms.indexOf(org);
		this.organisms.splice(index, 1);
	};

	this.random_organism = function() {
		return this.organisms[rand(this.organisms.length)];
	}

	this.stats = function() {
		var stats = {};
		var species = this;
		$.each(this.attributes, function(attribute, value) { 
			stats[attribute] = species.average_attribute(attribute);
		});
		stats['avg_size'] = this.average_size();
		stats['population_size'] = this.organisms.length;
		return stats;
	}

}
