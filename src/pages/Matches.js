import React, { useState, useEffect } from "react";
import styles from "./Matches.module.css";

const Matches = () => {
  const [matchData, setMatchData] = useState([]);

  const fetchMatchData = async () => {
    const res = await fetch("https://api.opendota.com/api/proMatches");
    const data = await res.json();
    const filteredData = data.filter((match) => {
      return match.radiant_score !== 0 || match.dire_score !== 0;
    });
    setMatchData(filteredData);
  };

  useEffect(() => {
    fetchMatchData();
  }, []);

  const matches = matchData.map((match) => {
    return (
      <tr className={styles.row}>
        <td>{match.radiant_name || "Radiant"}</td>
        <td>
          <span
            style={
              match.radiant_score > match.dire_score
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {match.radiant_score}
          </span>
          :
          <span
            style={
              match.radiant_score < match.dire_score
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {match.dire_score}
          </span>
        </td>
        <td>{match.dire_name || "Dire"}</td>
        <td>{match.league_name}</td>
      </tr>
    );
  });

  return (
    <div className={styles.container}>
      <table>
        <tr>
          <th>Radiant</th>
          <th>Score</th>
          <th>Dire</th>
          <th>
            League
            <a
              href="https://www.twitch.tv/directory/game/Dota%202"
              target="_blank"
            >
              <img src="https://lh4.googleusercontent.com/proxy/CgYA0EV56qeM92wmgW1O-HsDHKiVkXw4SMfVNOI3r3YZn5IqcGo9is7_9X3MVQnaq5Gc349jo8g4pvcj223n4fQlkLM=w1200-h630-p-k-no-nu" />
            </a>
          </th>
        </tr>
        {matches}
      </table>
    </div>
  );
};

export default Matches;
