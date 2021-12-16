import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TeamContext from "../../context/team-context";
import styles from "./Nav.module.css";

const Search = () => {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const teamContext = useContext(TeamContext);

  useEffect(() => {
    if (searchCriteria.length > 1) {
      const results = teamContext.playerData.filter((player) => {
        return player.name.toLowerCase().includes(searchCriteria.toLowerCase());
      });
      setSearchResults(results);
    } else {
      const results = [];
      setSearchResults(results);
    }
  }, [searchCriteria]);

  const searchResultsDisplay = searchResults.map((result) => {
    return (
      <li>
        {teamContext.filteredTeamData.find((team) => {
          return team.team_id === result.team_id;
        }) ? (
          <NavLink to={`/teams/${result.team_id}/${result.account_id}`}>
            {result.name}
          </NavLink>
        ) : (
          result.name
        )}
      </li>
    );
  });

  return (
    <div className={styles.search}>
      <input
        placeholder="Search"
        onChange={(e) => {
          setSearchCriteria(e.target.value);
        }}
      ></input>

      <ul>{searchResultsDisplay}</ul>
    </div>
  );
};

export default Search;
