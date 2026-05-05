"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type DesignProject = {
  img: Record<string, string | undefined>;
  no: string;
  title: string;
  year: string;
  overview: string;
};

type Props = {
  projects: DesignProject[];
};

function getFirstImage(project: DesignProject) {
  return Object.entries(project.img)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .sort(([a], [b]) => a.localeCompare(b))[0]?.[1];
}

export default function DesignProjectGrid({ projects }: Props) {
  const firstProject = useMemo(
    () => projects.find((project) => project.no === "02") ?? projects[0],
    [projects],
  );
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.no.localeCompare(a.no)),
    [projects],
  );
  if (!firstProject) {
    return null;
  }

  const previewImage = getFirstImage(firstProject) ?? "/images/profilee.jpg";

  return (
    <section className="design-project-section">
      <div className="design-preview">
        <Image
          src={previewImage}
          alt={firstProject.title}
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 36vw"
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="design-project-list">
        {sortedProjects.map((project) => (
          <Link
            key={project.no}
            href={`/design/${project.no}`}
            className="design-project-item"
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
  );
}
