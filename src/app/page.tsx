export default function Home() {
  return (
    <main className="page-home">
      <div className="home-role-stack">
        <h1 className="text-fluid-eyebrow font-normal leading-none">
          WORKING AS
        </h1>
        {/* 각 링크로 연결되는 텍스트 - 비주얼 */}
        <a href="/visual" className="home-role-link">
          VISUAL DIRECTOR*,
        </a>
        {/* 각 링크로 연결되는 텍스트 - 프론트엔드 */}
        <a href="/frontend" className="home-role-link text-nowrap">
          FRONTEND DEVELOPER*
        </a>
        <h1 className="text-fluid-eyebrow font-normal leading-none">AND</h1>
        {/* 각 링크로 연결되는 텍스트 - 디자인 */}
        <a href="/design" className="home-role-link">
          CREATIVE DESIGNER
        </a>
      </div>
      <p className="text-fluid-intro pt-8 sm:pt-12">
        Not just a portfolio. A living archive of visuals, interactions, and
        experiments.
      </p>
    </main>
  );
}
