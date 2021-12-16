import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../pages/Teams.module.css";

const TeamRow = (props) => {
  return (
    <tr className={styles.row}>
      <td>{props.rank}</td>
      <td className={styles.team}>
        <NavLink to={`/teams/${props.data.team_id}`}>
          {props.data.logo_url !== null && <img src={props.data.logo_url} s />}
          <span>{props.data.name}</span>
        </NavLink>
      </td>
      <td>{props.data.rating}</td>
      <td>{props.data.wins}</td>
      <td>{props.data.losses}</td>
    </tr>
  );
};

export default TeamRow;
