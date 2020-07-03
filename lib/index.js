const Compiler = require('./compiler');
const config = require('../babeltry.config');
new Compiler(config).run();