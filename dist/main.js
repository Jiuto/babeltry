
            (function(modules){
                function require(filepath){
                    const fn = modules[filepath];
                    
                    const moudle = { exports: {} };

                    fn(require, moudle, moudle.exports);

                    return moudle.exports
                }
                require('E:\项目文件夹\项目资料\其他\babeltry\src\index.js')
            })({'E:\项目文件夹\项目资料\其他\babeltry\src\index.js': function (require, moudle, exports) {"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('world'));},'./greeting.js': function (require, moudle, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = undefined;

var _hello = require("./hello.js");

var greeting = function greeting(name) {
  return _hello.str + ' ' + name;
};
exports.greeting = greeting;},'./hello.js': function (require, moudle, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var str = 'hello';
exports.str = str;},})
        