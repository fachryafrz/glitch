import { Link } from "react-router-dom";
import data from "../json/homeNav.json";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";

export default function HomeFilters() {
  return (
    <section name={`filters`} className={`grid grid-cols-3 gap-8`}>
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`py-4 border-b border-white border-opacity-10`}
          >
            <h2 className={`opacity-50 mb-2`}>{item.section}</h2>
            <ul className={`flex items-center gap-8`}>
              {item.filters.map((filter, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={filter.url}
                      className={`whitespace-nowrap font-medium hocus:text-primary-yellow`}
                    >
                      {filter.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className={`py-4 border-b border-white border-opacity-10`}>
        <h2 className={`opacity-50 mb-2`}>Search</h2>
        <div className={`flex items-center`}>
          <input
            type="text"
            placeholder={`For example: Battlefield 5`}
            className={`w-full bg-transparent placeholder:text-white placeholder:opacity-25`}
          />
          <IonIcon icon={searchOutline} className={`text-xl opacity-50`} />
        </div>
      </div>
    </section>
  );
}
