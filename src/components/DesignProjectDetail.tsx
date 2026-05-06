"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useRef, useState } from "react";

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
  basePath?: string;
};

export default function DesignProjectDetail({
  project,
  nextProject,
  images,
  basePath = "/design",
}: Props) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    isActive: false,
    startX: 0,
    scrollLeft: 0,
  });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const strip = event.currentTarget;

    dragState.current = {
      isActive: true,
      startX: event.clientX,
      scrollLeft: strip.scrollLeft,
    };

    setIsDragging(true);
    strip.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current.isActive) {
      return;
    }

    const strip = event.currentTarget;
    const distance = event.clientX - dragState.current.startX;

    strip.scrollLeft = dragState.current.scrollLeft - distance;
    event.preventDefault();
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    if (!dragState.current.isActive) {
      return;
    }

    dragState.current.isActive = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section className="design-detail-page">
      <div className="design-detail-gallery">
        <div
          className={`design-detail-strip${isDragging ? " is-dragging" : ""}`}
          aria-label={`${project.title} images`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
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
                draggable={false}
              />
            </figure>
          ))}
        </div>

      </div>

      <footer className="design-detail-footer">
        <div className="design-detail-footer-row design-detail-footer-primary">
          <div className="design-detail-current">
            <span className="design-project-no">{project.no}</span>
            <span className="design-project-title">{project.title}</span>
          </div>

          <span className="design-project-year design-detail-year">
            {project.year}
          </span>

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
          <Link href={basePath} className="design-detail-back">
            <span aria-hidden="true">←</span>
            <span>All Projects</span>
          </Link>

          <Link
            href={`${basePath}/${nextProject.no}`}
            className="design-detail-next"
          >
            <span>Next Project</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </footer>
    </section>
  );
}
