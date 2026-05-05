import Link from "next/link";

export default function Home() {
  return (
    <main className="page-home">
      <div className="home-role-stack">
        <h1 className="text-fluid-eyebrow font-normal leading-none">
          WORKING AS
        </h1>
        {/* 각 링크로 연결되는 텍스트 - 비주얼 */}
        <Link href="/visual" className="home-role-link">
          VISUAL DIRECTOR*,
        </Link>
        {/* 각 링크로 연결되는 텍스트 - 프론트엔드 */}
        <Link href="/frontend" className="home-role-link text-nowrap">
          FRONTEND DEVELOPER*
        </Link>
        <h1 className="text-fluid-eyebrow font-normal leading-none">AND</h1>
        {/* 각 링크로 연결되는 텍스트 - 디자인 */}
        <Link href="/design" className="home-role-link">
          CREATIVE DESIGNER
        </Link>
      </div>
      <p className="text-fluid-intro pt-8 sm:pt-12">
        Not just a portfolio. A living archive of visuals, interactions, and
        experiments.
      </p>
    </main>
  );
}
