import { Stage, Sprite, useTick } from "@pixi/react";
import { useKeyPress } from "./hooks/useKeyPress";
import { useSocketSene } from "./hooks/useSocketScene";

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

export function Game() {
  const { scene, setScene, conf } = useSocketSene();
  const { keys } = useKeyPress();

  useTick((delta) => {
    if (keys.size === 0) return;

    const x = Math.max(
      0,
      Math.min(
        STAGE_WIDTH,
        scene.player.x +
          ((keys.has("d") ? conf.playerSpeed : 0) -
            (keys.has("a") ? conf.playerSpeed : 0)) *
            delta *
            (keys.has("s") || keys.has("w") ? 0.7 : 1)
      )
    );

    const y = Math.max(
      0,
      Math.min(
        STAGE_HEIGHT,
        scene.player.y +
          ((keys.has("s") ? conf.playerSpeed : 0) -
            (keys.has("w") ? conf.playerSpeed : 0)) *
            delta *
            (keys.has("d") || keys.has("a") ? 0.7 : 1)
      )
    );

    setScene((prev) => {
      return {
        ...prev,
        player: {
          ...prev.player,
          x,
          y,
        },
      };
    });
  });

  return (
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
  );
}
