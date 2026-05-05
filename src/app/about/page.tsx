import React from "react";
import Image from "next/image";
import Profile from "@/src/components/Profile";
import profiledata from "@/src/data/profiledata.json";

export default function page() {
  const aboutDescription =
    "구상한 것을 다양한 매체로 구현합니다. 브랜딩과 패키징, 웹 애플리케이션을 넘나들며 작업합니다. 형식에 제한을 두지 않고, 모든 결과에 의도를 담습니다.";

  return (
    <div className="page-content">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-10 lg:gap-20">
        <div className="order-1 relative">
          <div className="grid grid-cols-[1fr_2fr] gap-4 md:gap-6">
            <div className="col-span-2 about-lead mb-2 sm:mb-0 lg:mb-4">
              I build what I envision, from branding and packaging to web
              applications and beyond. No limits in medium, only intention in
              execution.
            </div>
            <div className="aspect-3/3.5 relative">
              <Image
                src="/images/profile2.jpg"
                alt="profile"
                fill
                className="about-profile-image object-cover"
              />
            </div>
            <div className="flex flex-col justify-end">
              <p className="about-signature mb-4">
                JIN DONG MI
              </p>
              <p className="text-fluid-contact">+82 10 2591 1032</p>
              <a
                href="mailto:miyaajd@nowk.co.kr?subject=Project%20Inquiry"
                className="text-fluid-contact tracking-wide mb-0 sm:mb-4 md:mb-8 lg:mb-12 block"
              >
                ⇱miyaajd@nowk.co.kr
              </a>
              <p className="about-description hidden sm:block">{aboutDescription}</p>
            </div>
            <p className="about-description col-span-2 sm:hidden">
              {aboutDescription}
            </p>
            <hr className="about-profile-divider" />
          </div>
        </div>
        <div className="order-2 self-start">
          <div className="profile-stack">
            <Profile title="education" items={profiledata.education} />

            <Profile title="experience" items={profiledata.experience} />

            <Profile title="certification" items={profiledata.certification} />
          </div>
        </div>
      </div>
    </div>
  );
}
