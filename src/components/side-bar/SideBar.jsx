import { useContext, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SideBarButtons from "./SideBarButtons";
import { AppContext } from "../../context/ContextApp";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const { responsive, setResponsive } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(!show);
    setResponsive(!responsive);
  };

  return (
    <aside
    style={{background:'#1A1A1A' ,zIndex:'1000'}}
      className={`fixed left-0 h-screen transition-all ease-in-out ${
        show ? "w-72 p-2" : "w-12 p-0"
      } flex flex-col`}
    >
      <nav className="mt-2 p-2 flex justify-between items-center text-white">
        {show && <h1>Admin Dashboard</h1>}
        <button
          onClick={handleClose}
          className="bg-slate-800 w-8 h-7 transition-all rounded-md ease-in-out flex justify-center items-center hover:bg-slate-400 hover:text-black"
        >
          {show ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </nav>
      <div className="p-2 mt-6 flex flex-col gap-4">
        <NavLink to='/'>
        <SideBarButtons
          icon={<LuLayoutDashboard />}
          show={show}
          btnTitle="Post List"
        />
        </NavLink>
      
      </div>
      <div
        className={`text-white border-t border-slate-800 flex items-center gap-3 ${
          show ? "p-2" : "p-2"
        } mt-auto`}
      >
        <h1
          className={`bg-slate-700 cursor-pointer ${
            !show && "rotate-[360deg] duration-500"
          } w-10 text-center p-1`}
        >
          MP
        </h1>
        {show && (
          <div>
            <h2>Minal Pariyar</h2>
            <h3>mystick14minal@gmail.com</h3>
          </div>
        )}
      </div>
    </aside>
  );
}
