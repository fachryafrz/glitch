import { Link } from "react-router-dom";
import data from "../json/navbar.json";
import { useState, useEffect } from "react";
import * as Icons from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function Navbar() {
  const [navIcons, setNavIcons] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [socialIcons, setSocialIcons] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getIcons = () => {
      setNavIcons(data.links.map((item) => Icons[item.icon]));
      setSocialIcons(data.socials.map((item) => Icons[item.icon]));
    };

    window.addEventListener("scroll", function () {
      if (window.scrollY >= 25) {
        setIsScrolled(true);
      } else if (window.scrollY < 25) {
        setIsScrolled(false);
      }
    });

    getIcons();
  }, []);

  return (
    <nav
      className={`md:container mx-auto grid grid-cols-[1fr_auto_1fr] p-4 xl:px-24 gap-4 sticky top-0 z-50 transition-all duration-300 backdrop-blur ${
        isScrolled && `bg-primary-bg bg-opacity-90`
      }`}
    >
      <button
        onClick={() => setActive(!active)}
        className={`grid place-items-center max-w-fit aspect-square lg:hidden`}
      >
        <IonIcon
          icon={active ? Icons.closeOutline : Icons.menuOutline}
          className={`text-3xl`}
        />
      </button>
      <ul
        className={`${
          active ? `flex` : `hidden`
        } lg:!flex gap-12 place-self-start absolute top-full left-0 flex-col lg:flex-row bg-primary-bg h-fit lg:static p-8 pl-4 ml-4 lg:ml-0 lg:p-0 lg:h-full lg:items-center lg:bg-transparent`}
      >
        {data.links.map((item, i) => {
          return (
            <li key={i}>
              <Link
                to={item.url}
                className={`opacity-50 hocus:opacity-100 flex items-center gap-1`}
              >
                <IonIcon icon={navIcons[i]} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to={"/"}>
        <img src={`/logo.svg`} alt={`GameCove`} className={`w-10`} />
      </Link>
      <ul className={`hidden md:flex items-center justify-end h-full gap-4`}>
        {data.socials.map((item, i) => {
          return (
            <li key={i}>
              <Link
                to={item.url}
                className={`flex opacity-50 hocus:opacity-100`}
              >
                <IonIcon icon={socialIcons[i]} className={`text-2xl`} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
