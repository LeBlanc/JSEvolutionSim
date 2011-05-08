/**
 * Environment Class
 *
 */

function Environment(canvas, x, y) {
	this.x = x;
	this.y = y;
	this.habitats = [];
	
	this.generate = function(canvas) {
		var moisture = this.random_sources(10, 15, 350, -100);
		var mountains = this.random_sources(20, 80, -150, 200);
		var soil = this.random_sources(20, 40, 0, 100);
		var temperature = this.random_sources(20, 40, 200, -100);
	
		canvas = ($("#environment table tbody"));
		for (var i = 0; i < this.y; i++) {
			var row = this.make_row();
			this.habitats[i] = [];
			for (var j = 0; j < this.x; j++) {
				var habitat = this.make_habitat(j, i);
				habitat.moisture = this.calculate_attribute(j, i, moisture, 0);
				habitat.height = this.calculate_attribute(j, i, mountains, 0);
				habitat.soil = this.calculate_attribute(j, i, soil, 0);
				habitat.temperature = this.calculate_attribute(j, i, temperature, 0);
				habitat.set_type();
				$(row).append(habitat.element);
				this.habitats[i][j] = habitat;
			}
			canvas.append(row);
		}

	}

	this.make_row = function() {
		return document.createElement('tr');
	}

	this.make_habitat = function(x, y) {
		var td = document.createElement('td');
		return new Habitat(td, x, y, 0,0,0,0); 
	}

	this.random_sources = function(minimum, maximum, start, range) {
		sources = [];
		var z = 0;
		for (var x = minimum; x < maximum; x++, z++) {
			var s = [ rand(this.x), rand(this.y), rand(range) + start  ];
			sources[z] = s;
		}
		return sources;
	}

	this.calculate_attribute = function(x, y, sources, value) {
		for (var i = 0; i < sources.length; i++) {
			var s = sources[i];
			var p = (s[2] / Math.min(  Math.max(( Math.sqrt( Math.pow( x - s[0] , 2 ) + Math.pow( y - s[1] , 2 )    )  ), 1.0)  , 100.0) );
			value += p;
		}
		return value
	}

	this.generate();

}
