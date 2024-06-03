import { Sprite } from "@pixi/react-animated";
import * as PIXI from "pixi.js";
import constants from "../constants";
import { useRef } from "react";

interface Props {
  card_props: any;

  dragging?: boolean;
  handle_play?: () => void;
  api?: any;
  handle_come_back?: () => void;
}

const Card = ({
  card_props,
  dragging = true,
  handle_play,
  api,
  handle_come_back,
}: Props) => {
  const drag_start_pos = useRef({ x: 0, y: 0 });

  const on_drag_start = (event: any) => {
    if (!dragging) {
      return;
    }
    const sprite = event.currentTarget;
    sprite.alpha = 0.5;
    sprite.dragging = true;
    sprite.hitArea = new PIXI.Circle(0, 0, 13250);
    sprite.anchor = { x: 0.5, y: 0.5 };

    drag_start_pos.current = {
      x: sprite.position.x,
      y: sprite.position.y,
    };
  };

  const on_drag_end = (event: any) => {
    if (!dragging) {
      return;
    }
    const sprite = event.currentTarget;
    sprite.alpha = 1;
    sprite.dragging = false;
    sprite.hitArea = null;
    sprite.zIndex = 0;

    const { x, y } = sprite.position;

    api.set({ x, y });

    if (Math.abs(sprite.position.y - drag_start_pos.current.y) > 100) {
      handle_play?.();
    } else {
      handle_come_back?.();
    }
  };

  const on_drag_move = (event: any) => {
    if (!dragging) {
      return;
    }
    const sprite = event.currentTarget;
    if (sprite.dragging) {
      sprite.zIndex = constants.VERY_BIG_ZINDEX;
      sprite.parent.toLocal(event.global, null, sprite.position);
    }
  };

  return (
    <Sprite
      x={0}
      y={0}
      scale={0.16}
      zIndex={0}
      eventMode={"static"}
      onpointerdown={on_drag_start}
      pointerup={on_drag_end}
      pointerupoutside={on_drag_end}
      pointermove={on_drag_move}
      cursor={dragging ? "pointer" : "default"}
      {...card_props}
      //   scale={card_props.scale.to((x, y) => new PIXI.Point(x, y))}
    />
  );
};

export default Card;
