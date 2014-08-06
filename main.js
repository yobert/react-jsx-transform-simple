#!/usr/bin/env node
// -*- mode: js -*-
"use strict";

var fs = require('fs');
var rt = require('react-tools');

var infile = process.argv[2];
var outfile = process.argv[3];

if(!infile || !outfile) {
	throw('input and output file path must be passed (you can use - for STDIN/STDOUT)');
}

var header = '/** @jsx React.DOM */' + "\n";
var source = header;

var write = function() {
	source = rt.transform(source);

	if(outfile != '-') {
		fs.writeFileSync(outfile, source);
	} else {
		process.stdout.write(source);
	}
};

if(infile != '-') {
	source += fs.readFileSync(infile, "utf8");
	write();
} else {
	process.stdin.resume();
	process.stdin.on('data', function(buf) { source += buf.toString(); });
	process.stdin.on('end', write);
}

