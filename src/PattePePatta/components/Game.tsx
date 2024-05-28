import { Container } from "@pixi/react-animated";
import { a, useSprings } from "react-spring";
import _ from "lodash";

import constants from "../constants";
import Card from "./Card";
import Button from "./Button";

const Game = ({ textures }) => {
  const [springs, api] = useSprings(constants.NUMBER_OF_CARDS, (i) => ({
    texture: textures.c2,
    x: i * 0.2,
    scale: [0.3, 0.3],
    y: i * 0.2,
    zIndex: constants.NUMBER_OF_CARDS - i,
    anchor: 0.5,
  }));

  const handle_start_game = () => {
    alert("asdas");
  };

  return (
    <Container sortableChildren={true}>
      {/* Main Deck */}

      <Container x={constants.WIDTH / 2} y={constants.HEIGHT / 2}>
        {_.map(springs, (value: any, key: number) => {
          return <Card key={`item${key}`} card_props={value} />;
        })}
        <Button
          on_click={handle_start_game}
          x={0}
          y={100}
          width={100}
          height={50}
          border_radius={10}
          text="Start"
        />
      </Container>
    </Container>
  );
};

export default Game;
