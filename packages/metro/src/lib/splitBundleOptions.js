/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @oncall react_native
 */

'use strict';

import type {BundleOptions, SplitBundleOptions} from '../shared/types.flow';

/**
 * Splits a BundleOptions object into smaller, more manageable parts.
 */
function splitBundleOptions(options: BundleOptions): SplitBundleOptions {
  return {
    entryFile: options.entryFile,
    resolverOptions: {
      customResolverOptions: options.customResolverOptions,
      dev: options.dev,
    },
    transformOptions: {
      customTransformOptions: options.customTransformOptions,
      dev: options.dev,
      hot: options.hot,
      minify: options.minify,
      platform: options.platform,
      type: 'module',
      unstable_transformProfile: options.unstable_transformProfile,
    },
    serializerOptions: {
      excludeSource: options.excludeSource,
      inlineSourceMap: options.inlineSourceMap,
      modulesOnly: options.modulesOnly,
      runModule: options.runModule,
      sourceMapUrl: options.sourceMapUrl,
      sourceUrl: options.sourceUrl,
      sourcePaths: options.sourcePaths,
    },
    graphOptions: {
      shallow: options.shallow,
      lazy: options.lazy,
    },
    onProgress: options.onProgress,
  };
}

module.exports = splitBundleOptions;
