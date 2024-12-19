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
  }
};

export function useSocketSene() {
  const [scene, setScene] = useState<Sene | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("seen-update", (data: Sene) => {
      setScene(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("seen-update");
    };
  }, []);

  return scene;
}
