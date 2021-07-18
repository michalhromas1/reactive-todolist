import { deepCopy } from './deep-copy';
import { deepFreeze } from './deep-freeze';
import { DeepReadonly } from './deep-readonly.model';

export function immutableDeepFreeze<T>(obj: T): DeepReadonly<T> {
  return deepFreeze(deepCopy(obj));
}
