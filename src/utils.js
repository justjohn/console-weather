var ansiTrim = require('cli-color/lib/trim'),
	Q = require("q");

exports.getTerminalSize = function() {
	var deferred = Q.defer();
        
        if (process.stdout.columns) {
                deferred.resolve({
                        columns: process.stdout.columns,
                        rows: process.stdout.rows
                });
        } else {
                deferred.resolve({
                        columns: 70, // a sensible default
                        rows: -1
                }); 
        }

        return deferred.promise;
}

exports.repeat = function(str, length) {
	return new Array(length + 1).join(str);
};

exports.padLeft = function(string, pad, length) {
	return (exports.repeat(pad, length) + string).slice(-length);
};

exports.padRight = function(string, pad, length) {
	return (string + exports.repeat(pad, length)).slice(0, length);
};

exports.pad = function(string, length, chr) {
	chr = chr || " ";

	var pad = (length - ansiTrim(string).length) / 2,
		intPad = Math.floor(pad),
		start = intPad + (pad == intPad?0:1);

	return exports.repeat(chr, start) + string + exports.repeat(chr, intPad);
}

exports.wordAwareFormat = function(string, length) {
	var words = string.split(" ");

	var output = "",
		line_length = 0,
		line = [];

	while(words.length > 0) {
		var word = ansiTrim(words.shift()),
			word_length = word.length + 1;

		line_length += word_length;
		if (line_length > length) {
			output += line.join(" ") + "\n";
			line = [];
			line_length = word_length;
		}

		line.push(word);
	}

	if (line.length > 0)
		output += line.join(" ") + "\n";

	return output;
};
