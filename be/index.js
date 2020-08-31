#!/usr/bin/env node

require('@babel/register');
const server = require('./src/app.js');

console.log(server);
