import { IonIcon } from "@ionic/react";
import * as Icons from "ionicons/icons";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const navLinks = [
    {
      name: "Store",
      icon: "gameController",
      url: "",
    },
    {
      name: "Library",
      icon: "grid",
      url: "",
    },
    {
      name: "Community",
      icon: "chatboxEllipses",
      url: "",
    },
    {
      name: "Friends",
      icon: "people",
      url: "",
    },
    {
      name: "Settings",
      icon: "settings",
      url: "",
    },
    {
      name: "Help",
      icon: "helpCircle",
      url: "",
    },
  ];

  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const getIcons = () => {
      setIcons(navLinks.map((item) => Icons[item.icon]));
    };

    getIcons();
  }, []);

  return (
    <>
      <aside className="w-full max-w-[250px] p-8 h-screen sticky top-0 flex flex-col gap-12">
        <figure className="w-[120px]">
          <img
            src="https://www.pngmart.com/files/22/Steam-Logo-PNG.png"
            alt="Steam"
          />
        </figure>

        <ul className="[&_ion-icon]:text-xl h-full [&_li:nth-child(5)]:mt-auto flex flex-col">
          {navLinks.map((item, index) => {
            return (
              <li key={index}>
                <a href="" className={`flex items-center gap-4 p-2 w-full`}>
                  <IonIcon icon={icons[index]} />
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 p-4 py-6 border-r-2 border-t-2 border-opacity-20 border-white rounded-2xl max-w-fit bg-white bg-opacity-5 backdrop-blur [&_*]:opacity-75">
          <span className="text-xs">
            Friend chat <br /> and Groups
          </span>
          <IonIcon icon={Icons.add} className={`text-xl`} />
        </div>
      </aside>
    </>
  );
}
