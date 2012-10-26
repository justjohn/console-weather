var fs = require("fs");

exports.print = function(stream, file)
{
    fs.createReadStream(__dirname + "/../doc/" + file).pipe(stream);
};