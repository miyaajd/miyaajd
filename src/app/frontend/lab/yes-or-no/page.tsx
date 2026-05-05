import Link from "next/link";
import YesOrNoDecision from "@/src/components/YesOrNoDecision";
import devdata from "@/src/data/devdata.json";

export default function YesOrNoPage() {
  const lab = devdata.devData.find((item) => item.title === "Lab");
  const tool = lab?.depth.find((item) => item.href?.includes("yes-or-no"));

  return (
    <main className="page-content dev-tool-page">
      <Link href="/frontend" className="dev-tool-back">
        <span aria-hidden="true">←</span>
        <span>Back to Menu</span>
      </Link>
      <YesOrNoDecision desc={tool?.desc} />
    </main>
  );
}
