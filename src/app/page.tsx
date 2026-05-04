export default function Home() {
  return (
    <main className="min-h-[92dvh] sm:min-h-[95dvh] flex flex-col items-center justify-center text-center sm:py-10">
      <p className="text-[clamp(12px,1vw,2rem)] pb-8 sm:pb-20">
        Not just a portfolio. A living archive of visuals, interactions, and
        experiments.
      </p>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[clamp(1rem,6vw,6rem)] font-normal leading-none">
          WORKING AS
        </h1>
        {/* 각 링크로 연결되는 텍스트 - 비주얼 */}
        <a
          href="/visual"
          className="text-[clamp(2rem,9vw,9rem)] font-bold leading-tight tracking-tighter hover:opacity-20 hover:-translate-x-2 transition-all duration-300 ease-out"
        >
          VISUAL DIRECTOR*,
        </a>
        {/* 각 링크로 연결되는 텍스트 - 프론트엔드 */}
        <a
          href="/frontend"
          className="text-[clamp(2rem,8vw,9rem)] font-bold leading-tight tracking-tighter text-nowrap hover:opacity-20 hover:-translate-x-2 transition-all duration-300 ease-out"
        >
          FRONTEND DEVELOPER*
        </a>
        <h1 className="text-[clamp(1rem,6vw,6rem)] font-normal leading-none">
          AND
        </h1>
        {/* 각 링크로 연결되는 텍스트 - 디자인 */}
        <a
          href="/design"
          className="text-[clamp(2rem,9vw,9rem)] font-bold leading-tight tracking-tighter hover:opacity-20 hover:-translate-x-2 transition-all duration-300 ease-out"
        >
          CREATIVE DESIGNER
        </a>
      </div>
    </main>
  );
}
