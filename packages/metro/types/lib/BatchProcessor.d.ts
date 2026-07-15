/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @oncall react_native
 * @generated SignedSource<<310bea2deb24a5861b0a2cc2f5a13424>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro/src/lib/BatchProcessor.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

type ProcessBatch<TItem, TResult> = (batch: Array<TItem>) => Promise<Array<TResult>>;
type BatchProcessorOptions = {
  maximumDelayMs: number;
  maximumItems: number;
  concurrency: number;
};
/**
 * We batch items together trying to minimize their processing, for example as
 * network queries. For that we wait a small moment before processing a batch.
 * We limit also the number of items we try to process in a single batch so that
 * if we have many items pending in a short amount of time, we can start
 * processing right away.
 */
declare class BatchProcessor<TItem, TResult> {
  constructor(options: BatchProcessorOptions, processBatch: ProcessBatch<TItem, TResult>);
  queue(item: TItem): Promise<TResult>;
  getQueueLength(): number;
}
export default BatchProcessor;
