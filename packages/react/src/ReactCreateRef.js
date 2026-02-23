/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

import type { RefObject } from 'shared/ReactTypes';

// an immutable object with a single mutable value
// 和 useRef - mountRef 产生的相同格式的 refObj 即 { current: T }
export function createRef(): RefObject {
  const refObject = {
    current: null,
  };
  if (__DEV__) {
    Object.seal(refObject);
  }
  return refObject;
}
