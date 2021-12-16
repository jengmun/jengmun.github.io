import React, { useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import TeamContext from "../context/team-context";
import styles from "./Player.module.css";

const Player = (props) => {
  const teamContext = useContext(TeamContext);
  const location = useLocation();

  const params = useParams();

  const data =
    teamContext.playerData.length !== 0
      ? teamContext.playerData.find((player) => {
          return player.account_id == params.player;
        })
      : "";

  return (
    <>
      {data !== "" ? (
        <div className={styles.background}>
          <div className={styles.intermediate}>
            <div className={styles.player}>
              <img src={data.avatar} />
              <div>
                <a href={data.profileurl} target="_blank">
                  {data.name}
                </a>
                <h4>
                  Current Team: <br></br>
                  {teamContext.filteredTeamData.find((team) => {
                    return team.team_id === data.team_id;
                  }) ? (
                    <Link to={`/teams/${data.team_id}`}>{data.team_name}</Link>
                  ) : (
                    data.team_name
                  )}
                </h4>
              </div>
              <button
                onClick={() => {
                  if (
                    !props.bookmarks.find(
                      ({ route }) => route === location.pathname
                    )
                  ) {
                    props.setBookmarks([
                      ...props.bookmarks,
                      {
                        route: location.pathname,
                        image: data.avatar,
                        name: data.name,
                      },
                    ]);
                  } else {
                    props.setBookmarks(
                      props.bookmarks.filter(({ route }) => {
                        return route !== location.pathname;
                      })
                    );
                  }
                }}
              >
                {props.bookmarks.find(
                  ({ route }) => route === location.pathname
                ) ? (
                  <i class="fas fa-bookmark fa-2x"></i>
                ) : (
                  <i class="far fa-bookmark fa-2x"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Player;
