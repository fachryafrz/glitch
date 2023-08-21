import { Link } from "react-router-dom";
import data from "../json/navbar.json";
import logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <nav className={`container mx-auto flex items-center p-4 gap-8`}>
      <Link to={"/"}>
        <img src={logo} alt={`GameCove`} />
      </Link>

      <ul className={`flex items-center gap-12 text-sm`}>
        {data.links.map((item, i) => {
          return (
            <li key={i}>
              <Link to={item.url} className={`opacity-50 hocus:opacity-100`}>
                {item.name} {i + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
