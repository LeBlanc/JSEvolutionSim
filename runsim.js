//console.log(string_multiply("bob ", 5));

var g = new Gene(5, 6, 7, 8, 9, 10);

g.mutate();

console.log(JSON.parse(bp_to_json(g.to_bp())));

