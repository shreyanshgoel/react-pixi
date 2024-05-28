import _ from "lodash";
import { useEffect, useState } from "react";
import { Assets } from "@pixi/assets";

import img_c2 from "../assets/deck/2C.svg";
import { Stage } from "@pixi/react";
import Game from "./components/Game";
import constants from "./constants";

const config = {
  size: { width: constants.WIDTH, height: constants.HEIGHT },
  stage: { antialias: true, backgroundColor: 0x1099bb },
};

const PattePePatta = () => {
  const [textures, setTextures] = useState<any>({});

  // load textures
  useEffect(() => {
    (async () => {
      const { c2 } = await Assets.load([
        {
          alias: "c2",
          src: img_c2,
        },
      ]);

      setTextures({ c2 });
    })();
  }, []);

  if (_.isEmpty(textures)) {
    return null;
  }

  return (
    <div style={{ width: "100%", background: "black" }}>
      <div style={{ margin: "0 auto", width: constants.WIDTH }}>
        <Stage {...config.size} options={config.stage}>
          <Game textures={textures} />
        </Stage>
      </div>
    </div>
  );
};

export default PattePePatta;
