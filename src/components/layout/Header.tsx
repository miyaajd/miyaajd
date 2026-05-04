"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Nav from "./Nav";
import { useState } from "react";
import { text } from "stream/consumers";

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
    <div className="fixed top-0 left-0 right-0 z-50 w-full pt-4 px-4 flex justify-between items-center">
      {/* 로고 */}
      <a className="z-50" href="/">
        <Image
          src="/icons/miyaajd--logo.svg"
          alt="logo"
          width={120}
          height={40}
          className={`${isOpenMenu ? "invert-100" : ""}`}
        />
      </a>
      {/* 메뉴 */}
      <button
        className={`text-[clamp(1rem,1.5vw,1.5rem)] cursor-pointer z-50 ${isOpenMenu ? "text-white" : "text-black"}`}
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
