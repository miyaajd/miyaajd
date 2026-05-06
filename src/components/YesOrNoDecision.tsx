"use client";

import { useState } from "react";
import CelebrationParticles from "@/src/components/CelebrationParticles";

const MAX_QUESTION_LENGTH = 30;

type Props = {
  desc?: string;
};

export default function YesOrNoDecision({ desc }: Props) {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [result, setResult] = useState("");

  function handleQuestionChange(value: string) {
    if (value.length > MAX_QUESTION_LENGTH) {
      window.alert("최대 30자까지 입력할 수 있습니다.");
      return;
    }

    setQuestion(value);
  }

  function handleDecide() {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    setSubmittedQuestion(trimmedQuestion);
    setResult(Math.random() > 0.5 ? "YES" : "NO");
  }

  function handleReset() {
    setQuestion("");
    setSubmittedQuestion("");
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
            onChange={(event) => handleQuestionChange(event.target.value)}
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
            <p className="yesno-modal-bubble">{submittedQuestion}</p>
            <p className="yesno-modal-kicker">Destiny says</p>
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
