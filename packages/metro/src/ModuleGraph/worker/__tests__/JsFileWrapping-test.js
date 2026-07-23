/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 * @oncall react_native
 */

'use strict';

const JsFileWrapping = require('../JsFileWrapping');
const {codeFromAst, comparableCode} = require('./test-helpers');
const babylon = require('@babel/parser');

const defaultGlobalPrefix = '';

test('wraps a module correctly', () => {
  const dependencyMapName = '_dependencyMapName';

  const originalAst = astFromCode(`
    const dynamicRequire = require;
    const a = require('b/lib/a');
    exports.do = () => require("do");
    if (!something) {
      require("setup/something");
    }
    require.blah('do');
  `);
  const {ast, requireName} = JsFileWrapping.wrapModule(
    originalAst,
    '_$$_IMPORT_DEFAULT',
    '_$$_IMPORT_ALL',
    dependencyMapName,
    defaultGlobalPrefix,
  );

  expect(requireName).toBe('require');
  expect(codeFromAst(ast)).toEqual(
    comparableCode(`
      __d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMapName) {
        const dynamicRequire = require;
        const a = require('b/lib/a');
        exports.do = () => require("do");
        if (!something) {
          require("setup/something");
        }
        require.blah('do');
      });`),
  );
});

test('wraps a module correctly with global prefix', () => {
  const dependencyMapName = '_dependencyMapName';

  const originalAst = astFromCode(`
    const dynamicRequire = require;
  `);
  const globalPrefix = '__metro';
  const {ast, requireName} = JsFileWrapping.wrapModule(
    originalAst,
    '_$$_IMPORT_DEFAULT',
    '_$$_IMPORT_ALL',
    dependencyMapName,
    globalPrefix,
  );

  expect(requireName).toBe('require');
  expect(codeFromAst(ast)).toEqual(
    comparableCode(`
      ${globalPrefix}__d(function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMapName) {
        const dynamicRequire = require;
      });`),
  );
});

test('wraps a polyfill correctly', () => {
  const ast = astFromCode(`
    if (something) {
      console.log('foo');
    }
  `);
  const wrappedAst = JsFileWrapping.wrapPolyfill(ast);

  expect(codeFromAst(wrappedAst)).toEqual(
    comparableCode(`
      (function (global) {
        if (something) {
          console.log('foo');
        }
      })(typeof globalThis !== 'undefined' ?
          globalThis :
          typeof global !== 'undefined' ?
          global :
          typeof window !== 'undefined' ? window : this);`),
  );
});

test('wraps a JSON file correctly', () => {
  const source = JSON.stringify(
    {
      foo: 'foo',
      bar: 'bar',
      baz: true,
      qux: null,
      arr: [1, 2, 3, 4],
    },
    null,
    2,
  );

  const wrappedJson = JsFileWrapping.wrapJson(source, defaultGlobalPrefix);

  expect(comparableCode(wrappedJson)).toEqual(
    comparableCode(
      `__d(function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
      module.exports = {
        "foo": "foo",
        "bar": "bar",
        "baz": true,
        "qux": null,
        "arr": [
          1,
          2,
          3,
          4
        ]
      };
    });`,
    ),
  );
});

test('wraps a module with the static Hermes module factory', () => {
  const dependencyMapName = '_dependencyMapName';

  const originalAst = astFromCode(`
    const a = require('b/lib/a');
  `);
  const {ast, requireName} = JsFileWrapping.wrapModule(
    originalAst,
    '_$$_IMPORT_DEFAULT',
    '_$$_IMPORT_ALL',
    dependencyMapName,
    defaultGlobalPrefix,
    {unstable_useStaticHermesModuleFactory: true},
  );

  expect(requireName).toBe('require');
  expect(codeFromAst(ast)).toEqual(
    comparableCode(`
      __d($SHBuiltin.moduleFactory(_$$_METRO_MODULE_ID, function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMapName) {
        const a = require('b/lib/a');
      }));`),
  );
});

test('wraps a module with the static Hermes module factory and a global prefix', () => {
  const dependencyMapName = '_dependencyMapName';

  const originalAst = astFromCode(`
    const a = require('b/lib/a');
  `);
  const globalPrefix = '__metro';
  const {ast} = JsFileWrapping.wrapModule(
    originalAst,
    '_$$_IMPORT_DEFAULT',
    '_$$_IMPORT_ALL',
    dependencyMapName,
    globalPrefix,
    {unstable_useStaticHermesModuleFactory: true},
  );

  expect(codeFromAst(ast)).toEqual(
    comparableCode(`
      ${globalPrefix}__d($SHBuiltin.moduleFactory(_$$_METRO_MODULE_ID, function (global, require, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMapName) {
        const a = require('b/lib/a');
      }));`),
  );
});

test('wraps a JSON file with the static Hermes module factory', () => {
  const source = JSON.stringify({foo: 'foo', baz: true}, null, 2);

  const wrappedJson = JsFileWrapping.wrapJson(
    source,
    defaultGlobalPrefix,
    /* unstable_useStaticHermesModuleFactory */ true,
  );

  expect(comparableCode(wrappedJson)).toEqual(
    comparableCode(
      `__d($SHBuiltin.moduleFactory(_$$_METRO_MODULE_ID, function(global, require, _importDefaultUnused, _importAllUnused, module, exports, _dependencyMapUnused) {
      module.exports = {
        "foo": "foo",
        "baz": true
      };
    }));`,
    ),
  );
});

function astFromCode(code: string) {
  return babylon.parse(code, {
    plugins: ['dynamicImport'],
    sourceType: 'script',
  });
}
