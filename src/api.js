var http = require('http'),
	Q = require('q');

var API = function(api_key) {
	this.api_key = api_key;
};

API.prototype.call = function(path) {
	var deferred = Q.defer();

	var options = {
	  host: 'api.wunderground.com',
	  port: 80,
	  path: '/api/' + this.api_key + path,
	  method: 'GET'
	};

	var req = http.request(options, function(res) {
		var output = '';
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			output += chunk;
		});

		res.on('end', function () {
			var json = JSON.parse(output);
			deferred.resolve(json);
		});
	});

	req.on('error', function(e) {
	  	deferred.reject('problem with request: ' + e.message);
	});

	req.end();

	return deferred.promise;
};

API.prototype.geoforecast = function() {
	var deferred = Q.defer();

	this.call('/conditions/forecast/q/autoip.json').then(function(data) {
		deferred.resolve(data);

	}, function(err) {
		deferred.reject({
			type: 'callfail',
			description: err
		});
	});

	return deferred.promise;
};

API.prototype.geolocate = function() {
	var deferred = Q.defer();

	this.call('/geolookup/q/autoip.json').then(function(data) {
		if (!data.location) {
			var error = data.response.error;
			deferred.reject(error);

		} else {
			deferred.resolve(data.location);
		}

	}, function(err) {
		deferred.reject({
			type: 'callfail',
			description: err
		});
	});

	return deferred.promise;
};

API.prototype.forecast = function(location) {
	var deferred = Q.defer(),
        path = location.l;

	this.call('/conditions/forecast' + path  + '.json').then(function(data) {
		deferred.resolve(data);

	}, function(err) {
		deferred.reject({
			type: 'callfail',
			description: err
		});
	});

	return deferred.promise;
};

exports.API = API;

