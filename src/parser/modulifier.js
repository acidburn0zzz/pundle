'use strict'

/* @flow */
/* eslint-disable new-cap */

function PundleTransformer({ types: t }: Object): Object {
  return {
    visitor: {
      Program(path) {
        if (this.pundle_modulified) {
          return
        }

        this.pundle_modulified = true
        path.replaceWith(t.Program([
          t.FunctionDeclaration(t.Identifier('moduleBody'),
            [t.Identifier('require'), t.Identifier('module'), t.Identifier('exports')],
            t.BlockStatement(path.node.body))
        ]))
      }
    }
  }
}

module.exports = PundleTransformer
