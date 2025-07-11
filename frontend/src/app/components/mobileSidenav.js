"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  {
    name: "Dashboard",
    href: "/main_dashboard",
    iconPath: "/images/sidebar/dashboardIcon.svg",
  },
  {
    name: "Activity",
    href: "/activity",
    iconPath: "/images/sidebar/activityIcon.svg",
  },
  {
    name: "Customise AI",
    href: "/customiseAI",
    iconPath: "/images/sidebar/customiseAIIcon.svg",
  },
  {
    name: "Subscription Plans",
    href: "/plans",
    iconPath: "/images/sidebar/subscriptionPlansIcon.svg",
  },
  {
    name: "Affiliate Programs",
    href: "/affiliate",
    iconPath: "/images/sidebar/affiliateProgramIcon.svg",
  },
  {
    name: "Help",
    href: "/help",
    iconPath: "/images/sidebar/helpIcon.svg",
  },
];

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        relative
        w-80
        mx-4 my-0
        p-6
        text-white
        flex-shrink-0
        flex flex-col
        overflow-y-auto
        mt-7
      "
    >
      {/* Frosted-glass backdrop */}
      <div
        className="
          absolute inset-0
          bg-black/70 backdrop-blur-sm
          border border-white/20
          rounded-2xl
          pointer-events-none
        "
      />

      {/* Logo */}
      <div className="relative z-10 mb-5 flex items-center justify-center space-x-2">
        <img
          src="/images/sidebar/linkedIcon.svg"
          alt="LinkedIn icon - Connected with LinkedIn"
          className="h-10"
        />
        <div className="text-sm italic">Connected with LinkedIn</div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 space-y-2">
        {navItems.map(({ name, href, iconPath }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-3 rounded-lg px-4 py-2 transition ${
                active ? "bg-white/20 text-white" : "text-gray-200 hover:bg-white/10"
              }`}
            >
              <img src={iconPath} alt={`${name} icon`} className="w-6 h-6" />
              <span className="font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
