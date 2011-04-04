/*

Gene Class

*/

function Gene(id, position, chromosome, attribute, effect, dominance) 
{
	this.id = id;
	this.position = position;
	this.chromosome = chromosome;
	this.attribute = attribute;
	this.effect = effect;
	this.dominance = dominance;
	
	this.mutate = function() {
		this.effect = this.effect * 1.1;
	}

	this.to_json = function() { 
		var json = {};
		json.id = this.id;
		json.position = this.position;
		json.chromosome= this.chromosome;
		json.attribute = this.attribute;
		json.effect = this.effect;
		json.dominance = this.dominance;
		return json;
	}	

	this.to_string = function() {
		return Object.toJSON(this.to_json());
	}

	
	this.to_bp = function() {
		var s = this.to_string();
		var n = '';
		var b4 = "0";
		for (var i = 0; i < s.length; i++) {
			b4 = baseConverter(s.charCodeAt(i) + '', 10, 4);
			n += string_multiply("0", 4 - b4.length) + b4;
		}
		n = n.replace(/0/g, "G");
		n = n.replace(/1/g, "A");
		n = n.replace(/2/g, "C");
		n = n.replace(/3/g, "T");
		return n;
	}

	this.mutate = function() {
		return this;
	}
}
