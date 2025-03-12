import { Card } from "../../Components";
import styles from "./GameCards.module.scss";
const Gameobj = {
  Gamble: {
    name: "Gamble",
    playertype: "Single",
    intro: "Luck Based Game",
    path: "gamble",
  },
  Sudoku: {
    name: "Sudoku",
    playertype: "Single",
    intro: "Time Bound Game",
    path: "sudoku",
  },
  TicTackToe: {
    name: "Tic-Tack-Toe",
    playertype: "Multiplayer",
    intro: "Skill Based Game",
    path: "tictactoe",
  },
};
export function GameCards() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Games</h1>
        <div className={styles.card}>
          {Object.values(Gameobj).map((obj) => (
            <Card
              key={obj.name}
              name={obj.name}
              playertype={obj.playertype}
              intro={obj.intro}
              path={obj.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
