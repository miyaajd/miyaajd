import React from "react";
import Image from "next/image";
import Profile from "@/src/components/Profile";
import profiledata from "@/src/data/profiledata.json";

export default function page() {
  return (
    <div className="pt-18 sm:pt-30 pb-14 min-h-[95dvh]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-10 lg:gap-20">
        <div className="order-1 relative">
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <div className="col-span-2 text-[clamp(2rem,4vw,4rem)] font-bold leading-[1.2] tracking-tighter mb-4 sm:mb-0 lg:mb-16">
              I build what I envision, from branding and packaging to web
              applications and beyond. No limits in medium, only intention in
              execution.
            </div>
            <div className="sm:aspect-4/3 relative">
              <Image
                src="/images/profilee.jpg"
                alt="profile"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-[clamp(1rem,2vw,4rem)] leading-none mb-4">
                JIN DONG MI
              </p>
              <p className="text-[clamp(1rem,2vw,2rem)]">+82 10 2591 1032</p>
              <a
                href="mailto:miyaajd@nowk.co.kr?subject=Project%20Inquiry"
                className="text-[clamp(1rem,2vw,2rem)] tracking-wide mb-2 sm:mb-10 lg:mb-12 block"
              >
                ⇱miyaajd@nowk.co.kr
              </a>
              <p className="text-[clamp(12px,1vw,1.3rem)] tracking-tighter">
                구상한 것을 다양한 매체로 구현합니다. 브랜딩과 패키징, 웹
                애플리케이션을 넘나들며 작업합니다. 형식에 제한을 두지 않고,
                모든 결과에 의도를 담습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="order-2 flex flex-col justify-end">
          <div className="flex flex-col gap-10 sm:gap-16">
            <Profile title="education" items={profiledata.education} />

            <Profile title="experience" items={profiledata.experience} />
          </div>
        </div>
      </div>
    </div>
  );
}
