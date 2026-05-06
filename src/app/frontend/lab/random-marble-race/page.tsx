import Link from "next/link";
import RandomMarbleRace from "@/src/components/RandomMarbleRace";
import devdata from "@/src/data/devdata.json";

export default function RandomMarbleRacePage() {
  const lab = devdata.devData.find((item) => item.title === "Lab");
  const tool = lab?.depth.find((item) =>
    item.href?.includes("random-marble-race")
  );
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
      <RandomMarbleRace desc={desc} />
    </main>
  );
}
