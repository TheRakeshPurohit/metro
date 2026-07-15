/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @generated SignedSource<<121ef10e99bdee7b3ec29ac7c3698b74>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro-file-map/src/plugins/haste/worker.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

import type {MetadataWorker, V8Serializable, WorkerMessage} from '../../flow-types';

declare class Worker implements MetadataWorker {
  constructor(opts: Readonly<{hasteImplModulePath: null | undefined | string}>);
  processFile(data: WorkerMessage, utils: Readonly<{getContent: () => Buffer}>): V8Serializable;
}

export = Worker;
