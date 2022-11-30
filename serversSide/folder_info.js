const { Module } = require("module");
const path = require("path");
const fs = require("fs").promises

function pathJoin(dir = "") {
  return path.join(__dirname, "AllusersFolders", dir);
}


function typeFile(req) {
  return req.url.includes('.')
}




module.exports = { typeFile, pathJoin };
  
