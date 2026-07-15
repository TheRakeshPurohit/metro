/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @oncall react_native
 * @generated SignedSource<<10d1e5eded56fb590d54553faf71bc70>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro/src/DeltaBundler/Transformer.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

import type {TransformResultWithSource} from '../DeltaBundler';
import type {TransformOptions} from './Worker';
import type {ConfigT} from 'metro-config';

type GetOrComputeSha1Fn = ($$PARAM_0$$: string) => Promise<Readonly<{content?: Buffer; sha1: string}>>;
declare class Transformer {
  constructor(config: ConfigT, opts: Readonly<{getOrComputeSha1: GetOrComputeSha1Fn}>);
  transformFile(filePath: string, transformerOptions: TransformOptions, fileBuffer?: Buffer): Promise<TransformResultWithSource>;
  end(): Promise<void>;
}
export default Transformer;
