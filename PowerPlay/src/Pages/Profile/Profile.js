import { ProfileCard } from "../../Components";
import styles from "./Profile.module.scss";
export function Profile() {
  return (
    <div className={styles.profile}>
      <ProfileCard />
    </div>
  );
}
