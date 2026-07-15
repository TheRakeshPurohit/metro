/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @oncall react_native
 * @generated SignedSource<<de88a16a283b7173f134411a443e1672>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro/src/DeltaBundler/WorkerFarm.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

import type {TransformResult} from '../DeltaBundler';
import type {TransformerConfig, TransformOptions} from './Worker';
import type {ConfigT} from 'metro-config';

type TransformerResult = Readonly<{result: TransformResult; sha1: string}>;
declare class WorkerFarm {
  constructor(config: ConfigT, transformerConfig: TransformerConfig);
  kill(): Promise<void>;
  transform(filename: string, options: TransformOptions, fileBuffer?: Buffer): Promise<TransformerResult>;
}
export default WorkerFarm;
