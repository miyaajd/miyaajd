import { notFound } from "next/navigation";
import DesignProjectDetail from "@/src/components/DesignProjectDetail";
import designdata from "@/src/data/designdata.json";

type Props = {
  params: Promise<{
    no: string;
  }>;
};

function getProjectImages(img: Record<string, string | undefined>) {
  return Object.entries(img)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .sort(([a], [b]) => a.localeCompare(b));
}

export function generateStaticParams() {
  return designdata.designData.map((project) => ({
    no: project.no,
  }));
}

export default async function DesignDetailPage({ params }: Props) {
  const { no } = await params;
  const projectIndex = designdata.designData.findIndex((item) => item.no === no);
  const project = designdata.designData[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject =
    designdata.designData[(projectIndex + 1) % designdata.designData.length];
  const images = getProjectImages(project.img);

  return (
    <main>
      <DesignProjectDetail
        project={project}
        nextProject={nextProject}
        images={images}
      />
    </main>
  );
}
