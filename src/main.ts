import { FileSystemExplorerApp } from "./components/FileSystemExplorer";
import { fileSystemExplorerStore } from "./store/fileSystemExplorerStore";
import "./style.css";
import typescriptLogo from "./typescript.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <header class="fse-header">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a> 
      File System Explorer
    </header>
    <section class="fse-main"></section>
  </div>
`;

async function initApp() {
  await fileSystemExplorerStore.fetchFileExploreContents();

  FileSystemExplorerApp(document.querySelector<HTMLDivElement>(".fse-main")!);
}

initApp();
