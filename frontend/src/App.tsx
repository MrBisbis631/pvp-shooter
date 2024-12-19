import { useEffect, useState } from "react";
import { Stage, Sprite } from "@pixi/react";

function App() {
  const [count, setCount] = useState(0);

  // init socket io liveners
  useEffect(() => {

  }, []);

  return (
    <div>

        <div className="">
      <Stage className="mx-auto mt-24" options={{background: 0x1099bb}}>

      </Stage>
        </div>
    </div>
  );
}

export default App;
