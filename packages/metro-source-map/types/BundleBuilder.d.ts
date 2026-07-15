/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @oncall react_native
 * @generated SignedSource<<7caf8a64a8942cfe2f54a1f82faa1a9b>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro-source-map/src/BundleBuilder.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

import type {IndexMap, IndexMapSection, MixedSourceMap} from './source-map';
/**
 * Builds a source-mapped bundle by concatenating strings and their
 * corresponding source maps (if any).
 *
 * Usage:
 *
 * const builder = new BundleBuilder('bundle.js');
 * builder
 *   .append('foo\n', fooMap)
 *   .append('bar\n')
 *   // ...
 * const code = builder.getCode();
 * const map = builder.getMap();
 */
export declare class BundleBuilder {
  constructor(file: string);
  append(code: string, map: null | undefined | MixedSourceMap): this;
  getMap(): MixedSourceMap;
  getCode(): string;
}
export declare function createIndexMap(file: null | undefined | string, sections: Array<IndexMapSection>): IndexMap;
