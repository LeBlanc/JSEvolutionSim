/**
 * Habitat Class
 */

function Habitat(environment, x ,y, moisture, height, temperature, soil) {
	this.x = x;
	this.y = y;
	this.moisture = moisture;
	this.height = height;
	this.temperature = temperature;
	this.soil = soil;
	this.organisms = [];
	this.environment = environment;
	this.food = 0;
	this.shade = 0;
	this.color = false;
	this.changed = false;

	

	this.get_type = function() {
		var value = 'none';
		if (this.moisture > 100)
			value = 'water';
		else if (this.height > 100)
			value = 'mountain';
		else if (this.temperature < 32 && this.moisture < 50)
			value = 'tundra';
		else if (this.temperature < 32 && this.moisture >= 50)
			value = 'taiga';
		else if (this.temperature < 45)
			value = 'taiga';
		else if (this.moisture > 85)
			value = 'swamp';
		else if (this.temperature < 55 && this.moisture < 50)
			value = 'steppe';
		else if (this.temperature < 55 && this.moisture >= 50)
			value = 'temperate';
		else if (this.temperature < 65 && this.moisture < 40)
			value = 'steppe';
		else if (this.temperature < 65 && this.moisture <= 90)
			value = 'temperate';
		else if (this.temperature < 85 && this.moisture < 30)
			value = 'scrub';
		else if (this.temperature < 85 && this.moisture < 70)
			value = 'temperate';
		else if (this.temperature < 85 && this.moisture >= 70)
			value = 'jungle';
		else if (this.temperature >= 85 && this.moisture < 20)
			value = 'desert';
		else if (this.temperature < 95 && this.moisture < 40)
			value = 'scrub';
		else if (this.temperature < 95 && this.moisture < 70)
			value = 'temperate';
		else if (this.temperature < 95 && this.moisture >= 70)
			value = 'jungle';
		else if (this.temperature >= 95 && this.moisture < 30)
			value = 'desert';
		else if (this.temperature >= 95 && this.moisture < 50)
			value = 'scrub';
		else if (this.temperature >= 95 && this.moisture >= 50)
			value = 'jungle';
		

		return value;
	}

	this.set_type = function() {
		this.type = this.get_type();
		this.soil = this.get_soil();
		this.color = this.get_color();
		var canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		return this.type;
	}
	/*
	.mountain { background:#4d310d; }
	.water { background:#3d48d0; } 
	.tundra { background:#e0e0e0; }
	.taiga { background:#9ba698; }
	.swamp { background:#5be13c; }
	.steppe { background:#ead492; }
	.temperate { background:#5db13f; }
	.scrub { background:#ffedb8; }
	.jungle { background:#2f9a13; }
	.desert { background:#ecc113; }
	*/
	this.get_color = function() {
		var type = this.get_type();
		if (type == "mountain")
			return "4d310d";
		else if (type == 'water')
			return "3d48d0";
		else if (type == "tundra")
			return "e0e0e0";
		else if (type == "taiga")
			return "9ba698";
		else if (type == "swamp")
			return "5be13c";
		else if (type == "steppe")
			return "ead492";
		else if (type == "temperate")
			return "5db13f";
		else if (type == "scrub")
			return "ffedb8";
		else if (type == "jungle")
			return "2f9a13";
		else if (type == "desert")
			return "ecc113";
	}
	
	this.get_soil = function() {
		var soil = 0;
		if (this.type == 'jungle')
			soil = 100;
		else if (this.type == 'temperate')
			soil = 85;
		else if (this.type == 'steppe')
			soil = 75;
		else if (this.type == 'scrub')
			soil = 50;
		else if (this.type == 'taiga')
			soil = 40;
		else if (this.type == 'tundra')
			soil = 10;
		else if (this.type == 'desert')
			soil = 20;
		else if (this.type == 'swamp')
			soil = 95;

		return soil;
	}


	this.render = function() {
		/*
		if (this.organisms.length > 0 ) {
			var o = this.organisms[this.organisms.length - 1];
			var color = o.color;
			this.organism_element.setAttribute('style', 'background-color:'+ color);
		} else {
			this.organism_element.setAttribute('style', '');
		}
	*/
		if (this.organisms.length > 0 ) {
			this.ctx.fillStyle = this.organisms[this.organisms.length - 1].color;
			this.ctx.fillRect (this.x * 10 + 1, this.y * 10 + 1, 8, 8);
		} else {
			this.ctx.fillStyle = this.color;  
			this.ctx.fillRect (this.x * 10, this.y * 10, 10, 10);
		}
	};

	this.add_organism = function(org) {
		this.changed = true;
		this.organisms.push(org);
	}

	this.remove_organism = function(org) {
		this.changed = true;
		var index = this.organisms.indexOf(org);
		this.organisms.splice(index, 1);
	};

	this.random_organism = function() {
		return this.organisms[rand(this.organisms.length)];
	}

	this.iterate = function() {
		this.calculate_shade();
		if (this.food < 5)
			this.food += this.soil / 40.0;
		if (this.changed)
			this.render();
	}

	this.neighbors = function() {
		var neighbors = [];
		for (var x = -1; x < 2; x++) {
			for (var y = -1; y < 2; y++) {
				var habitat = this.environment.get_habitat(this.x + x, this.y + y);
				if (habitat)
					neighbors.push(habitat);
			}
		}
		return neighbors;
	}

	this.random_neighbor = function() {
		return this.environment.get_habitat(this.x + rand(3) - 1, this.y + rand(3) - 1);
	}

	this.calculate_shade = function() {
		this.shade = 0;
		for (var i = 0; i < this.organisms.length; i++) {
			this.shade += this.organisms[i].size;
		}
		this.shade = this.shade / this.organisms.length;
	}




















	this.info = function() {
		var info = {};
		info.x = this.x;
		info.y = this.y;
		info.moisture = this.moisture.toFixed(2);
		info.temperature = this.temperature.toFixed(2);
		info.soil = this.soil.toFixed(2);
		info.shade = this.shade.toFixed(2);
		info.organisms = this.organisms.length;

		return info;
	}

	this.display_info= function() {
		var info = this.info();
		var habitat_info = $('#habitat_info');
		habitat_info.html('');
		for (i in info) {
			var dt = document.createElement('dt');
			dt.textContent = i;
			var dd = document.createElement('dd');
			dd.textContent = info[i];
			habitat_info.append(dt);
			habitat_info.append(dd);
		}
	}
}
