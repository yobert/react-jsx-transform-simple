#!/usr/bin/env node
// -*- mode: js -*-
"use strict";

var fs = require('fs');
var rt = require('react-tools');

var infile = process.argv[2];
var outfile = process.argv[3];

if(!infile || !outfile) {
	throw('input and output file path must be passed');
}

var header = '/** @jsx React.DOM */' + "\n";
var source = header + fs.readFileSync(infile, "utf8");

source = rt.transform(source);

fs.writeFileSync(outfile, source);

