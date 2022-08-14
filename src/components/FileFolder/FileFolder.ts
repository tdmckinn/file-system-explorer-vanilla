import type { TreeNode } from "../../models/TreeNode";
import { fileSystemExplorerStore } from "../../store/fileSystemExplorerStore";
import {
  addExplorerRows,
  removeExplorerRows,
} from "../ExplorerDetails/ExplorerDetails";
import { CaretDownIcon, CaretRightIcon, FileIcon, FolderIcon } from "../icons";
import "./style.css";

/**
 * Example rendered UI
<ul>
  <li class="collapsed has-children">Files
     <ul>
      <li class="collapsed">Documents
        <ul>
        <li>Git</li>
        <li>Images</li>
        <li>System</li>
      </ul>
      </li>
      <li>Images</li>
      <li>System</li>
    </ul>
  </li>
</ul>
 *
 */
export function FileFolder(node: TreeNode, parentEl?: any, canExpand = true) {
  if (!parentEl || node.type === "file") {
    const fileEl = document.createElement("li");
    fileEl.classList.add("fse-file");

    const fileSpan = document.createElement("span");
    fileSpan.innerHTML = FileIcon();
    fileSpan.append(node.name);
    fileEl.appendChild(fileSpan);
    return fileEl;
  }

  let isSubFolderExpanded = false;

  const folderEl = document.createElement("li");
  folderEl.classList.add("fse-folder");
  folderEl.addEventListener("click", (e) => {
    e.stopPropagation()

    if (fileSystemExplorerStore.activeFileDir !== node.name) {
      fileSystemExplorerStore.activeFileDir = node.name;

      removeExplorerRows();
      addExplorerRows();
    }
  }, false);

  const folderWithIcon = document.createElement("span");
  folderWithIcon.className = "fse-folder-detail fse-folder-wIcon";
  folderWithIcon.innerHTML = FolderIcon();
  folderWithIcon.append(node.name);

  if (node.isParent() && canExpand) {
    const subFolderContent = document.createElement("ul");
    subFolderContent.className = "fse-folder-contents";

    folderEl.classList.add("has-children");
    folderEl.classList.add("collapsed");

    const caretEl = document.createElement("span");
    caretEl.style.width = "15px";
    caretEl.style.height = "15px";
    caretEl.className = "fse-collapse__icon";
    caretEl.innerHTML = CaretRightIcon();
    caretEl.addEventListener("click", () => {
      if (!isSubFolderExpanded) {
        isSubFolderExpanded = true;
        subFolderContent.classList.add("is-visible");
        caretEl.innerHTML = CaretDownIcon();
      } else {
        isSubFolderExpanded = false;
        subFolderContent.classList.remove("is-visible");
        caretEl.innerHTML = CaretRightIcon();
      }
    });
    folderWithIcon.prepend(caretEl);

    folderEl.appendChild(folderWithIcon);

    node.children?.forEach((child: any) => {
      const folder = FileFolder(child, parentEl);

      return folder && subFolderContent.appendChild(folder);
    });
    folderEl.appendChild(subFolderContent);
  } else {
    folderEl.appendChild(folderWithIcon);
  }

  return folderEl;
}

export function createFileFolderNodes(node: TreeNode, parentEl: HTMLElement) {
  if (!parentEl) {
    return null;
  }

  const folder = FileFolder(node, parentEl);
  if (folder) parentEl.prepend(folder);
  return parentEl;
}
