import { useEffect } from "react";
import { socket } from "./socket";
import { Stage, Sprite } from "@pixi/react";
import { useKeyPress } from "./hooks/useKeyPress";
import { useSocketSene } from "./hooks/useSocketScene";

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

function App() {
  const { isKeyPressed, key } = useKeyPress();
  const scene = useSocketSene();

  useEffect(() => {
    if (key && isKeyPressed) {
      socket.emit("key-pressed", key);
    }
  }, [key, isKeyPressed]);

  return (
    <div>
      <div className="">
        <Stage
          className="mx-auto mt-24"
          options={{ background: 0x1099bb }}
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
        >
          <Sprite
            scale={0.3}
            image="https://pixijs.com/assets/flowerTop.png"
            x={scene?.player.x || 100}
            y={scene?.player.y || 100}
          />
          <Sprite
            scale={0.3}
            image="https://pixijs.com/assets/eggHead.png"
            x={scene?.enemy.x || STAGE_WIDTH - 100}
            y={scene?.enemy.y || STAGE_HEIGHT - 100}
          />
        </Stage>
      </div>
    </div>
  );
}

export default App;
