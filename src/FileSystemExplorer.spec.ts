import { beforeAll, describe, expect, it } from "vitest";
import { FileSystemExplorerApp } from "./components/FileSystemExplorer";
import { fileSystemExplorerStore } from "./store/fileSystemExplorerStore";

describe("FileSystemExploreStore", () => {
  beforeAll(async () => {
    await fileSystemExplorerStore.fetchFileExploreContents();
  });

  it("<FileSystemExplorerApp />", async () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    FileSystemExplorerApp(element);

    const explorePanel = document.querySelector(".fse-explorer__panel");

    expect(explorePanel).toBeTruthy();
    expect(explorePanel?.children.length).toEqual(1);


    const detailsTable = document.querySelector(".fse-explorer__details");
    expect(detailsTable).toBeTruthy();
    expect(detailsTable?.children.length).toEqual(6);
  });
});
