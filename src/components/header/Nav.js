import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import Search from "./Search";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <img
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/nav/logo.png"
          alt="logo"
        />
      </NavLink>

      <ul>
        <li>
          <NavLink to="/heroes" activeClassName={styles.active}>
            Heroes
          </NavLink>
        </li>
        <li>
          <NavLink to="/teams" activeClassName={styles.active}>
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink to="/matches" activeClassName={styles.active}>
            Matches
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" activeClassName={styles.active}>
            Watchlist
          </NavLink>
        </li>
      </ul>
      <Search></Search>
    </nav>
  );
};

export default Nav;
