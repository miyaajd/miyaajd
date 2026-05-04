"use client";

import React from "react";
import Link from "next/link";

type NavProps = {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
};
function Nav({ isOpen, isClosing, onClose }: NavProps) {
  const navStateClass =
    isOpen && !isClosing ? "nav-open" : isClosing ? "nav-closing" : "nav-close";
  return (
    <div
      className={`nav ${navStateClass}`}
    >
      <nav className="h-full flex flex-col justify-center items-center">
        <Link href="/about" onClick={onClose} className="menu-link">
          ABOUT <span className="font-light">(&nbsp; MIYAAJD &nbsp;)</span>
        </Link>
        <Link href="/visual" onClick={onClose} className="menu-link">
          VISUAL DIRECTION
        </Link>
        <Link href="/frontend" onClick={onClose} className="menu-link">
          DEV
        </Link>
        <Link href="/design" onClick={onClose} className="menu-link">
          CREATIVE DESIGN
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
