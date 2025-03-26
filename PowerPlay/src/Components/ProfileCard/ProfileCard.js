import { useNavigate } from "react-router";
import { useAppContext } from "../../Context";
import styles from "./ProfileCard.module.scss";
import { useEffect, useState } from "react";
import { service } from "../../appwrite/config";
export function ProfileCard() {
  const navigate = useNavigate();

  const [showUploadBox, setShowUploadBox] = useState(false);
  const { userName, theme, toggleTheme, image, setImage } = useAppContext();

  const handleThemeChange = () => {
    toggleTheme();
  };

  const goTostats = () => {
    navigate("stats");
  };

  const handleImageClick = () => {
    setShowUploadBox((prev) => !prev);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      console.log("File dropped:", file);

      // previews the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setShowUploadBox(false);
      };
      reader.readAsDataURL(file);

      try {
        await service.uploadImg(file, userName); // Upload the file directly
        const imageUrl = await service.getUserImage(userName); // Fetch the uploaded image
        localStorage.setItem(`image_${userName}`, imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setShowUploadBox(false);
      };
      reader.readAsDataURL(file);

      try {
        await service.uploadImg(file, userName); // Upload the file directly
        const imageUrl = await service.getUserImage(userName); // Fetch the uploaded image
        localStorage.setItem(`image_${userName}`, imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.detailbox}>
        <div className={styles.imgbox}>
          <img
            src={image}
            alt="Profile"
            className={styles.profileimg}
            onClick={handleImageClick}
          ></img>
          <div className={styles.editIcon} onClick={handleImageClick}>
            ✏️
          </div>
        </div>
        <div className={styles.namebox}>
          <h1>{userName}</h1>
          <p>Gamer</p>
        </div>
      </div>
      <hr />

      {showUploadBox ? (
        <div className={styles.photoupload}>
          <div className={styles.uploadbox}>
            <div
              className={styles.dropper}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              Drag & Drop image here
            </div>
            <hr />
            <div className={styles.uploader}>
              <input type="file" accept="image/*" onChange={handleFileSelect} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.themebox}>
          <div className={styles.optionbox}>
            <p className={styles.theme}>Themes</p>
            <select
              className={styles.themeselector}
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className={styles.buttonbox}>
            <button className={styles.button} onClick={goTostats}>
              Show Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
