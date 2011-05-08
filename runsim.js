//console.log(string_multiply("bob ", 5));

var g = new Gene(5, 6, 7, 8, 9, 10);

g.mutate();




plant1template = { 
	"species_name": "grass",
	"chromosome_count": 5,
	"attributes": {
		"turn_speed": 1,
		"color_1": "130",
		"color_2": "170",
		"color_3": "150",
		"mature_age": 30,
		"flowering_rate": 15,
		"sprout_temperature": 70,
		"sprout_water": 30
	}
}

var s = new Species(1, plant1template);
var o1 = s.organism();
var o2 = s.organism();

l(o1);
l(o2);
var o3 = o1.mate(o2);
l(o3);
