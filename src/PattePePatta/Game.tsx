import { Container } from "@pixi/react-animated";
import _ from "lodash";

import constants from "./constants";
import Card from "./components/Card";
import Button from "./components/Button";
import useGame from "./useGame";

const Game = ({ textures }) => {
  const {
    handle_shuffle_deck,
    handle_start_game,
    is_game_started,
    springs,
    turn,
    handle_shuffle_my_cards,
    handle_play,
  } = useGame({ textures });

  return (
    <Container sortableChildren={true}>
      {/* Main Deck */}

      {_.map(springs, (value: any, key: number) => {
        return <Card key={`item${key}`} card_props={value} />;
      })}

      <Container x={constants.WIDTH / 2} y={constants.HEIGHT / 2}>
        {!is_game_started && (
          <>
            <Button
              on_click={handle_start_game}
              x={0}
              y={100}
              width={100}
              height={30}
              border_radius={10}
              text="Start"
            />
            <Button
              on_click={handle_shuffle_deck}
              x={0}
              y={140}
              width={100}
              height={30}
              border_radius={10}
              text="Shuffle"
            />
          </>
        )}
      </Container>

      {turn && (
        <>
          <Button
            on_click={handle_play}
            x={80}
            y={turn === constants.BOTTOM_PLAYER ? constants.HEIGHT - 100 : 50}
            width={80}
            height={30}
            border_radius={10}
            text="Play"
          />
          <Button
            on_click={handle_shuffle_my_cards}
            x={80}
            y={turn === constants.BOTTOM_PLAYER ? constants.HEIGHT - 50 : 100}
            width={80}
            height={30}
            border_radius={10}
            text="Shuffle"
          />
        </>
      )}
    </Container>
  );
};

export default Game;
