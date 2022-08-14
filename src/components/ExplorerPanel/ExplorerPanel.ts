import { fileSystemExplorerStore } from "../../store/fileSystemExplorerStore";
import { createFileFolderNodes } from "../FileFolder/FileFolder";
import "./style.css";

export function ExplorerPanel() {
  const panelEl = document.createElement("div");
  panelEl.className = "fse-explorer__panel";

  if (fileSystemExplorerStore.contents) {
    const { contents } = fileSystemExplorerStore;
    const folderContents = createFileFolderNodes(
      contents,
      document.createElement("ul")
    );

    if (folderContents) {
      panelEl.appendChild(folderContents);
    }
  }

  return panelEl;
}
