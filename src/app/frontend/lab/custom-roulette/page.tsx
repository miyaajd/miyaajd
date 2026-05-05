import Link from "next/link";
import CustomRoulette from "@/src/components/CustomRoulette";
import devdata from "@/src/data/devdata.json";

export default function CustomRoulettePage() {
  const lab = devdata.devData.find((item) => item.title === "Lab");
  const tool = lab?.depth.find((item) => item.href?.includes("custom-roulette"));
  const desc =
    tool && "desc" in tool && typeof tool.desc === "string"
      ? tool.desc
      : undefined;

  return (
    <main className="page-content dev-tool-page">
      <Link href="/frontend" className="dev-tool-back">
        <span aria-hidden="true">←</span>
        <span>Back to Menu</span>
      </Link>
      <CustomRoulette desc={desc} />
    </main>
  );
}
