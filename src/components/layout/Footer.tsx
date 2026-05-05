import React from "react";

function Footer() {
  return (
    <div className="site-footer">
      {/* 카피라이트 */}
      <span className="text-fluid-caption">©2026</span>
      {/* 메일투 */}
      <a
        href="mailto:miyaajd@nowk.co.kr?subject=Project%20Inquiry"
        className="text-fluid-caption"
      >
        ⇱miyaajd@nowk.co.kr
      </a>
    </div>
  );
}

export default Footer;
