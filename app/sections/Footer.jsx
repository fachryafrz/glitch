"use client";

import footer from "../json/footer.json";
import { IonIcon } from "@ionic/react";
import * as Icons from "ionicons/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const createdYear = 2023;
  const copyrightYear =
    createdYear === currentYear ? createdYear : `${createdYear}-${currentYear}`;

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
      className={`max-w-7xl mx-auto p-4 pb-0 pt-[5rem] grid grid-cols-2 lg:grid-cols-7 gap-8`}
    >
      <section className={`col-span-full lg:col-span-2`}>
        <Link
          href={`/`}
          className={`flex items-center justify-center lg:justify-start gap-4 max-w-fit mx-auto lg:mx-0`}
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
          className={`my-2 flex items-center justify-center lg:justify-start gap-4`}
        >
          {footer
            .find((footer) => footer.section === "Social")
            .links.map((link, i) => {
              return (
                <li key={i}>
                  <Link
                    href={link.url}
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

        <div className={`flex flex-col text-sm text-center lg:text-start`}>
          <span>GameCove &copy; {copyrightYear} all rights reserved</span>
          <span>
            Powered by{" "}
            <Link
              href={`http://rawg.io`}
              target={`_blank`}
              className={`hocus:text-primary-yellow`}
            >
              RAWG API
            </Link>
          </span>
        </div>
      </section>
      {footer.map((footer, i) => {
        return (
          <section key={i}>
            <h2 className={`opacity-50 mb-2`}>{footer.section}</h2>

            <ul>
              {footer.links.map((link, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={link.url}
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
