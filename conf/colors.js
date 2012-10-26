var clc = require('cli-color'),
	none=function(s){return s;}; // passthrough

exports.none = {
	bar: none,
	loc: none,
	high: none,
	temp: none,
	day: none,
	tempLow: none,
	dim: none,

	fullDay: none,
	fullText: none
};

exports.default = {
	bar: none,
	loc: clc.yellow,
	high: clc.blue.bold,
	temp: clc.blue.bold,
	day: none,
	tempLow: none,
	dim: clc.red,

	fullDay: clc.yellow,
	fullText: none
};
