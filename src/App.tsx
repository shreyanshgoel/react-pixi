import { Stage } from "@pixi/react";
import "@pixi/events";

import GraphicDemo from "./examples/GraphicDemo";
import SpriteDemo from "./examples/SpriteDemo/SpriteDemo";
import ErrorBoundary from "./ErrorBoundary";

const config = {
  size: { width: 800, height: 500 },
  spring: { mass: 10, tension: 1000, friction: 100 },
  stage: { antialias: true, backgroundColor: 0x1099bb },
};

const App = () => {
  return (
    <ErrorBoundary>
      <Stage {...config.size} options={config.stage}>
        {/* <GraphicDemo /> */}

        <SpriteDemo />
      </Stage>
    </ErrorBoundary>
  );
};

export default App;
