import { useContext } from "react";
import SideBar from "../side-bar/SideBar";
import { AppContext } from "../../context/ContextApp";
export default function Dashboard({mainContent}) {
  const { responsive } = useContext(AppContext);
  return (
    <div className="grid grid-cols-1">
      <SideBar />
      <div className={` ${responsive ? "md:ml-72" : "ml-12"}`}>{mainContent}</div>
    </div>
  );
}
