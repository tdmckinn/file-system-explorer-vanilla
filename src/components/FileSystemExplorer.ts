import { ExplorerPanel } from "./ExplorerPanel/ExplorerPanel";
import { ExplorerDetails } from "./ExplorerDetails/ExplorerDetails";

import "./style.css";

export function FileSystemExplorerApp(element: HTMLDivElement) {
  element.appendChild(ExplorerPanel());
  element.appendChild(ExplorerDetails());
}
