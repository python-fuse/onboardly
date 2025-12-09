"use client";

import { useState } from "react";
import { FiUsers, FiLogOut, FiHelpCircle } from "react-icons/fi";
import { MdDashboard, MdOutlineTour, MdOutlineAnalytics } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { LuSquareCode } from "react-icons/lu";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-60" : "w-20"
      } transition-all duration-300 h-screen p-5 flex flex-col justify-between`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-green-400 rounded-full"></div>
          {open && (
            <div>
              <h1 className="font-bold text-lg">Guidely</h1>
              <p className="text-xs text-gray-400">Onboarding Tours</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="space-y-4">
          <SidebarItem icon={<MdDashboard />} label="Dashboard" open={open} />
          <SidebarItem
            active
            icon={<MdOutlineAnalytics />}
            label="Analytics"
            open={open}
          />
          <SidebarItem icon={<MdOutlineTour />} label="Tours" open={open} />
          <SidebarItem icon={<FiUsers />} label="Users" open={open} />
          <SidebarItem
            icon={<LuSquareCode />}
            label="Embed Script"
            open={open}
          />
          <SidebarItem icon={<IoMdSettings />} label="Settings" open={open} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        <SidebarItem
          icon={<FiHelpCircle />}
          label="Help & Support"
          open={open}
        />
        <SidebarItem icon={<FiLogOut />} label="Log Out" open={open} />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, open }: any) {
  return (
    <button
      className={`flex items-center gap-3 w-full text-sm 
      transition
      ${
        active ? "bg-purple-700 text-white" : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {open && <span>{label}</span>}
    </button>
  );
}
