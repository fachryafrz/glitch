/* eslint-disable react/prop-types */
import { IonIcon } from "@ionic/react";

export default function NavBtn({ btnIcon }) {
  return (
    <button className="flex aspect-square p-2 rounded-full bg-white bg-opacity-10 max-w-fit">
      <IonIcon icon={btnIcon} className={`text-xl`} />
    </button>
  );
}
