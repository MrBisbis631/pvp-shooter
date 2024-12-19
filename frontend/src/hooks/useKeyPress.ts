import { useEffect, useState } from "react";

export type KeysState = {
  key?: string | null;
  isKeyPressed: boolean;
}

export function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<KeysState>({
    key: null,
    isKeyPressed: false,
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeyPressed(prev => ({
      ...prev,
      key: e.key,
      isKeyPressed: true,
    }));
  };

  const handleKeyUp = () => {
    setKeyPressed({
      key: null,
      isKeyPressed: false,
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, []);

  return keyPressed;
}
