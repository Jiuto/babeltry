const Compiler = require('./lib/compiler');
const config = require('./babeltry.config');
new Compiler(config).run();