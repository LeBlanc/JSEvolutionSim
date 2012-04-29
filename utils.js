/*
 utility functions - need to wrap into a namespace. 
*/

baseConverter = function(number,ob,nb) {
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

string_multiply = function(string, ntimes) {
	var result = '';
	for (var z = 0; z < ntimes; z++) {
		result += string; }
	return result;
}

bp_to_json = function(bp) {
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

json_to_gene = function(json) {
	return g = new Gene(json.id, json.position, json.chromosome, json.attribute, json.effect, json.dominance);

}

l = function(object) {
	if (dolog)
		console.log(object);
}

rand = function(num) {
	return Math.floor(Math.random() * num );
}

rand_element = function(array) {
	return array[rand(array.length) ];
}

rand_empty = function(array, len) {
	for (var i = 0; i < len; i++) {
		var x = rand(len);
		if (typeof array[x] == 'undefined') {
			return x;
		}
	}
	return false;
}

rand_standard = function(base, multiply) {
	return multiply * ( (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1) + (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1) ) + base;
}

time = function() {
	var time = new Date();
	return time.getTime();
}
