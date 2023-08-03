import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";

export default function SearchBar() {
  return (
    <div className="p-2 px-4 rounded-xl bg-white bg-opacity-10 flex items-center gap-2 w-[50%]">
      <IonIcon icon={search} className={`text-xl text-white text-opacity-50`} />
      <input
        type="text"
        placeholder="Search games"
        className="bg-transparent outline-none w-full text-sm"
      />
    </div>
  );
}
