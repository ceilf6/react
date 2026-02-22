/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { Lane, Lanes } from './ReactFiberLane';

import {
  NoLane,
  SyncLane,
  InputContinuousLane,
  DefaultLane,
  IdleLane,
  getHighestPriorityLane,
  includesNonIdleWork,
} from './ReactFiberLane';

export opaque type EventPriority = Lane;

// React 内部优先级 - 事件I/O优先级 - Lane
export const NoEventPriority: EventPriority = NoLane;
export const DiscreteEventPriority: EventPriority = SyncLane; // 离散事件，例如 click, input, focus...
export const ContinuousEventPriority: EventPriority = InputContinuousLane; // 连续事件，例如 drag, mousemove
export const DefaultEventPriority: EventPriority = DefaultLane; // 默认优先级，例如通过计时器周期性触发更新
export const IdleEventPriority: EventPriority = IdleLane; // 空闲情况优先级

export function higherEventPriority(
  a: EventPriority,
  b: EventPriority,
): EventPriority {
  return a !== 0 && a < b ? a : b;
}

export function lowerEventPriority(
  a: EventPriority,
  b: EventPriority,
): EventPriority {
  return a === 0 || a > b ? a : b;
}

export function isHigherEventPriority(
  a: EventPriority,
  b: EventPriority,
): boolean {
  return a !== 0 && a < b;
}

export function eventPriorityToLane(updatePriority: EventPriority): Lane {
  return updatePriority;
}

// Lane - React Priority => Scheduler Priority
export function lanesToEventPriority(lanes: Lanes): EventPriority {
  const lane = getHighestPriorityLane(lanes); // 获取优先级最高的 lane
  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }
  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }
  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }
  return IdleEventPriority;
}
