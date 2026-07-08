/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall react_native
 */

'use strict';

const fs = require('fs');
const Module = require('module');
const path = require('path');

const prettierPath = [
  path.resolve(__dirname, '../node_modules/prettier'),
  path.resolve(__dirname, '../../../node_modules/prettier'),
].find(candidate => fs.existsSync(candidate));

module.exports = Module.prototype.require.call(
  module,
  prettierPath ?? 'prettier',
);
