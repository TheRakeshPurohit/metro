/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {
  File as BabelNodeFile,
  FunctionExpression,
  Identifier,
  Program,
} from '@babel/types';

import template from '@babel/template';
import * as t from '@babel/types';

// Check first the `global` variable as the global object. This way serializers
// can create a local variable called global to fake it as a global object
// without having to pollute the window object on web.
const IIFE_PARAM = template.expression(
  "typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this",
);

function wrapModule(
  fileAst: BabelNodeFile,
  importDefaultName: string,
  importAllName: string,
  dependencyMapName: string,
  globalPrefix: string,
  {
    unstable_useStaticHermesModuleFactory = false,
  }: Readonly<{unstable_useStaticHermesModuleFactory?: boolean}> = {},
): {
  ast: BabelNodeFile,
  requireName: string,
} {
  const params = buildParameters(
    importDefaultName,
    importAllName,
    dependencyMapName,
  );
  const factory = functionFromProgram(fileAst.program, params);

  const def = t.callExpression(t.identifier(`${globalPrefix}__d`), [
    unstable_useStaticHermesModuleFactory
      ? t.callExpression(
          t.memberExpression(
            t.identifier('$SHBuiltin'),
            t.identifier('moduleFactory'),
          ),
          [t.identifier('_$$_METRO_MODULE_ID'), factory],
        )
      : factory,
  ]);

  const ast = t.file(t.program([t.expressionStatement(def)]));

  // `require` is never scoped/renamed: the local `require` function parameter is
  // used instead of the global one when Metro serializes to the IIFE module
  // factory.
  return {ast, requireName: 'require'};
}

function wrapPolyfill(fileAst: BabelNodeFile): BabelNodeFile {
  const factory = functionFromProgram(fileAst.program, ['global']);

  const iife = t.callExpression(factory, [IIFE_PARAM()]);
  return t.file(t.program([t.expressionStatement(iife)]));
}

function jsonToCommonJS(source: string): string {
  return `module.exports = ${source};`;
}

function wrapJson(
  source: string,
  globalPrefix: string,
  unstable_useStaticHermesModuleFactory?: boolean = false,
): string {
  // Unused parameters; remember that's wrapping JSON.
  const moduleFactoryParameters = buildParameters(
    '_importDefaultUnused',
    '_importAllUnused',
    '_dependencyMapUnused',
  );

  const factory = [
    `function(${moduleFactoryParameters.join(', ')}) {`,
    `  ${jsonToCommonJS(source)}`,
    '}',
  ].join('\n');

  return (
    `${globalPrefix}__d(` +
    (unstable_useStaticHermesModuleFactory
      ? '$SHBuiltin.moduleFactory(_$$_METRO_MODULE_ID, ' + factory + ')'
      : factory) +
    ');'
  );
}

function functionFromProgram(
  program: Program,
  parameters: ReadonlyArray<string>,
): FunctionExpression {
  return t.functionExpression(
    undefined,
    parameters.map(makeIdentifier),
    t.blockStatement(program.body, program.directives),
  );
}

function makeIdentifier(name: string): Identifier {
  return t.identifier(name);
}

function buildParameters(
  importDefaultName: string,
  importAllName: string,
  dependencyMapName: string,
): ReadonlyArray<string> {
  return [
    'global',
    'require',
    importDefaultName,
    importAllName,
    'module',
    'exports',
    dependencyMapName,
  ];
}

export {wrapJson, jsonToCommonJS, wrapModule, wrapPolyfill};
