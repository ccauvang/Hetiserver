const os = require('os');

console.log(os.cpus(), os.totalmem() /1e3, os.freemem()/1e3);