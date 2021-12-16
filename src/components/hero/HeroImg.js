import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./HeroImg.module.css";

const HeroImg = (props) => {
  let attribute = "";

  switch (props.attr) {
    case "str":
      attribute = (
        <img
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"
          width="32px"
        />
      );
      break;
    case "agi":
      attribute = (
        <img
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png"
          width="32px"
        />
      );
      break;
    case "int":
      attribute = (
        <img
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png"
          width="32px"
        />
      );
      break;
  }

  return (
    <div>
      <NavLink
        to={{ pathname: `/heroes/${props.name}`, state: { data: props.data } }}
        // state must be an object
      >
        <div
          className={styles.heroImg}
          style={{
            backgroundImage: `url(https://steamcdn-a.akamaihd.net${props.image})`,
          }}
        >
          <div>
            {attribute}
            <h3>{props.name}</h3>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default HeroImg;
