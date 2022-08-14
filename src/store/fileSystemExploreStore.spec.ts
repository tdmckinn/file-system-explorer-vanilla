import { describe, expect, it } from "vitest";
import { fileSystemExplorerStore } from "./fileSystemExplorerStore";

 describe("FileSystemExploreStore", () => {
  it("fetchFileExploreContents()", async () => {
    await fileSystemExplorerStore.fetchFileExploreContents();


    expect(fileSystemExplorerStore.contents?.children).toBeTruthy()
    expect(fileSystemExplorerStore.contents?.name).toEqual("Files")
    expect(fileSystemExplorerStore.activeFileDir).toEqual("Files")
  });

  it("getFilesByActiveDir()", async () => {
    await fileSystemExplorerStore.fetchFileExploreContents();

    fileSystemExplorerStore.activeFileDir = "Files"
    expect(fileSystemExplorerStore.getFilesByActiveDir().length).toEqual(5)

    fileSystemExplorerStore.activeFileDir = "Documents"
    expect(fileSystemExplorerStore.getFilesByActiveDir().length).toEqual(2)
  });
});
