"use client";

import Link from "next/link";
import { useState } from "react";

type DevDepth = {
  no: string;
  title: string;
  href?: string;
  desc?: string;
  depth?: DevDepth[];
};

type DevProject = {
  no: string;
  title: string;
  depth: DevDepth[];
};

type Props = {
  projects: DevProject[];
};

function DevDepthList({
  items,
  parentKey,
}: {
  items: DevDepth[];
  parentKey: string;
}) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const sortedItems = [...items].sort((a, b) => b.no.localeCompare(a.no));

  return (
    <div className="dev-depth-list">
      {sortedItems.map((item) => {
        const itemKey = `${parentKey}-${item.no}`;
        const hasDepth = Boolean(item.depth?.length);
        const isOpen = Boolean(openItems[itemKey]);
        const isInternalLink = item.href?.startsWith("/");
        const content = (
          <>
            {item.href && <span aria-hidden="true">⇱</span>}
            <span className="dev-depth-content">
              <span>{item.title}</span>
              {item.desc && <span className="dev-depth-desc">{item.desc}</span>}
            </span>
          </>
        );

        return (
          <div key={itemKey} className="dev-depth-group">
            {isInternalLink ? (
              <Link href={item.href ?? "#"} className="dev-depth-item">
                {content}
              </Link>
            ) : item.href ? (
              <a
                href={item.href}
                className="dev-depth-item"
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            ) : (
              <button
                type="button"
                className="dev-depth-item"
                onClick={() =>
                  setOpenItems((current) => ({
                    ...current,
                    [itemKey]: !isOpen,
                  }))
                }
                aria-expanded={hasDepth ? isOpen : undefined}
              >
                {content}
              </button>
            )}

            {hasDepth && isOpen && (
              <DevDepthList items={item.depth ?? []} parentKey={itemKey} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DevProjectList({ projects }: Props) {
  const sortedProjects = [...projects].sort((a, b) => b.no.localeCompare(a.no));
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

  return (
    <section className="dev-project-section">
      <div className="dev-project-list">
        {sortedProjects.map((project) => {
          const isOpen = Boolean(openProjects[project.no]);
          const hasDepth = project.depth.length > 0;

          return (
            <div key={project.no} className="dev-project-group">
              <button
                type="button"
                className="dev-project-item"
                onClick={() =>
                  setOpenProjects((current) => ({
                    ...current,
                    [project.no]: !isOpen,
                  }))
                }
                aria-expanded={hasDepth ? isOpen : undefined}
              >
                <span className="dev-project-no">{project.no}</span>
                <span className="dev-project-meta">
                  <span className="dev-project-title">{project.title}</span>
                </span>
              </button>

              {hasDepth && isOpen && (
                <DevDepthList items={project.depth} parentKey={project.no} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
