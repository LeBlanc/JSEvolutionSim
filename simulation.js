function Simulation(x, y) {
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
		this.environment.generate("#environment table tbody");
	}

	this.run = function() {
		this.reset_times();
		if (this.paused)
			return;
		
		var start_time = time();
		
		for (var i = 0; i < this.organisms.length; i++) {
			if (this.organisms[i].dead)
				this.remove_organism(this.organisms[i]);
			else
				this.organisms[i].run();
		}
		var s = time();
		this.environment.render();
		this.update_selected_display();
		var render_time = time() - s;
		this.turn += 1;
		var run_time = time() - start_time;
		if ( this.show_stats) {
			l(this.turn + ": " + run_time);
			l("render_time: " + render_time);
			this.show_times();
			this.show_population_levels();
			l(" ");
		}
		this.iteration = setTimeout("sim.run();", Math.max(400 - run_time, 1));
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
		for (var i = 0; i < this.species.length; i++) {
			l(this.species[i].species_name + ": " + this.species[i].organisms.length);
		}
	}

	this.update_selected_display = function() {
		if (this.selected_habitat) {
			this.selected_habitat.display_info();
		}
	}

}


