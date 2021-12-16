import React from "react";

import styles from "./main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <video width="100%" height="100%" autoplay="autoplay" muted loop="true">
        <source
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4"
          type="video/mp4"
        />
      </video>
      <div className={styles.logo}>
        <img src="https://www.nvidia.com/content/dam/en-zz/Solutions/GeForce/Pascal/esports/dota2/geforce-esports-dota2-intl-logo-297-dtm@2x.png"></img>{" "}
      </div>
      <div className={styles.link}>
        <a href="https://www.dota2.com/home" target="_blank">
          Click To Play
        </a>
      </div>
    </div>
  );
};

export default Main;
