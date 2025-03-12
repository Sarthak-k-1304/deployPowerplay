import { useNavigate, useState } from "react";
import styles from "./Header.module.scss";
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAppContext } from "../../Context";
import ProfileImage from "../../../public/10946073.jpg";
import { useLocation } from "react-router";

function ProfileModal({ isOpen, onClose }) {
  const { theme, toggleTheme, updateUsername, userName, setImage } =
    useAppContext();
  let navigate = useNavigate();

  const goToProfile = () => {
    onClose();
    navigate("/profile");
  };
  const goToStats = () => {
    onClose();
    navigate("/profile/stats");
  };
  const handleLogout = () => {
    onClose();
    updateUsername("");
    if (theme === "dark") toggleTheme();
    localStorage.setItem("userName", "");
    navigate("/");
    setImage(ProfileImage);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerr}>
          <h3>Profile</h3>
        </div>
        <div className={styles.content}>
          <h2>{userName}</h2>
          <button className={styles.option} onClick={goToProfile}>
            Edit Profile
          </button>
          <button className={styles.option} onClick={goToStats}>
            Show Stats
          </button>
        </div>
        <div className={styles.footer}>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { userName, image } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const goToGames = () => {
    if (userName) navigate("/games");
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleback = () => {
    if (location.pathname !== "/games") navigate(-1);
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        {userName && location.pathname !== "/games" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleback}
          >
            <FaArrowAltCircleLeft size={40} />
          </div>
        )}
        <div onClick={goToGames}>PowerPlay</div>
      </div>
      {userName && (
        <img
          src={image}
          className={styles.profileimg}
          onClick={toggleModal}
        ></img>
      )}
      {showModal && <ProfileModal isOpen={showModal} onClose={toggleModal} />}
    </div>
  );
}
