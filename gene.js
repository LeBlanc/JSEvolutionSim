function Gene(id, position, attribute, effect, dominance) 
{
	this.id = id;
	this.position = position;
	this.attribute = attribute;
	this.effect = effect;
	this.dominance = dominance;

}

Gene.prototype.mutate = function(mutation_rate) {
	return new Gene(this.id, this.position, this.attribute, (Math.random() / 10.0 + .95) * this.effect, rand(2));
}
