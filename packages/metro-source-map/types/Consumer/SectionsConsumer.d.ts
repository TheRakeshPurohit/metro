/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @oncall react_native
 * @generated SignedSource<<83c35c03bd817b0e1efefa4f6ae159b8>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro-source-map/src/Consumer/SectionsConsumer.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

import type {IndexMap} from '../source-map';
import type {GeneratedPositionLookup, IConsumer, Mapping, SourcePosition} from './types';

import AbstractConsumer from './AbstractConsumer';
/**
 * A source map consumer that supports "indexed" source maps (that have a
 * `sections` field and no top-level mappings).
 */
declare class SectionsConsumer extends AbstractConsumer implements IConsumer {
  constructor(sourceMap: IndexMap);
  originalPositionFor(generatedPosition: GeneratedPositionLookup): SourcePosition;
  generatedMappings(): Iterable<Mapping>;
  sourceContentFor(source: string, nullOnMissing: true): null | undefined | string;
}
export default SectionsConsumer;
