function Environment( x, y) {
	this.x = x;
	this.y = y;
	this.habitats = [];
	
	this.generate = function(canvas_selector) {
		var moisture = this.random_sources(20, 40, 20, 140);
		var mountains = this.random_sources(20, 80, 10, 60);
		//var soil = this.random_sources(20, 40, 30, 120);
		var temperature = this.random_sources(20, 40, 32, 120);
	
		canvas = ($(canvas_selector));
		for (var xx = 0; xx < this.x; xx++) {
			this.habitats[xx] = [];
			for (var yy = 0; yy < this.y; yy++) {
				var habitat = this.make_habitat(xx, yy);
				habitat.moisture = this.calculate_attribute(xx, yy, moisture, 0);
				habitat.height = this.calculate_attribute(xx, yy, mountains, 0);
				habitat.soil = 50; //default
				//habitat.soil = this.calculate_attribute(xx, yy, soil, 0);
				habitat.temperature = this.calculate_attribute(xx, yy, temperature, 0);
				habitat.set_type();
				this.habitats[xx][yy] = habitat;
			}
		}

		for (var yy = 0; yy < this.y; yy++) {
			var row = this.make_row();
			for (var xx = 0; xx < this.x; xx++) {
				$(row).append(this.habitats[xx][yy].element);
			}
			canvas.append(row);
		}

	};

	this.make_row = function() {
		return document.createElement('tr');
	};

	this.make_habitat = function(x, y) {
		var td = document.createElement('td');
		td.setAttribute('id', 'habitat' + x +'_' + y);
		var div = document.createElement('div');
		div.className = 'organism';
		td.appendChild(div);
		return new Habitat(td, this, x, y, 0,0,0,0); 
	};

	this.random_sources = function(minimum, maximum, start, range) {
		sources = [];
		var z = 0;
		for (var x = minimum; x < maximum; x++, z++) {
			var s = [ rand(this.x), rand(this.y), rand(range) + start  ];
			sources[z] = s;
		}
		return sources;
	};

	this.calculate_attribute = function(x, y, sources, value) {
		for (var i = 0; i < sources.length; i++) {
			var s = sources[i];
			var p = (s[2] / Math.min(  Math.max(( Math.sqrt( Math.pow( x - s[0] , 2 ) + Math.pow( y - s[1] , 2 )    )  ), 1.0)  , 100.0) );
			
			value = Math.min( Math.max(value + p, 0 ), 110 );
		}
		return value
	};

	this.get_habitat = function(x, y) {
		if (this.habitats[x] && this.habitats[x][y])
			return this.habitats[x][y];
		return false;
	};

	this.random_habitat = function() {
		return this.get_habitat(rand(this.x), rand(this.y));
	};

	this.each_habitat = function(func) {
		for (var xx = 0; x < this.x; x++) {
			for (var yy = 0; yy < this.y; yy++) {
				func(this.habitats[xx][yy]);
			}
		}
	};

	this.render = function() { 
		for (var xx = 0; xx < this.x; xx++) {
			for (var yy = 0; yy < this.y; yy++) {
				this.habitats[xx][yy].iterate();
			}
		}
	};

}
