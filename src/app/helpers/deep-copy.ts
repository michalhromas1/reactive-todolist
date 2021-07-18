export function deepCopy<T>(obj: T): T {
  const isArray = Array.isArray(obj);
  const isObject = obj && typeof obj === 'object';

  const copied: any = isArray ? deepCopyArray(obj as any) : isObject ? deepCopyObject(obj) : obj;
  return copied;
}

function deepCopyArray<T>(arr: T[]): T[] {
  const node = arr.length > 0 ? arr.slice(0) : [];

  node.forEach((item, idx) => {
    if ((typeof item === 'object' && item !== {}) || (Array.isArray(item) && item.length > 0)) {
      node[idx] = deepCopy(item);
    }
  });

  return node;
}

function deepCopyObject<T>(obj: T): T {
  const node = obj instanceof Date ? obj : Object.assign({}, obj);
  const props = Object.keys(node);

  for (const prop of props) {
    if (shouldDeepCopyObject(node, prop)) {
      node[prop] = deepCopy(node[prop]);
    }
  }

  return node;
}

function shouldDeepCopyObject<T>(obj: T, prop: string): boolean {
  return (
    (typeof obj[prop] === 'object' && obj[prop] !== {}) ||
    (Array.isArray(obj[prop]) && obj[prop].length > 0)
  );
}
