import DesignProjectGrid from "@/src/components/DesignProjectGrid";
import designdata from "@/src/data/designdata.json";

export default function page() {
  return (
    <main className="page-content design-page-content">
      <DesignProjectGrid projects={designdata.designData} />
    </main>
  );
}
