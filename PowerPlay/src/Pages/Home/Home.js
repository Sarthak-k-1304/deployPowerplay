import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../../Context";
import ProfileImage from "../../../public/10946073.jpg";
import { service } from "../../appwrite/config";

export function Home() {
  let navigate = useNavigate();
  const { updateUsername, setImage } = useAppContext();
  const [error, setError] = useState("");
  const [localname, setLocalname] = useState("");

  const ValidateUser = (name) => {
    if (name === "") return "username need to be entered";
    else if (!/^[A-Z][a-zA-Z]*$/.test(name))
      return "Username must start with a capital letter and contain only letters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = ValidateUser(localname);
    if (validationError) setError(validationError);
    else {
      if (localname) {
        const response = await service.checkUser(localname);
        if (response) {
          const img = await service.getUserImage(localname);
          console.log(img);
          setImage(img || ProfileImage);
        } else {
          service.createUser({ UserName: localname, theme: false });
          setImage(localStorage.getItem(`image_${localname}`) || ProfileImage);
        }
        updateUsername(localname);
        localStorage.setItem("userName", localname);
        navigate("games");
      }
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <div className={styles.intro}>
          Best Place To Enjoy
          <br />
          Online Games
        </div>
        <div className={styles.formwrap}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputerror}>
              <input
                type="text"
                className={styles.input}
                placeholder="Username"
                value={localname}
                onChange={(e) => {
                  setError(ValidateUser(e.target.value));
                  setLocalname(e.target.value);
                }}
              ></input>
              {error && (
                <div style={{ paddingLeft: "1rem", color: "red" }}>{error}</div>
              )}
            </div>
            <button className={styles.btn}>
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
