import { notFound } from "next/navigation";
import DesignProjectDetail from "@/src/components/DesignProjectDetail";
import visualdata from "@/src/data/visualdata.json";

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
  return visualdata.visualData.map((project) => ({
    no: project.no,
  }));
}

export default async function VisualDetailPage({ params }: Props) {
  const { no } = await params;
  const projectIndex = visualdata.visualData.findIndex((item) => item.no === no);
  const project = visualdata.visualData[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject =
    visualdata.visualData[(projectIndex + 1) % visualdata.visualData.length];
  const images = getProjectImages(project.img);

  return (
    <main>
      <DesignProjectDetail
        project={project}
        nextProject={nextProject}
        images={images}
        basePath="/visual"
      />
    </main>
  );
}
