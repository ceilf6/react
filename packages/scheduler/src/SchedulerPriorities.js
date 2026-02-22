/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// Scheduler 优先级 - 独立包、通用性
export const NoPriority = Symbol('NoPriority');
export const ImmediatePriority = Symbol('ImmediatePriority');
export const UserBlockingPriority = Symbol('UserBlockingPriority');
export const NormalPriority = Symbol('NormalPriority');
export const LowPriority = Symbol('LowPriority');
export const IdlePriority = Symbol('IdlePriority');

export type PriorityLevel =
  | typeof NoPriority
  | typeof ImmediatePriority
  | typeof UserBlockingPriority
  | typeof NormalPriority
  | typeof LowPriority
  | typeof IdlePriority;
