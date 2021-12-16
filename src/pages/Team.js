import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, Route } from "react-router-dom";
import TeamContext from "../context/team-context";
import Player from "./Player";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";
import styles from "./Team.module.css";

const Team = (props) => {
  const params = useParams();
  const teamContext = useContext(TeamContext);
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const teamData =
    teamContext.filteredTeamData.length !== 0
      ? teamContext.filteredTeamData.find((team) => {
          return team.team_id == params.team;
        })
      : [];

  const rank =
    teamContext.filteredTeamData.length !== 0
      ? teamContext.filteredTeamData.findIndex(({ team_id }) => {
          return team_id == params.team;
        }) + 1
      : 0;

  const fetchMembersData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMembersData(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (teamData.length !== 0) {
      const url = `https://api.opendota.com/api/teams/${teamData.team_id}/players`;
      fetchMembersData(url);
    }
  }, [teamData]);

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : teamContext.filteredTeamData.length !== 0 ? (
        <>
          <div className={styles.head}>
            <img src={teamData.logo_url}></img>
            <div>
              <h1>
                <NavLink to={`/teams/${teamData.team_id}`}>
                  {teamData.name}
                </NavLink>
              </h1>
              <h3>RANK: {rank}</h3>
            </div>
          </div>

          <Route exact path="/teams/:team">
            <div className={styles.members}>
              <div className={styles.current}>
                <div className={`${styles.currentHeader} ${styles.header}`}>
                  <span>Current Members</span>
                </div>
                <div className={styles.memberContainer}>
                  <ol>
                    {membersData.map((member) => {
                      return member.is_current_team_member === true &&
                        member.name !== " " &&
                        member.name !== "" &&
                        member.name !== null ? (
                        <li>
                          <NavLink
                            to={`/teams/${teamData.team_id}/${member.account_id}`}
                          >
                            {member.name}
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className={styles.former}>
                <div className={`${styles.formerHeader} ${styles.header}`}>
                  <span>Former Members</span>
                </div>
                <div className={styles.memberContainer}>
                  <ol>
                    {membersData.map((member) => {
                      return member.is_current_team_member !== true &&
                        member.name !== " " &&
                        member.name !== "" &&
                        member.name !== null ? (
                        <li>
                          <NavLink
                            to={`/teams/${teamData.team_id}/${member.account_id}`}
                          >
                            {member.name}
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>{" "}
          </Route>
          <Route path="/teams/:team/:player">
            <Player
              bookmarks={props.bookmarks}
              setBookmarks={props.setBookmarks}
            ></Player>
          </Route>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Team;
