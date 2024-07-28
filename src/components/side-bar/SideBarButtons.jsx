import React from "react";

export default function SideBarButtons({ icon, btnTitle ,show,onClick}) {
  return (
    <button onClick={onClick} className="rounded-md text-black w-full bg-slate-400 transition-al flex items-center justify-between p-2 gap-2">
      <div className="flex items-center gap-2">
        {icon} {show && <span>{btnTitle}</span>}
      </div>
     
    </button>
  );
}
