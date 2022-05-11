import { useEffect, useState } from "react";
import styles from "../css/account.module.css";

import useMessage from "../hooks/message.hook";

export const ImageUpload = ({ img, id, token }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(img);
  }, [img]);

  const message = useMessage();
  const maxSize = 4194304;

  const getExtension = (filename) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const isImage = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "jpeg":
      case "heic":
      case "png":
      case "bmp":
      case "gif":
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("userId", id);
    fetch("/api/avatar/upload", {
      method: "POST",
      body: data,
      headers: { "auth-token": token },
    })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.error(err);
        message("Something went wrong, try again later");
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (isImage(file.name)) {
      if (file.size < maxSize) {
        setImage(URL.createObjectURL(file));
        handleSubmit(file);
      } else message("Maximum file size is 4mb");
    } else message("Supported formats: jpg, png, bmp, gif, jpeg");
  };

  return (
    <form>
      <div className={styles.elipse3}>
        <input
          className={styles.fileInput}
          onChange={handleChange}
          name="avatar"
          id="fileInput"
          type="file"
        />
        <div className={styles.imgPreview}>
          <img src={image} style={{ objectFit: "cover" }} alt="avatar" />
        </div>
      </div>
    </form>
  );
};
