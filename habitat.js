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
			$(this.element).addClass('organism');
		} else {
			$(this.element).removeClass('organism');
		}
	}
}
