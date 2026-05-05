"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjectSummary = {
  no: string;
  title: string;
  year: string;
  overview: string;
};

type Props = {
  project: ProjectSummary;
  nextProject: ProjectSummary;
  images: Array<[string, string]>;
};

export default function DesignProjectDetail({
  project,
  nextProject,
  images,
}: Props) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <section className="design-detail-page">
      <div className="design-detail-gallery">
        <div
          className="design-detail-strip"
          aria-label={`${project.title} images`}
        >
          {images.map(([imageNo, src]) => (
            <figure key={imageNo} className="design-detail-strip-image">
              <Image
                src={src}
                alt={`${project.title} ${imageNo}`}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 28vw"
                className="object-cover object-center"
                priority={imageNo === "01"}
              />
            </figure>
          ))}
        </div>

        <div className="design-detail-scroll-hint">Scroll right</div>
      </div>

      <footer className="design-detail-footer">
        <div className="design-detail-footer-row design-detail-footer-primary">
          <div className="design-detail-current">
            <span className="design-project-no">{project.no}</span>
            <span className="design-project-title">{project.title}</span>
          </div>

          <div className="design-detail-info">
            {isInfoOpen && (
              <div className="design-detail-info-body">
                <p className="design-detail-overview">{project.overview}</p>
              </div>
            )}
            <button
              type="button"
              className="design-detail-info-button"
              onClick={() => setIsInfoOpen((current) => !current)}
              aria-expanded={isInfoOpen}
            >
              Info
            </button>
          </div>
        </div>

        <div className="design-detail-footer-row design-detail-footer-nav">
          <Link href="/design" className="design-detail-back">
            <span aria-hidden="true">←</span>
            <span>All Projects</span>
          </Link>

          <Link href={`/design/${nextProject.no}`} className="design-detail-next">
            <span>Next Project</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </footer>
    </section>
  );
}
