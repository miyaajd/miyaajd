"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import { useState } from "react";

function Header() {
  // 메뉴오픈 상태관리
  const [isOpenMenu, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 메뉴 열기 로직
  const handleOpen = () => {
    setIsMenuOpen(true);
  };

  // 메뉴 닫기 로직
  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 500); //애니메이션 시간과 맞춤
  };

  // 메뉴 토글 로직
  const handleToggle = () => {
    if (isOpenMenu) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpenMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenMenu]);

  return (
    <div className="site-header">
      {/* 로고 */}
      <div className="site-logo">
        <Link
          href="/"
          className="site-logo-link"
          onClick={isOpenMenu ? handleClose : undefined}
        >
          <Image
            src="/icons/miyaajd--logo.svg"
            alt="logo"
            fill
            className={`${isOpenMenu ? "invert-100" : ""}`}
          />
        </Link>
      </div>
      {/* 메뉴 */}
      <button
        className={`menu-button ${isOpenMenu ? "text-white" : "text-black"}`}
        type="button"
        onClick={handleToggle}
      >
        {isOpenMenu && !isClosing ? "CLOSE" : "MENU"}
      </button>
      {/* 서브메뉴 컴포넌트 */}
      <Nav isOpen={isOpenMenu} isClosing={isClosing} onClose={handleClose} />
    </div>
  );
}

export default Header;
