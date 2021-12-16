import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import TeamContext from "../context/team-context";
import styles from "./Hero.module.css";

const Hero = () => {
  const location = useLocation();
  const { data } = location.state;
  const teamContext = useContext(TeamContext);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState();

  const baseAttribute =
    data.primary_attr.toLowerCase() === "str"
      ? {
          attribute: data.base_str,
          img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png",
          attributeName: "strength",
        }
      : data.primary_attr.toLowerCase() === "agi"
      ? {
          attribute: data.base_agi,
          img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png",
          attributeName: "agility",
        }
      : {
          attribute: data.base_int,
          img: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png",
          attributeName: "intelligence",
        };

  const handleSkillsData = () => {
    const skillsArr = [];
    for (const key in teamContext.skillsData) {
      if (key.startsWith(data.name.slice(14))) {
        if (
          !skillsArr.find(
            (skill) => skill.dname === teamContext.skillsData[key]["dname"]
          ) &&
          !teamContext.skillsData[key]["behavior"].includes("Hidden")
        ) {
          skillsArr.push({ ...teamContext.skillsData[key], key });
        }
      }
    }
    setSkills(skillsArr);
  };

  useEffect(() => {
    handleSkillsData();
  }, [teamContext.skillsData]);

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.attribute}>
              <img src={baseAttribute.img} width="30px"></img>
              <p>{baseAttribute.attributeName}</p>
            </div>
            <h1>{data.localized_name}</h1>
            <div className={styles.attackType}>
              <h4>ATTACK TYPE</h4>
              <p>{data.attack_type}</p>
            </div>
          </div>
          <img
            src={`https://steamcdn-a.akamaihd.net${data.img}`}
            id={styles.avatar}
          ></img>
        </div>
        <div className={styles.stats}>
          <ul id={styles.attr}>
            <li>
              <img
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"
                width="30px"
              />
              <span>{data.base_str}</span>
            </li>
            <li>
              <img
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png"
                width="30px"
              />
              <span>{data.base_agi}</span>
            </li>
            <li>
              <img
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png"
                width="30px"
              />
              <span>{data.base_int}</span>
            </li>
            <h4>ATTRIBUTES</h4>
          </ul>

          <ul>
            <li>
              Base Attack:
              <span>
                {`
            ${data.base_attack_min + baseAttribute.attribute} - 
            ${data.base_attack_max + baseAttribute.attribute}`}
              </span>
            </li>
            <li>
              Attack Rate: <span>{data.attack_rate}</span>
            </li>
            <li>
              Attack Range: <span>{data.attack_range}</span>
            </li>
            {data.projectile_speed !== 0 && (
              <li>
                Projectile Speed: <span>{data.projectile_speed}</span>
              </li>
            )}
            <h4>ATTACK</h4>
          </ul>

          <ul>
            <li>
              Base Armour:{" "}
              <span>
                {Math.round((data.base_armor + data.base_agi / 6) * 10) / 10}
              </span>
            </li>
            <li>
              Magic Resistance: <span>{data.base_mr}%</span>
            </li>
            <h4>DEFENSE</h4>
          </ul>

          <ul>
            <li>
              Movement Speed: <span>{data.move_speed}</span>
            </li>
            <h4>MOBILITY</h4>
          </ul>

          <ul>
            {data.roles.map((role) => {
              return (
                <li>
                  <span>{role}</span>
                </li>
              );
            })}
            <h4>ROLES</h4>
          </ul>
        </div>
        <div className={styles.skills}>
          <ul>
            {skills.map((skill) => {
              return (
                <>
                  <li
                    onClick={() => {
                      setSelectedSkill(skill);
                    }}
                  >
                    <img
                      src={`https://cdn.cloudflare.steamstatic.com${skill.img}`}
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src =
                          "https://i.pinimg.com/originals/27/ff/39/27ff3902c1363a776c9db6ee6f7d76d8.jpg";
                      }}
                    ></img>
                  </li>
                </>
              );
            })}
          </ul>

          <div>
            {selectedSkill === undefined ? (
              skills.length !== 0 ? (
                <>
                  <h1>
                    {skills[0].dname
                      ? skills[0].dname
                      : skills[0].key.slice(data.localized_name.length)}
                  </h1>
                  <p>{skills[0].desc}</p>
                </>
              ) : (
                ""
              )
            ) : (
              <>
                <h1>
                  {selectedSkill.dname
                    ? selectedSkill.dname
                    : selectedSkill.key
                        .slice(data.localized_name.length + 1)
                        .replaceAll("_", " ")}
                </h1>
                <p>{selectedSkill.desc}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
