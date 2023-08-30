"use client";

import data from "../json/navbar.json";
import { useState, useEffect, useRef } from "react";
import * as Icons from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [navIcons, setNavIcons] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [socialIcons, setSocialIcons] = useState([]);
  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef();
  const router = useRouter();
  const pathname = usePathname();

  const isSearchPage = pathname.startsWith(`/search`);

  const handleSearchInput = (e) => {
    e.preventDefault();

    setSearchQuery(e.target.value);
  };

  const handleClearInput = (e) => {
    e.preventDefault();

    setSearchQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery) {
      return;
    }

    router.push(`/search?query=${searchQuery.replace(/\s+/g, "+")}`);
  };

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
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur ${
        isScrolled && `bg-primary-bg bg-opacity-90`
      }`}
    >
      <div
        className={`md:container mx-auto grid grid-cols-3 lg:flex items-center p-4 xl:px-36 gap-4 lg:gap-8 `}
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
        <Link href={"/"} className={`flex mx-auto lg:mx-0`}>
          <img src={`/logo.svg`} alt={`GameCove`} className={`w-10`} />
        </Link>
        <ul
          className={`${
            active ? `flex` : `hidden`
          } lg:!flex gap-12 place-self-start absolute top-full left-0 flex-col lg:flex-row bg-primary-bg h-fit lg:static p-8 pl-4 ml-4 lg:ml-0 lg:p-0 lg:place-self-auto lg:h-full lg:items-center lg:bg-transparent`}
        >
          {data.links.map((item, i) => {
            return (
              <li key={i}>
                <Link
                  href={item.url}
                  className={`opacity-50 hocus:opacity-100 flex items-center gap-1`}
                >
                  <IonIcon icon={navIcons[i]} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={`/search`}
          className={`flex max-w-fit aspect-square lg:hidden justify-self-end`}
        >
          <IonIcon icon={Icons.searchOutline} className={`text-2xl`} />
        </Link>

        {!isSearchPage && (
          <form
            onSubmit={handleSubmit}
            className={`hidden lg:flex items-center ml-auto border-b-2 border-b-white border-opacity-10`}
          >
            <input
              ref={searchRef}
              onChange={handleSearchInput}
              type="text"
              placeholder={`Search games`}
              value={searchQuery && searchQuery}
              className={`w-full bg-transparent placeholder:text-white placeholder:opacity-25`}
            />
            {searchQuery && (
              <button
                type={`button`}
                onClick={handleClearInput}
                className={`flex aspect-square p-2 opacity-50 hocus:opacity-100`}
              >
                <IonIcon icon={Icons.closeOutline} className={`text-xl`} />
              </button>
            )}
            <button
              type={`submit`}
              className={`flex aspect-square p-2 opacity-50 hocus:opacity-100`}
            >
              <IonIcon icon={Icons.searchOutline} className={`text-xl`} />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
