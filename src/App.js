import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import TeamContext from "./context/team-context";
import Nav from "./components/header/Nav";
import Main from "./pages/Main";
import Heroes from "./pages/Heroes";
import Hero from "./pages/Hero";
import Teams from "./pages/Teams";
import Team from "./pages/Team";
import Matches from "./pages/Matches";
import Bookmarks from "./pages/Bookmarks";

function App() {
  const [teamData, setTeamData] = useState([]);
  const [filteredTeamData, setFilteredTeamData] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [skillsData, setSkillsData] = useState({});
  const [bookmarks, setBookmarks] = useState([]);

  const fetchTeamData = async () => {
    try {
      const res = await fetch("https://api.opendota.com/api/teams");
      const data = await res.json();
      const filteredData = data.filter((team) => {
        return team.name !== "";
      });
      setTeamData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerData = async () => {
    try {
      const res = await fetch("https://api.opendota.com/api/proPlayers");
      const data = await res.json();
      setPlayerData(data);
      const filteredData = [];
      for (const team of teamData) {
        if (
          data.find(({ team_id }) => {
            return team_id === team.team_id;
          })
        ) {
          filteredData.push(team);
        }
      }
      setFilteredTeamData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkillsData = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/odota/dotaconstants/master/build/abilities.json"
      );
      const data = await res.json();
      setSkillsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeamData();
    fetchPlayerData();
    fetchSkillsData();
  }, []);

  useEffect(() => {
    fetchPlayerData();
  }, [teamData]);

  return (
    <div>
      <TeamContext.Provider
        value={{ playerData, filteredTeamData, skillsData }}
      >
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/heroes" component={Heroes} />
          <Route path="/heroes/:hero" component={Hero} />
          <Route exact path="/teams" component={Teams} />
          <Route path="/teams/:team">
            <Team bookmarks={bookmarks} setBookmarks={setBookmarks}></Team>
          </Route>
          <Route path="/matches" component={Matches} />
          <Route path="/bookmarks">
            <Bookmarks bookmarks={bookmarks}></Bookmarks>
          </Route>
        </Switch>
      </TeamContext.Provider>
    </div>
  );
}

export default App;
