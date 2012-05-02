Simulation = function(x, y, io) {
	this.show_stats = true;
	this.turn = 0;
	this.species = [];
	this.paused = false;
	this.organisms  = [];
	this.x = x;
	this.y = y;
	this.times = {};
	this.times.total_runtime = 0;
	this.times.photosynthesize = 0;
	this.times.pollenate = 0;
	this.times.mate = 0;
	this.times.calculate_attributes = 0;
	this.times.meiosis = 0;
	this.run_time = 0;
	this.population_levels = {};

	this.add_organism = function(organism, habitat) {
		organism.habitat = habitat;
		this.organisms.push(organism);
		habitat.add_organism(organism);
	}

	this.remove_organism = function(organism) {
		this.organisms.splice(this.organisms.indexOf(organism), 1);
	}

	this.init = function() {
		this.environment = new Environment(this.x,this.y);
		this.environment.generate();
	}

	this.run = function() {
		this.reset_times();
		if (this.paused)
			return;
		
		var start_time = time();

		/*
		var pop_size = this.organisms.length;
		if (pop_size > 15000) {
			for (var i = 0; i < pop_size - 15000; i++) {
				this.organisms[rand(pop_size)].die();
			}
		}
		*/
		
		for (var i = 0; i < this.organisms.length; i++) {
			if (this.organisms[i].dead)
				this.remove_organism(this.organisms[i]);
			else
				this.organisms[i].run();
		}
		var s = time();
		this.environment.iterate();
		var render_time = time() - s;
		this.turn += 1;
		var run_time = time() - start_time;
		this.add_times("run_time", run_time);
		this.add_times("TURN: ", this.turn)

		this.update_population_levels();
		
		this.run_time = run_time;
		var z = time();
		io.sockets.emit('render',{data: this.environment.rendered});
		this.add_times("render_send", time() - z);
		
		io.sockets.emit('stats', {data: { "times": this.times, "population_levels": this.population_levels }})
		
		//this.iteration = setTimeout("sim.run()", Math.max(400 - run_time, 50));
	}

	this.start = function() {


	}

	this.add_times = function(time, amt) {
		this.times[time] += amt;
	}

	this.reset_times = function() {
		for (t in this.times) {
			this.times[t] = 0;
		}
	}

	this.show_times = function() {
		for (t in this.times) {
			l(t + ": " + this.times[t]);
		}
	}

	this.show_population_levels = function() {
		l("total: " + this.organisms.length);
		var other_total = 0;
		for (var i = 0; i < this.species.length; i++) {
			l(this.species[i].species_name + ": " + this.species[i].organisms.length);
			other_total += this.species[i].organisms.length;
		}
		l("other total: " + other_total);
	}
	
	this.update_population_levels = function() {
		this.population_levels = {};
		for (var i = 0; i < this.species.length; i++) {
			this.population_levels[this.species[i].species_name] = this.species[i].organisms.length;
		}
	}

	this.update_selected_display = function() {
		if (this.selected_habitat) {
			this.selected_habitat.display_info();
		}
	}

}


