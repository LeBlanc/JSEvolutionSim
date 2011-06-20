/**
 * Habitat Class
 */

function Habitat(element, environment, x ,y, moisture, height, temperature, soil) {
	this.element = element;
	this.organism_element = element.childNodes[0];
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
		else if (this.moisture > 90)
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
		$(element).addClass('habitat');
		$(element).addClass(this.type);
		return this.type;
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
		if (this.organisms.length > 0 ) {
			var o = this.organisms[this.organisms.length - 1];
			var color = o.color;
			this.organism_element.setAttribute('style', 'background-color:'+ color);
		} else {
			this.organism_element.setAttribute('style', '');
		}
	};

	this.add_organism = function(org) {
		this.organisms.push(org);
	}

	this.remove_organism = function(org) {
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
