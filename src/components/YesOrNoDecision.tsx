"use client";

import { useMemo, useState } from "react";

type Props = {
  desc?: string;
};

const PARTICLE_COUNT = 22;

export default function YesOrNoDecision({ desc }: Props) {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        id: index,
        angle: (360 / PARTICLE_COUNT) * index,
        distance: 64 + (index % 5) * 12,
        delay: (index % 6) * 0.035,
      })),
    []
  );

  function handleDecide() {
    if (!question.trim()) {
      return;
    }

    setResult(Math.random() > 0.5 ? "YES" : "NO");
  }

  function handleReset() {
    setQuestion("");
    setResult("");
  }

  return (
    <section className="yesno-tool" aria-labelledby="yesno-title">
      <div className="dev-tool-heading">
        <h1 id="yesno-title" className="dev-tool-title">
          YES or NO
        </h1>
        {desc && <p className="dev-tool-desc">{desc}</p>}
      </div>

      <div className="yesno-panel">
        <label className="yesno-field">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="고민이 무엇인가요?"
            aria-label="고민 입력"
          />
        </label>
        <button
          type="button"
          className="roulette-action-button yesno-button"
          onClick={handleDecide}
          disabled={!question.trim()}
        >
          운명버튼
        </button>
      </div>

      {result && (
        <div
          className="roulette-modal yesno-modal"
          role="dialog"
          aria-modal="true"
        >
          <div className="yesno-particles" aria-hidden="true">
            {particles.map((particle) => (
              <span
                key={particle.id}
                style={
                  {
                    "--particle-angle": `${particle.angle}deg`,
                    "--particle-distance": `${particle.distance}px`,
                    "--particle-delay": `${particle.delay}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="roulette-modal-panel yesno-modal-panel">
            <p>Destiny says</p>
            <strong>{result}!</strong>
            <button
              type="button"
              className="roulette-action-button"
              onClick={handleReset}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
