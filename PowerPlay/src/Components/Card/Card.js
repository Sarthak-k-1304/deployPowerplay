import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { TbGoGame } from "react-icons/tb";
import styles from "./Card.module.scss";
export function Card({ name, playertype, intro, path }) {
  let navigate = useNavigate();
  const openGame = () => {
    navigate(`${path}`);
  };
  return (
    <div className={styles.card} onClick={openGame}>
      <div className={styles.content}>
        <h1 className={styles.name}>{name}</h1>
        <hr />
        <p className={styles.playertype}>{playertype}</p>
        <p className={styles.intro}>{intro}</p>
      </div>
      <div className={styles.action}>
        <div className={styles.navigate}>
          <FaArrowRight />
        </div>
        <div>
          <TbGoGame />
        </div>
      </div>
    </div>
  );
}
