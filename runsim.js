var sim;
var organisms;
var dolog = true;

$(document).ready( function() {

//console.log(string_multiply("bob ", 5));

sim = new Simulation(100, 60);

$.fn.get_habitat = function() {
	var id = $(this).attr('id');
	var x = id.substring( id.indexOf('habitat') + 7, id.indexOf('_'));
	var y = id.substring( id.indexOf('_') + 1);
	return sim.environment.habitats[x][y];
}

function display_habitat(habitat) {
	$("#habitat_info dd.position").text(habitat.x + "," + habitat.y);
	$("#habitat_info dd.type").text(habitat.type);
	$("#habitat_info dd.height").text(habitat.height.toFixed(2));
	$("#habitat_info dd.moisture").text(habitat.moisture.toFixed(2));
	$("#habitat_info dd.soil").text(habitat.soil.toFixed(2));
	$("#habitat_info dd.temperature").text(habitat.temperature.toFixed(2));
	$("#habitat_info dd.food").text(habitat.food.toFixed(2));
	$("#habitat_info dd.organism_count").text(habitat.organisms.length);
	if (habitat.organisms.length > 0) {
		l(habitat);
	}
}



function display_info(object, parent) {
	if (!parent)
		parent = $("#info");
	parent.append(object.info());
}

function flush_display(parent) {
	if (!parent) {
		parent = $("#info"); l('f');}
	parent.html('');
}



$('.habitat').click( function() { flush_display($("#habitat_info")); $(this).append($("#selector")); display_info($(this).get_habitat(), $("#habitat_info") ); });


$("#run").click( function() { 
	if (sim.paused) {
		sim.paused = false;
	} else {
		sim.paused = true;
	}
});




});
