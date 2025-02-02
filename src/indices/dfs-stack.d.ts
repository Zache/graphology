export default class DFSStack<T = string> {
  size: number;
  seen: Set<string>;
  constructor(order: number);
  has(node: string): boolean;
  push(node: string): boolean;
  pushWith(node: string, item: T): boolean;
  pop(): T | undefined;
}
