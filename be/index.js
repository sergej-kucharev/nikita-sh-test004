#!/usr/bin/env node

const register = require('@babel/register');

register({
	presets: [
		'@babel/preset-env'
	],
});

module.exports = require('./src/app.js');
