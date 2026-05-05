import DevProjectList from "@/src/components/DevProjectList";
import devdata from "@/src/data/devdata.json";

export default function Page() {
  return (
    <main className="page-content dev-page-content">
      <DevProjectList projects={devdata.devData} />
    </main>
  );
}
