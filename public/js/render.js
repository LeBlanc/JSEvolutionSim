function Renderer() {
	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
}

Renderer.prototype.render = function(data) {
	var t = time();
	var xx = data.length - 1;
	while (xx) {
		var hab = data[xx];
		this.ctx.fillStyle = hab.bcolor;  
		this.ctx.fillRect (hab.x * 10, hab.y * 10, 10, 10);
		if (hab.ocolor) {
			this.ctx.fillStyle = hab.ocolor;
			this.ctx.fillRect (hab.x * 10 + 1, hab.y * 10 + 1, 8, 8);
		}
		xx--;
	}
	console.log(time() - t);
}
