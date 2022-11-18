export type Class<T> = new (...args: any[]) => T;

export function getClassName(obj: { toString(): string }) {
  const conMath = obj.toString().match(/\w+/g);
  if (conMath) {
    const className = conMath[1];
    return className;
  } else {
    return obj.toString();
  }
}

export function mergeType<T>(obj: any, newObj: any) {
  Object.assign(obj, newObj);
  obj.__proto__ = newObj.__proto__;
  newObj = null;
}
