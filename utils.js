/*
 utility functions - need to wrap into a namespace. 
*/

function baseConverter (number,ob,nb) {
	// Created 1997 by Brian Risk.  http://brianrisk.com
	number = number.toUpperCase();
	var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var dec = 0;
	for (var i = 0; i <=  number.length; i++) { 
		dec += (list.indexOf(number.charAt(i))) * (Math.pow(ob , (number.length - i - 1)));
	}
	number = "";
	var magnitude = Math.floor((Math.log(dec))/(Math.log(nb)));
	for (var i = magnitude; i >= 0; i--) { 
		var amount = Math.floor(dec/Math.pow(nb,i));
		number = number + list.charAt(amount); 
		dec -= amount*(Math.pow(nb,i));
	}
	return number;
}

function string_multiply(string, ntimes) {
	var result = '';
	for (var z = 0; z < ntimes; z++) {
		result += string; }
	return result;
}

function bp_to_json(bp) {
	bp = bp.replace(/G/g, "0");
	bp = bp.replace(/A/g, "1");
	bp = bp.replace(/C/g, "2");
	bp = bp.replace(/T/g, "3");
	result = '';
	while (bp.length > 0) {
		var z = bp.slice(0,4);
		bp = bp.slice(4);
		result += String.fromCharCode(baseConverter(z , 4, 10));
	}
	return result;
}

function json_to_gene(json) {
	return g = new Gene(json.id, json.position, json.chromosome, json.attribute, json.effect, json.dominance);

}

function l(object) {
	if (dolog)
		console.log(object);
}

function rand(num) {
	return Math.floor(Math.random() * num );
}

function rand_element(array) {
	return array[rand(array.length) ];
}

function rand_empty(array, len) {
	for (var i = 0; i < len; i++) {
		var x = rand(len);
		if (typeof array[x] == 'undefined') {
			return x;
		}
	}
	return false;
}

function rand_standard(base, multiply) {
	return multiply * ( (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1) + (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1) ) + base;
}

function time() {
	var time = new Date();
	return time.getTime();
}
