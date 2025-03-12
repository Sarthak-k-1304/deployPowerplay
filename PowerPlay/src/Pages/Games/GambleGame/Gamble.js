import { useEffect, useState } from "react";
import styles from "./Gamble.module.scss";
import { service } from "../../../appwrite/config";
import { conf } from "../../../conf";
import { useAppContext } from "../../../Context";
const matrix = [
  ["H", "M", "H"],
  ["M", "H", "M"],
  ["T", "H", "M"],
  ["T", "M", "T"],
];

export function Gamble() {
  const [cellscolor, setcellsColor] = useState({});
  const [counts, setCounts] = useState({ green: 0, yellow: 0, red: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);
  const { userName } = useAppContext();
  const saveToDatabase = () => {
    const result = {
      Game: "Gamble", // String
      Won: won, // Integer
      Lost: lost, // Integer
      Date: new Date().toISOString(), // String or DateTime
      UserId: userName, // String
    };
    service.createRow(result);
  };

  useEffect(() => {
    let showAlert = false;

    if (counts["green"] === 3 || counts["red"] === 3) {
      setGameOver(true);
      showAlert = true;
    }

    if (showAlert) {
      if (counts["green"] === 3) {
        setWon((won) => won + 1);
        saveToDatabase();
        alert("You won");
      } else {
        setLost((lost) => lost + 1);
        saveToDatabase();
        alert("You lost");
      }
      console.log("Appwrite URL:", conf.appwriteUrl);
      console.log("Project ID:", conf.appwriteProjectID);
      console.log("Database ID:", conf.appwriteDatabaseID);
      console.log("Collection ID:", conf.appwriteCollectionID);
    }
  }, [counts, gameOver]);

  //   useEffect(() => {
  //     if (counts["green"] === 3 || counts["red"] === 3) {
  //       console.log("hello");
  //       setGameOver((prev) => true);
  //     }

  //     return () => {
  //       if (gameOver) {
  //         if (counts["green"] === 3) {
  //           alert("You won");
  //         } else {
  //           alert("You lost");
  //         }
  //       }
  //     };
  //   }, [counts, gameOver]);

  const getColor = (type) => {
    if (type === "H") return "green";
    else if (type === "M") return "red";
    else return "yellow";
  };

  const handleColor = (colindx, rowindx, type) => {
    setcellsColor((prev) => {
      if (prev[`${colindx}-${rowindx}`]) return prev;
      const color = getColor(type);
      setCounts((counts) => {
        return { ...counts, [color]: counts[color] + 1 };
      });
      return { ...prev, [`${colindx}-${rowindx}`]: color };
    });
  };

  const handleClick = (e) => {
    if (gameOver) return;
    const cell = e.target;
    console.log(e.target);
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const type = matrix[row][col];
    handleColor(col, row, type);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} onClick={handleClick}>
        {matrix.map((col, colindx) => (
          <div className={styles.col} key={colindx}>
            {col.map((row, rowindx) => (
              <div
                className={styles.cell}
                key={`${colindx}-${rowindx}`}
                data-col={colindx}
                data-row={rowindx}
                //onClick={() => handleColor(colindx, cellindx, cell)}
                style={{
                  backgroundColor:
                    cellscolor[`${colindx}-${rowindx}`] || "white",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
