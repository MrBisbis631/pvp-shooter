import { useEffect, useState } from "react";

export type KeysState = {
  keys: Set<string>;
};

export function useKeyPress(onKeyPress?: (e: KeyboardEvent) => void) {
  const [keyPressed, setKeyPressed] = useState<KeysState>({
    keys: new Set(),
  });

  useEffect(() => {
    // Add key to set when key is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      onKeyPress?.(e);

      const newSet = new Set(keyPressed.keys).add(e.key);

      // Prevent opposite directions
      if (e.key === "w") newSet.delete("s");
      if (e.key === "s") newSet.delete("w");
      if (e.key === "a") newSet.delete("d");
      if (e.key === "d") newSet.delete("a");

      setKeyPressed((prev) => ({
        keys: prev.keys.add(e.key),
      }));
    };

    // Remove key from set when key is released
    const handleKeyUp = (e: KeyboardEvent) => {
      const newSet = new Set(keyPressed.keys);
      newSet.delete(e.key);

      setKeyPressed({
        keys: newSet,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyPressed, onKeyPress]);

  return keyPressed;
}
