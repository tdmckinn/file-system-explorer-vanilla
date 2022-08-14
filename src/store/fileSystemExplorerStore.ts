import { TreeNode } from "../models/TreeNode";
import type { ITreeNode } from "../types/ITreeNode";

const WORKER_ENDPOINT_URL = "https://long-smoke-b533.kinnon.workers.dev/";

class FileSystemExplorerStore {
  activeFileDir?: string;

  contents: TreeNode | undefined;
  contentsMap = new Map();

  private createTreeNodes(node: ITreeNode) {
    node.children = node.children?.map((child) => {
      return this.createTreeNodes(child);
    });

    this.contentsMap.set(node.name, node.children);
    return new TreeNode(node);
  }

  async fetchFileExploreContents() {
    try {
      const data = await fetch(WORKER_ENDPOINT_URL).then((resp) => resp.json());

      const explorerContentsTree = this.createTreeNodes(
        data.files as unknown as ITreeNode
      );

      this.contents = explorerContentsTree;
      this.activeFileDir = data.files?.name;
    } catch (err) {
      console.log("Err displaying files...", err);
    }
  }

  get folders() {
    return [];
  }

  get files() {
    return [];
  }

  getFilesByActiveDir(): TreeNode[] {
    return this.contentsMap.get(this.activeFileDir);
  }
}

export const fileSystemExplorerStore = new FileSystemExplorerStore();
