import React from "react";
import image from "../../images/loading-spinner.png";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <h1>Loading...</h1>
      <img src={image}></img>
    </div>
  );
};

export default LoadingSpinner;
