/**
 * Species class
 *
 */

function Species(id, input, environment, simulation)
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
		var c = new Chromosome(i, 0, {});
		this.chromosomes.push(c);
	}

	var chromosomes = this.chromosomes;
	$.each(this.attributes, function(attr, val) { 
		for (var i=0; i < Math.floor(Math.random()*5) + 2; i++) {
			var c = rand_element(chromosomes);
			var pos = rand_empty(c.genes, 100);
			var g = new Gene(0, pos, attr, val, rand(2));
			c.genes[pos] = g;
		}
	}  );

	
	this.nucleus = function() {
		var nucleus = [];
		$.each(this.chromosomes, function( i, chromosome) {
			var genes1 = [];
			var genes2 = [];
			$.each(chromosome.genes, function( p, gene) {
				genes1[p] = new Gene(0, gene.position, gene.attribute,  (Math.random() / 10.0 + .95) * gene.effect, rand(2));
				genes2[p] = new Gene(0, gene.position, gene.attribute,  (Math.random() / 10.0 + .95) * gene.effect, rand(2));
			});
			var c1 = new Chromosome(0, 0, genes1);
			var c2 = new Chromosome(0, c1, genes2);
			c1.sister = c2;
			var cp = new ChromosomePair(0, c1, c2)
			nucleus.push(cp);
		});
		return nucleus;
	}

	this.organism = function() {
		var o = new Organism(this.sim.org_count, this, this.nucleus(), this.environment.random_habitat());
		this.sim.add_organism(o);
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

	this.remove_organism = function(org) {
		var index = this.organisms.indexOf(org);
		this.organisms.splice(index, 1);
	};

}
