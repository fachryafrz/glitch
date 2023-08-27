import { Link } from "react-router-dom";
import footer from "../json/footer.json";
import { IonIcon } from "@ionic/react";
import * as Icons from "ionicons/icons";
import { useEffect, useState } from "react";

export default function Footer() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const getIcons = () => {
      setIcons(
        footer
          .find((footer) => footer.section === "Social")
          .links.map((link) => Icons[link.icon])
      );
    };

    getIcons();
  }, []);

  return (
    <footer
      className={`md:container mx-auto p-4 pt-[7rem] xl:px-24 grid grid-cols-2 lg:grid-cols-7 gap-8`}
    >
      <section className={`col-span-full lg:col-span-2`}>
        <Link
          to={`/`}
          className={`flex items-center justify-center lg:justify-start gap-4`}
        >
          <figure
            style={{ background: `url(/logo.svg)` }}
            className={`aspect-square w-[40px]`}
          ></figure>
          <span
            className={`after:content-['GameCove'] after:text-2xl after:font-bold`}
          ></span>
        </Link>
        <p className={`text-center lg:text-start mt-4 max-w-sm mx-auto`}>
          Discover, connect, and play in the gaming paradise of GameCove.
        </p>

        <ul
          className={`mt-4 flex items-center justify-center lg:justify-start gap-4`}
        >
          {footer
            .find((footer) => footer.section === "Social")
            .links.map((link, i) => {
              return (
                <li key={i}>
                  <Link
                    to={link.url}
                    style={{
                      color: `${link.color}`,
                    }}
                    className={`transition-all hocus:!text-primary-yellow`}
                  >
                    <IonIcon icon={icons[i]} className={`text-2xl`} />
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
      {footer.map((footer) => {
        return (
          <section>
            <h2 className={`opacity-50 mb-2`}>{footer.section}</h2>

            <ul>
              {footer.links.map((link) => {
                return (
                  <li>
                    <Link
                      to={link.url}
                      className={`hocus:tracking-wide hocus:text-primary-yellow transition-all`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
      <hr className={`col-span-full opacity-10`} />
    </footer>
  );
}
