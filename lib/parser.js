const fs = require('fs');
const babylon = require('babylon'); // 通过babylon生成ast
const traverse = require('babel-traverse').default; // 通过babel-traverse遍历ast，ImportDeclaration获取依赖节点
const core = require('babel-core'); // 通过babel-core生成源码

module.exports = {
    getAST: (path) => {
        const file = fs.readFileSync(path, 'utf-8');
        return babylon.parse(file, {
            sourceType: 'module'
        })
    },
    getNode: (ast) => {
        const nodes = [];
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                nodes.push(node.source.value)
            }
        });
        return nodes
    },
    transform: (ast) => {
        const { code } = core.transformFromAst(ast, null, {
            presets: ["env"]
        });
        return code
    }
}