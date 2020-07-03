const fs = require('fs');
const path = require('path');
const { getAST, getNode, transform } = require('./parser');


module.exports = class Compiler {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }

    run() {
        const entryModule = this.buildMoudle(this.entry, true);
        this.modules.push(entryModule);
        //递归遍历
        this.modules.map((_moudle)=>{
            _moudle.nodes.map((node)=>{
                this.modules.push(this.buildMoudle(node));
            });
        });
        this.fillFile();
    }

    buildMoudle(filepath, isEntry) {
        let ast;
        if (isEntry) {
            ast = getAST(filepath);
        } else {
            let absolutePath = path.join(process.cwd(), './src', filepath);
            ast = getAST(absolutePath);
        }
        return {
            filepath,
            nodes: getNode(ast),
            code: transform(ast)
        }
    }

    fillFile() {
        let moudles = '';
        this.modules.map((_moudle)=>{
            moudles += `'${_moudle.filepath}': function (require, moudle, exports) {${_moudle.code}},`
        })
        const bundle = `
            (function(modules){
                function require(filepath){
                    const fn = modules[filepath];
                    
                    const moudle = { exports: {} };

                    fn(require, moudle, moudle.exports);

                    return moudle.exports
                }
                require('${this.entry}')
            })({${moudles}})
        `;

        const outpath = path.join(this.output.path, this.output.filename);
        fs.writeFileSync(outpath, bundle, 'utf-8');
    }
}