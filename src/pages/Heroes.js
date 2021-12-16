import React, { useEffect, useState } from "react";
import HeroImg from "../components/hero/HeroImg";
import styles from "./Heroes.module.css";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";

const Heroes = () => {
  const [data, setData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("");
  const [filteredDisplay, setFilteredDisplay] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHeroes = async () => {
    const res = await fetch("https://api.opendota.com/api/heroStats");
    const heroesData = await res.json();
    const sortedData = heroesData.sort(function (a, b) {
      const nameA = a.localized_name;
      const nameB = b.localized_name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setData(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchHeroes();
  }, []);

  useEffect(() => {
    setFilteredDisplay(
      data.filter((hero) => {
        return hero.localized_name
          .toLowerCase()
          .includes(filterCriteria.toLowerCase());
      })
    );
  }, [filterCriteria]);

  const displayData = filterCriteria === "" ? data : filteredDisplay;

  return (
    <div className={styles.heroes}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <input
            placeholder="Hero Name"
            onChange={(e) => {
              setFilterCriteria(e.target.value);
            }}
          ></input>
          <div className={styles.container}>
            {displayData.map((hero) => {
              return (
                <HeroImg
                  name={hero.localized_name}
                  image={hero.img}
                  attr={hero.primary_attr}
                  data={hero}
                ></HeroImg>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

/* should only nest routes if you want the parent route to still be visible */

export default Heroes;
