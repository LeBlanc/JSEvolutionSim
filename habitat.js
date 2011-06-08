/**
 * Habitat Class
 */

function Habitat(element, environment, x ,y, moisture, height, temperature, soil) {
	this.element = element;
	this.x = x;
	this.y = y;
	this.moisture = moisture;
	this.height = height;
	this.temperature = temperature;
	this.soil = soil;
	this.organisms = [];
	this.environment = environment;
	this.food = 0;

	

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
		$(element).addClass('habitat');
		$(element).addClass(this.type);
		return this.type;
	}


	this.render = function() { 
		if (this.organisms.length > 0 ) {
			var o = this.organisms[0];
			var color = o.color();
			this.element.setAttribute('style', 'background-color:'+ color);
		} else {
			this.element.setAttribute('style', '');
		}
	};

	this.remove_organism = function(org) {
		var index = this.organisms.indexOf(org);
		this.organisms.splice(index, 1);
	};

	this.iterate = function() {
		if (this.food < 3)
			this.food += this.soil / 50.0;
	}

	this.info = function() {
		var dl = document.createElement("dl");
		jQuery.each(this,  function(index, element) {
			if (typeof element != 'function' ) {
				var dt = document.createElement("dt");
				var dd = document.createElement("dd");
				dt.textContent = index;
				
				if (typeof element == 'number') {
					dd.textContent = element.toFixed(2);
				} else if (typeof element == 'object' && typeof element.info == 'function') {l('x');
					dd.innerHTML = '<a>' +  element + '</a>';
				} else if (typeof element == 'object' && element[0] && typeof element[0].info == 'function') {
					dd.textContent = index;
				} else if (typeof element == 'string') {
					dd.textContent = element;
				} else if (typeof element == 'array') {
					
				} else {
					return;
				}
				
				dl.appendChild(dt);
				dl.appendChild(dd);
			}
		});
		return dl;
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
}
