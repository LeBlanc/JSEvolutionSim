function Chromosome(id, sister, genes) {

	this.id = id;
	this.sister = sister;
	this.genes = genes;
	
}

Chromosome.prototype.mutate = function(mutation_rate) {
	for (var i = 0; i < this.genes.length; i++) {
		if (this.genes[i] && rand(10000) / 10000.0 < mutation_rate) {
			this.genes[i] = this.genes[i].mutate();
		}
	}
}
