import { ITreeNode } from "../types/ITreeNode";

export type TreeType = "file" | "folder";

export class TreeNode {
  _type: TreeType;
  _name: string;
  _modified: Date;
  _size: number;
  _children: ITreeNode[];

  constructor({ type, name, modified, size, children = [] }: ITreeNode) {
    this._type = type;
    this._name = name;
    this._modified = new Date(modified);
    this._size = size;
    this._children = children;
  }

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }

  get modified() {
    return this._modified;
  }

  get size() {
    return this._size;
  }

  get children() {
    return this._children;
  }

  set type(type: TreeType) {
    this._type = type;
  }

  set name(name: string) {
    this.name = name;
  }

  set modified(modified: Date) {
    this._modified = modified;
  }

  set size(size: number) {
    this._size = size;
  }

  set children(children: ITreeNode[]) {
    this._children = children;
  }

  isParent() {
    return this.children && this.children.length > 0;
  }
}
