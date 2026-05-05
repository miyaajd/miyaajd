"use client";

import { useState } from "react";
import CelebrationParticles from "@/src/components/CelebrationParticles";

type Props = {
  desc?: string;
};

export default function YesOrNoDecision({ desc }: Props) {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

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
          {result === "YES" && <CelebrationParticles />}
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
