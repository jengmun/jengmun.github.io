import React, { useContext } from "react";
import TeamRow from "../components/teams/TeamRow";
import TeamContext from "../context/team-context";
import styles from "./Teams.module.css";

const Teams = () => {
  const teamContext = useContext(TeamContext);

  const teams = teamContext.filteredTeamData.map((team, index) => {
    return <TeamRow rank={index + 1} data={team}></TeamRow>;
  });

  return (
    <div className={styles.table}>
      <table>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Rating</th>
          <th>Wins</th>
          <th>Losses</th>
        </tr>
        {teams}
      </table>
    </div>
  );
};

export default Teams;
