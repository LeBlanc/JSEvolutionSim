/*
 Organism Class
*/

function Organism(id, species, pairs) {

	this.id = id;
	this.species = species;
	this.chromosomes = pairs;
	this.attributes = {};
	
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

		return new Organism(this.id, this.species, nucleus);
	}
}
