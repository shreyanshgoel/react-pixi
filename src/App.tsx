import { Stage } from "@pixi/react";
import "@pixi/events";

import GraphicDemo from "./examples/GraphicDemo";
import SpriteDemo from "./examples/SpriteDemo/SpriteDemo";
import ErrorBoundary from "./ErrorBoundary";
import Game from "./Game/Game";
import "./App.css";

const config = {
  size: { width: window.innerWidth, height: window.innerHeight },
  spring: { mass: 10, tension: 1000, friction: 100 },
  stage: { antialias: true, backgroundColor: 0x1099bb },
};

const App = () => {
  //   return (
  //     <ErrorBoundary>
  //       <Stage {...config.size} options={config.stage}>
  //         {/* <GraphicDemo /> */}

  //         {/* <SpriteDemo /> */}

  //       </Stage>
  //     </ErrorBoundary>
  //   );

  return (
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  );
};

export default App;
