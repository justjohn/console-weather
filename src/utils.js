var ansiTrim = require('cli-color/lib/trim'),
	Q = require("q");

exports.getTerminalSize = function() {
	var spawn = require('child_process').spawn,
		deferred = Q.defer(),
		cmd = spawn('resize');

    cmd.stdout.on('data', function(data){
        data = String(data)
        var lines = data.split('\n'),
            cols = Number(lines[0].match(/^COLUMNS=([0-9]+);$/)[1]),
            lines = Number(lines[1].match(/^LINES=([0-9]+);$/)[1])

        deferred.resolve({
        	columns: cols,
        	lines: lines
        });
    });

    cmd.stderr.on('data', function(data) {
    	deferred.reject(new Error("Unable to get dimensions"));
    });

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
