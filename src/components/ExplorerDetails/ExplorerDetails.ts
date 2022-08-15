import type { TreeNode } from "../../models/TreeNode";
import { fileSystemExplorerStore } from "../../store/fileSystemExplorerStore";
import { FileFolder } from "../FileFolder/FileFolder";
import "./style.css";

const EXPLORER_DETAILS_TABLE = "fse-explorer__details";
export const removeExplorerRows = () => {
  document.querySelectorAll(".fse-explorer-row").forEach((el) => {
    el.remove();
  });
};

export const addExplorerRows = () => {
  const detailsContent = fileSystemExplorerStore.getFilesByActiveDir();
  const explorerTableEl = document.querySelector(`.${EXPLORER_DETAILS_TABLE}`);

  createFileRows(detailsContent, explorerTableEl);

  if (explorerTableEl?.children.length === 1) {
    explorerTableEl.appendChild(EmptyFileRow());
  }
};

export const EmptyFileRow = () => {
  const emptyRow = document.createElement("div");
  emptyRow.className = "fse-explorer-row table-row-group";
  const fileRow = document.createElement("div");
  fileRow.className = "table-row";

  return emptyRow;
};

const createFileRows = (children: TreeNode[], parentEl: Element | null) => {
  if (!parentEl) return;

  children?.forEach((child) => {
    const fileRowGroup = document.createElement("div");
    fileRowGroup.className = "fse-explorer-row table-row-group";
    const fileRow = document.createElement("div");
    fileRow.className = "table-row";

    const nameCellValue = document.createElement("div");
    nameCellValue.className = "table-cell text-left";

    const dateModifiedCellValue = document.createElement("div");
    dateModifiedCellValue.className = "table-cell text-left";

    const fileSizeZellValue = document.createElement("div");
    fileSizeZellValue.className = "table-cell text-left";

    nameCellValue.appendChild(FileFolder(child as TreeNode, fileRow, false));

    dateModifiedCellValue.innerText = new Intl.DateTimeFormat("en-US").format(
      child.modified
    );

    if (child.size > 0) {
      // TODO: add some real calcuation for file size
      fileSizeZellValue.innerText = `${child.size} KB`;
    }

    fileRow.appendChild(nameCellValue);
    fileRow.appendChild(dateModifiedCellValue);
    fileRow.appendChild(fileSizeZellValue);

    fileRowGroup.appendChild(fileRow);

    parentEl.appendChild(fileRowGroup);
  });
};

export function ExplorerDetails() {
  const detailsTableEl = document.createElement("div");
  detailsTableEl.className = `${EXPLORER_DETAILS_TABLE} table table-auto w-full`;

  const detailsContent = fileSystemExplorerStore.getFilesByActiveDir();

  if (detailsContent) {
    detailsTableEl.innerHTML = `
      <div class="fse-explorer-row__header table-header-group">
        <div class="table-row">
          <div class="table-cell text-left py-3 px-9">Name</div>
          <div class="table-cell text-left py-3">Date Modifed</div>
          <div class="table-cell text-left py-3">File Size</div>
        </>
      </div>
     `;

    createFileRows(detailsContent, detailsTableEl);
  }

  const explorerDetailsContainer = document.createElement("div");
  explorerDetailsContainer.appendChild(detailsTableEl)

  return explorerDetailsContainer;
}
