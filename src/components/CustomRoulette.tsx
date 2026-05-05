"use client";

import { useMemo, useState } from "react";
import CelebrationParticles from "@/src/components/CelebrationParticles";

const MIN_SEGMENTS = 2;
const MAX_SEGMENTS = 8;
const SPIN_DURATION = 4200;
const SEGMENT_COLORS = [
  "#f7f7f7",
  "#e9e9e9",
  "#dcdcdc",
  "#cfcfcf",
  "#c2c2c2",
  "#b5b5b5",
  "#a8a8a8",
  "#9b9b9b",
];

function createEmptyItems(count: number) {
  return Array.from({ length: count }, () => "");
}

type Props = {
  desc?: string;
};

export default function CustomRoulette({ desc }: Props) {
  const [segmentCount, setSegmentCount] = useState(MIN_SEGMENTS);
  const [items, setItems] = useState(() => createEmptyItems(MIN_SEGMENTS));
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const segmentAngle = 360 / segmentCount;
  const canSpin = items.every((item) => item.trim().length > 0) && !isSpinning;

  const wheelBackground = useMemo(() => {
    return Array.from({ length: segmentCount }, (_, index) => {
      const start = index * segmentAngle;
      const end = (index + 1) * segmentAngle;
      return `${SEGMENT_COLORS[index]} ${start}deg ${end}deg`;
    }).join(", ");
  }, [segmentAngle, segmentCount]);

  function handleSegmentCountChange(value: string) {
    const nextCount = Number(value);

    setSegmentCount(nextCount);
    setItems((current) =>
      Array.from({ length: nextCount }, (_, index) => current[index] ?? "")
    );
    setRotation(0);
    setResult("");
  }

  function handleItemChange(index: number, value: string) {
    if (value.length > 5) {
      window.alert("최대 5글자까지 입력할 수 있습니다.");
      return;
    }

    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item))
    );
  }

  function handleSpin() {
    if (!canSpin) {
      return;
    }

    const selectedIndex = Math.floor(Math.random() * segmentCount);
    const selectedCenterAngle = selectedIndex * segmentAngle + segmentAngle / 2;
    const nextRotation =
      Math.floor(rotation / 360) * 360 + 1440 + (360 - selectedCenterAngle);

    setIsSpinning(true);
    setRotation(nextRotation);

    window.setTimeout(() => {
      setResult(items[selectedIndex].trim());
      setIsSpinning(false);
    }, SPIN_DURATION);
  }

  function handleResultClose() {
    setResult("");
    setSegmentCount(MIN_SEGMENTS);
    setItems(createEmptyItems(MIN_SEGMENTS));
    setRotation(0);
  }

  function handleClear() {
    setItems(createEmptyItems(segmentCount));
    setRotation(0);
    setResult("");
  }

  return (
    <section className="roulette-tool" aria-labelledby="roulette-title">
      <div className="roulette-toolbar">
        <h1 id="roulette-title" className="dev-tool-title">
          커스텀 룰렛
        </h1>

        <label className="roulette-count-field">
          <span>Category</span>
          <select
            value={segmentCount}
            onChange={(event) => handleSegmentCountChange(event.target.value)}
            disabled={isSpinning}
          >
            {Array.from(
              { length: MAX_SEGMENTS - MIN_SEGMENTS + 1 },
              (_, index) => MIN_SEGMENTS + index
            ).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="roulette-stage">
        <div className="roulette-pointer" aria-hidden="true" />
        <div
          className={`roulette-wheel roulette-wheel-${segmentCount}`}
          style={{
            background: `conic-gradient(${wheelBackground})`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {items.map((item, index) => {
            const angle = index * segmentAngle + segmentAngle / 2 - 90;
            const radius = 30;

            return (
              <label
                key={index}
                className="roulette-segment-field"
                style={{
                  left: `${50 + Math.cos((angle * Math.PI) / 180) * radius}%`,
                  top: `${50 + Math.sin((angle * Math.PI) / 180) * radius}%`,
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                }}
              >
                <input
                  value={item}
                  maxLength={5}
                  onChange={(event) =>
                    handleItemChange(index, event.target.value)
                  }
                  placeholder={`Item ${index + 1}`}
                  disabled={isSpinning}
                  aria-label={`roulette item ${index + 1}`}
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="roulette-actions">
        <button
          type="button"
          className="roulette-action-button"
          onClick={handleSpin}
          disabled={!canSpin}
        >
          룰렛 돌리기
        </button>
        <button
          type="button"
          className="roulette-action-button"
          onClick={handleClear}
          disabled={isSpinning}
        >
          전체 지우기
        </button>
      </div>
      {desc && <p className="dev-tool-desc roulette-desc">{desc}</p>}

      {result && (
        <div
          className="roulette-modal roulette-result-modal"
          role="dialog"
          aria-modal="true"
        >
          <CelebrationParticles />
          <div className="roulette-modal-panel">
            <p>Result</p>
            <strong>{result}</strong>
            <button
              type="button"
              className="roulette-action-button"
              onClick={handleResultClose}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
