import Image from "next/image";
import Link from "next/link";
import visualdata from "@/src/data/visualdata.json";

export default function Page() {
  const sortedProjects = [...visualdata.visualData].sort((a, b) =>
    b.no.localeCompare(a.no),
  );

  return (
    <main className="visual-page" aria-label="Visual archive">
      <Image
        src="/images/visual-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="visual-page-image"
        priority
      />

      <section className="visual-project-section">
        <div className="design-project-list visual-project-list">
          {sortedProjects.map((project) => (
            <Link
              key={project.no}
              href={`/visual/${project.no}`}
              className="design-project-item visual-project-item"
            >
              <span className="design-project-no">{project.no}</span>
              <span className="design-project-meta">
                <span className="design-project-title">{project.title}</span>
                <span className="design-project-year">{project.year}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
