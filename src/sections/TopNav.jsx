import { IonIcon } from "@ionic/react";
import {
  basketOutline,
  chevronDown,
  notificationsOutline,
} from "ionicons/icons";
import NavBtn from "../components/NavBtn";
import SearchBar from "../components/SearchBar";

export default function TopNav() {
  return (
    <nav className="flex items-center w-full p-8">
      {/* Searchbar */}
      <SearchBar />

      <div className="flex items-center gap-4 ml-auto">
        {/* Notification */}
        <NavBtn btnIcon={notificationsOutline} />

        {/* Cart */}
        <NavBtn btnIcon={basketOutline} />

        {/* User */}
        <button className="flex items-center gap-2">
          <figure className="border-2 border-primary-orange rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Dean Pearson"
              className="w-9"
            />
          </figure>

          <span className="text-sm font-light">Dean Pearson</span>

          <IonIcon icon={chevronDown} className={`text-sm ml-2`} />
        </button>
      </div>
    </nav>
  );
}
