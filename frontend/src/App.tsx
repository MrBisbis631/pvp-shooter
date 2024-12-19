import * as PIXI from "pixi.js";
import { Game } from "./Game";
import { AppProvider } from "@pixi/react";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});

function App() {
  return (
    <div>
      <div className="">
        <AppProvider value={app}>
          <Game />
        </AppProvider>
      </div>
    </div>
  );
}

export default App;
