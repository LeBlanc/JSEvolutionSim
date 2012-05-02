function Renderer() {
	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
}

Renderer.prototype.render = function(data) {
	var t = time();
	var xx = data.length - 1;
	while (xx) {
		var hab = data[xx];
		var n = time();
		this.ctx.fillStyle = hab.b;  
		this.ctx.fillRect (hab.x * 10, hab.y * 10, 10, 10);
		if (hab.o) {
			this.ctx.fillStyle = hab.o;
			this.ctx.fillRect (hab.x * 10 + 1, hab.y * 10 + 1, 8, 8);
		}
		xx--;
	}
}

Renderer.prototype.show_stats = function(data) {
	
	var o = "";
	for (key in data["population_levels"]) {
		o = o + key + ": " + data["population_levels"][key] + "<br />";
	}
	
	$("#stats").html(o);
}