import { useEffect, useState } from "react";
import { socket } from "../socket";

type Sene = {
  player: {
    x: number;
    y: number;
  };

  enemy: {
    x: number;
    y: number;
  };
};

type GameConfig = {
  playerSpeed: number;
  enemySpeed: number;

  initialPosition: {
    player: {
      x: number;
      y: number;
    };
    enemy: {
      x: number;
      y: number;
    };
  };
};

export function useSocketSene() {
  const [conf, setConf] = useState<GameConfig>({
    playerSpeed: 10,
    enemySpeed: 10,
    initialPosition: {
      player: {
        x: 100,
        y: 100,
      },
      enemy: {
        x: 700,
        y: 500,
      },
    },
  });

  const [scene, setScene] = useState<Sene>({
    player: {
      x: 100,
      y: 100,
    },

    enemy: {
      x: 700,
      y: 500,
    },
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("init", (data: GameConfig) => {
      setConf(data);
    });

    socket.on("seen-update", (data: Sene) => {
      setScene(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("init");
      socket.off("seen-update");
    };
  }, []);

  return { scene, setScene, conf, setConf };
}
