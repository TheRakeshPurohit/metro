/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noformat
 * @generated SignedSource<<d0f918cbb60e26b41ad874d4bd35c822>>
 *
 * This file was translated from Flow by scripts/generateTypeScriptDefinitions.js
 * Original file: packages/metro/src/ModuleGraph/worker/JsFileWrapping.js
 * To regenerate, run:
 *   js1 build metro-ts-defs (internal) OR
 *   yarn run build-ts-defs (OSS) 
 */

import type {File as BabelNodeFile} from '@babel/types';

declare function wrapModule(
  fileAst: BabelNodeFile,
  importDefaultName: string,
  importAllName: string,
  dependencyMapName: string,
  globalPrefix: string,
  $$PARAM_5$$?: Readonly<{unstable_useStaticHermesModuleFactory?: boolean}>,
): {ast: BabelNodeFile; requireName: string};
declare function wrapPolyfill(fileAst: BabelNodeFile): BabelNodeFile;
declare function jsonToCommonJS(source: string): string;
declare function wrapJson(source: string, globalPrefix: string, unstable_useStaticHermesModuleFactory?: boolean): string;
export {wrapJson, jsonToCommonJS, wrapModule, wrapPolyfill};
