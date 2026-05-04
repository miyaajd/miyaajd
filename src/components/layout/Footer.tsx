import React from "react";

function Footer() {
  return (
    <div className="flex justify-between">
      {/* 카피라이트 */}
      <span className="text-[clamp(12px,0.9vw,16px)]">©2026</span>
      {/* 메일투 */}
      <a
        href="mailto:miyaajd@nowk.co.kr?subject=Project Inquiry"
        className="text-[clamp(12px,0.9vw,16px)]"
      >
        ⇱miyaajd@nowk.co.kr
      </a>
    </div>
  );
}

export default Footer;
