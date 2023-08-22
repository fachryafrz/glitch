import { Link } from "react-router-dom";
import data from "../json/navbar.json";
import { useState, useEffect } from "react";
import * as Icons from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function Navbar() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const getIcons = () => {
      setIcons(data.links.map((link) => Icons[link.icon]));
    };

    getIcons();
  }, []);

  return (
    <nav
      className={`container mx-auto grid grid-cols-[1fr_auto_1fr] p-4 lg:px-24 gap-4 bg-primary-bg bg-opacity-90 backdrop-blur sticky top-0 z-50`}
    >
      <ul className={`flex items-center gap-12 place-self-start h-full`}>
        {data.links.map((item, i) => {
          return (
            <li key={i}>
              <Link
                to={item.url}
                className={`opacity-50 hocus:opacity-100 flex items-center gap-1`}
              >
                <IonIcon icon={icons[i]} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to={"/"}>
        <img src={`/logo.svg`} alt={`GameCove`} className={`w-10`} />
      </Link>
    </nav>
  );
}
