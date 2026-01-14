"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/players", label: "Players" },
  { href: "/matches", label: "Matches" },
  { href: "/stats", label: "Stats" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-black text-white">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3">
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25">
    <img
      src="/kingsmenlogo.jpeg"
      alt="Kingsmen FC Logo"
      className="w-7 h-7 object-contain"
    />
  </span>

  <span className="text-xl font-bold">Kingsmen FC</span>
</Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6">
  {links.map((link) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        className={
          isActive
            ? "text-blue-400 font-semibold"
            : "hover:text-gray-300"
        }
      >
        {link.label}
      </Link>
    );
  })}
</div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-2">
          {links.map((link) => {
  const isActive = pathname === link.href;

  return (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setOpen(false)}
      className={
        isActive
          ? "rounded-lg px-3 py-2 bg-white/10 text-blue-300 font-semibold"
          : "rounded-lg px-3 py-2 hover:bg-white/10 transition"
      }
    >
      {link.label}
    </Link>
  );
})}
       </div>
      </div>
    </header>
  );
}
