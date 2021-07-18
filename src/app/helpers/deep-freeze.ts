import { DeepReadonly } from './deep-readonly.model';

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  const props = Object.getOwnPropertyNames(obj);

  Object.freeze(obj);

  for (const prop of props) {
    if (shouldDeepFreeze(obj, prop)) {
      deepFreeze(obj[prop]);
    }
  }

  return obj as DeepReadonly<T>;
}

function shouldDeepFreeze<T>(obj: T, prop: string): boolean {
  return (
    obj.hasOwnProperty(prop) &&
    obj[prop] !== null &&
    (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
    !Object.isFrozen(obj[prop])
  );
}
