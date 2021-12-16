import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Bookmarks.module.css";

const Bookmarks = (props) => {
  const bookmarksList = props.bookmarks.map((bookmark) => {
    return (
      <li>
        <NavLink to={bookmark.route}>
          <div style={{ backgroundImage: `url(${bookmark.image})` }}>
            <p>{bookmark.name}</p>
          </div>
        </NavLink>
      </li>
    );
  });

  return (
    <div className={styles.bookmarks}>
      <div>
        <h1>Players</h1>
      </div>
      <ul>{bookmarksList}</ul>
    </div>
  );
};

export default Bookmarks;
