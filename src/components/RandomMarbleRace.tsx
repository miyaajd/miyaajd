"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CelebrationParticles from "@/src/components/CelebrationParticles";

const MIN_MARBLES = 2;
const MAX_MARBLES = 12;
const BOARD_WIDTH = 420;
const BOARD_HEIGHT = 2200;
const MARBLE_RADIUS = 9;
const PEG_RADIUS = 5;
const FINISH_Y = BOARD_HEIGHT - 72;
const STUCK_CHECK_DELAY = 2600;
const STUCK_MOVEMENT_THRESHOLD = 8;
const MAX_NAME_LENGTH = 6;
const TEXT = {
  marbleCount: "\ub9c8\ube14 \uac1c\uc218",
  name: "\uc774\ub984",
  start: "\uc2dc\uc791\ud558\uae30",
  clearAll: "\uc804\uccb4 \uc9c0\uc6b0\uae30",
  winner: "\uc2b9\uc790",
  again: "\ub2e4\uc2dc\ud558\uae30",
  title: "\ub79c\ub364 \ub9c8\ube14 \ub808\uc774\uc2a4",
  stuckConfirm:
    "\ub9c8\ube14\uc774 \ubaa8\ub450 \uc7a5\uc560\ubb3c\uc5d0 \uac78\ub838\uc2b5\ub2c8\ub2e4. \uac8c\uc784\uc744 \ub2e4\uc2dc \uc2dc\uc791\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
  nameLimit:
    "\uc774\ub984\uc740 \ucd5c\ub300 6\uae00\uc790\uae4c\uc9c0 \uc785\ub825\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
};
const MARBLE_COLORS = [
  "#C8DDEB", // Ice Blue
  "#64D2FF", // Soft Blue
  "#D7E7C4", // Sage Green
  "#F4E1B5", // Warm Sand
  "#F0D0D8", // Soft Pink
  "#E6D6F2", // Lavender
  "#FFD60A", // Apple Yellow
  "#FF9F0A", // Orange
  "#FF453F", // Red
  "#AC8E68", // Cocoa
  "#8E8E93",  // Neutral Gray
  "#cccccc" // Indigo
];

type Marble = {
  id: number;
  color: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  finishedAt: number | null;
};

type Peg = {
  type: "dot";
  x: number;
  y: number;
  r: number;
};

type Bar = {
  type: "bar";
  x: number;
  y: number;
  length: number;
  angle: number;
};

type Obstacle = Peg | Bar;

type Winner = {
  id: number;
  color: string;
  name: string;
};

type Props = {
  desc?: string;
};

function createObstacles(): Obstacle[] {
  const obstacles: Obstacle[] = [];

  for (let row = 0; row < 34; row += 1) {
    const count = row % 2 === 0 ? 8 : 7;
    const padding = row % 2 === 0 ? 28 : 42;
    const gap = (BOARD_WIDTH - padding * 2) / (count - 1);

    for (let col = 0; col < count; col += 1) {
      obstacles.push({
        type: "dot",
        x: padding + gap * col,
        y: 118 + row * 58,
        r: PEG_RADIUS,
      });
    }

    if (row % 4 === 2) {
      obstacles.push(
        { type: "dot", x: 18, y: 118 + row * 58 + 26, r: 4 },
        { type: "dot", x: BOARD_WIDTH - 18, y: 118 + row * 58 + 26, r: 4 }
      );
    }
  }

  return [
    ...obstacles,
    { type: "dot", x: 88, y: 292, r: 14 },
    { type: "dot", x: 332, y: 346, r: 14 },
    { type: "dot", x: 156, y: 604, r: 12 },
    { type: "dot", x: 264, y: 748, r: 12 },
    { type: "dot", x: 98, y: 956, r: 13 },
    { type: "dot", x: 318, y: 1128, r: 13 },
    { type: "dot", x: 188, y: 1366, r: 15 },
    { type: "dot", x: 286, y: 1598, r: 12 },
    { type: "dot", x: 124, y: 1814, r: 14 },
    { type: "bar", x: 126, y: 420, length: 92, angle: -18 },
    { type: "bar", x: 294, y: 522, length: 104, angle: 17 },
    { type: "bar", x: 70, y: 690, length: 72, angle: 25 },
    { type: "bar", x: 350, y: 706, length: 72, angle: -25 },
    { type: "bar", x: 150, y: 830, length: 108, angle: 20 },
    { type: "bar", x: 292, y: 1038, length: 96, angle: -22 },
    { type: "bar", x: 66, y: 1188, length: 76, angle: -24 },
    { type: "bar", x: 354, y: 1210, length: 76, angle: 24 },
    { type: "bar", x: 132, y: 1254, length: 88, angle: -18 },
    { type: "bar", x: 282, y: 1488, length: 112, angle: 19 },
    { type: "bar", x: 72, y: 1644, length: 74, angle: 23 },
    { type: "bar", x: 348, y: 1662, length: 74, angle: -23 },
    { type: "bar", x: 154, y: 1718, length: 100, angle: 22 },
    { type: "bar", x: 304, y: 1940, length: 90, angle: -20 },
  ];
}

function createMarbles(count: number) {
  const spacing = BOARD_WIDTH / (count + 1);

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    color: MARBLE_COLORS[index],
    name: "",
    x: spacing * (index + 1),
    y: 36,
    vx: 0,
    vy: 0,
    finishedAt: null,
  }));
}

function createNames(count: number) {
  return Array.from({ length: count }, () => "");
}

function shuffleMarbleEntries(names: string[], count: number) {
  const entries = Array.from({ length: count }, (_, index) => ({
    color: MARBLE_COLORS[index],
    name: names[index].trim() || `${TEXT.name} ${index + 1}`,
  }));

  for (let index = entries.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = entries[index];

    entries[index] = entries[randomIndex];
    entries[randomIndex] = current;
  }

  return entries;
}

function createRaceMarbles(names: string[], count: number) {
  const entries = shuffleMarbleEntries(names, count);

  return createMarbles(count).map((marble, index) => ({
    ...marble,
    color: entries[index].color,
    name: entries[index].name,
  }));
}

function collideWithBar(marble: Marble, bar: Bar) {
  const angle = (bar.angle * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = marble.x - bar.x;
  const dy = marble.y - bar.y;
  const localX = dx * cos + dy * sin;
  const localY = -dx * sin + dy * cos;
  const half = bar.length / 2;
  const closestX = Math.max(-half, Math.min(half, localX));
  const closestY = Math.max(-4, Math.min(4, localY));
  const distanceX = localX - closestX;
  const distanceY = localY - closestY;
  const distance = Math.hypot(distanceX, distanceY);

  if (distance <= 0 || distance >= MARBLE_RADIUS) {
    return marble;
  }

  const normalLocalX = distanceX / distance;
  const normalLocalY = distanceY / distance;
  const normalX = normalLocalX * cos - normalLocalY * sin;
  const normalY = normalLocalX * sin + normalLocalY * cos;
  const dot = marble.vx * normalX + marble.vy * normalY;
  const overlap = MARBLE_RADIUS - distance;

  return {
    ...marble,
    x: marble.x + normalX * overlap,
    y: marble.y + normalY * overlap,
    vx: marble.vx - 1.55 * dot * normalX + normalX * 0.25,
    vy: marble.vy - 1.55 * dot * normalY + Math.abs(normalX) * 0.15,
  };
}

function drawBoard(
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[],
  marbles: Marble[],
  winnerId: number | null
) {
  context.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  context.fillStyle = "#f7f7f6";
  context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  context.strokeStyle = "rgb(0 0 0 / 0.1)";
  context.lineWidth = 1;
  context.strokeRect(0.5, 0.5, BOARD_WIDTH - 1, BOARD_HEIGHT - 1);

  context.fillStyle = "rgb(0 0 0 / 0.055)";
  context.fillRect(24, FINISH_Y, BOARD_WIDTH - 48, 1);

  context.fillStyle = "rgb(0 0 0 / 0.34)";
  context.font = "11px sans-serif";
  context.fillText("FINISH", 24, FINISH_Y + 22);

  obstacles.forEach((obstacle) => {
    if (obstacle.type === "dot") {
      context.beginPath();
      context.arc(obstacle.x, obstacle.y, obstacle.r, 0, Math.PI * 2);
      context.fillStyle =
        obstacle.r > PEG_RADIUS ? "rgb(220 220 224)" : "rgb(232 232 236)";
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = "rgb(255 255 255 / 0.78)";
      context.stroke();
      return;
    }

    context.save();
    context.translate(obstacle.x, obstacle.y);
    context.rotate((obstacle.angle * Math.PI) / 180);
    context.beginPath();
    context.roundRect(-obstacle.length / 2, -4, obstacle.length, 8, 4);
    context.fillStyle = "rgb(226 226 230)";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "rgb(255 255 255 / 0.72)";
    context.stroke();
    context.restore();
  });

  marbles.forEach((marble) => {
    context.beginPath();
    context.arc(marble.x, marble.y, MARBLE_RADIUS, 0, Math.PI * 2);
    context.fillStyle = marble.color;
    context.fill();
    context.lineWidth = winnerId === marble.id ? 3 : 1;
    context.strokeStyle =
      winnerId === marble.id ? "rgb(0 0 0 / 0.55)" : "rgb(255 255 255 / 0.7)";
    context.stroke();

    context.beginPath();
    context.arc(marble.x - 3, marble.y - 3, 2.2, 0, Math.PI * 2);
    context.fillStyle = "rgb(255 255 255 / 0.55)";
    context.fill();
  });
}

export default function RandomMarbleRace({ desc }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const resultTimeoutRef = useRef<number | null>(null);
  const marblesRef = useRef<Marble[]>(createMarbles(MIN_MARBLES));
  const startedAtRef = useRef(0);
  const stuckStateRef = useRef({
    checkedAt: 0,
    leaderY: 0,
  });
  const [marbleCount, setMarbleCount] = useState(MIN_MARBLES);
  const [marbleNames, setMarbleNames] = useState(() => createNames(MIN_MARBLES));
  const [isRacing, setIsRacing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const [winner, setWinner] = useState<Winner | null>(null);
  const obstacles = useMemo(() => createObstacles(), []);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    drawBoard(context, obstacles, marblesRef.current, winnerId);
  }, [obstacles, winnerId]);

  const paintResetBoard = useCallback((marbles: Marble[]) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    drawBoard(context, obstacles, marbles, null);
  }, [obstacles]);

  function resetRace(nextCount = marbleCount) {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (resultTimeoutRef.current) {
      window.clearTimeout(resultTimeoutRef.current);
      resultTimeoutRef.current = null;
    }

    const resetMarbles = createMarbles(nextCount);

    marblesRef.current = resetMarbles;
    paintResetBoard(resetMarbles);
    setIsRacing(false);
    setHasStarted(false);
    setWinnerId(null);
    setWinner(null);
  }

  function handleCountChange(value: string) {
    const nextCount = Number(value);

    setMarbleCount(nextCount);
    setMarbleNames((current) =>
      Array.from({ length: nextCount }, (_, index) => current[index] ?? "")
    );
    resetRace(nextCount);
  }

  function handleNameChange(index: number, value: string) {
    if (value.length > MAX_NAME_LENGTH) {
      window.alert(TEXT.nameLimit);
      return;
    }

    setMarbleNames((current) =>
      current.map((name, nameIndex) => (nameIndex === index ? value : name))
    );
  }

  function handleClearAll() {
    setMarbleNames(createNames(marbleCount));
    resetRace();
  }

  function scrollToFinish() {
    const board = canvasRef.current?.parentElement;

    if (!board) {
      return;
    }

    const boardTop = board.getBoundingClientRect().top + window.scrollY;
    const scale = board.clientWidth / BOARD_WIDTH;
    const targetY = boardTop + FINISH_Y * scale - window.innerHeight * 0.58;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "auto",
    });
  }

  function startRace() {
    resetRace(marbleCount);
    startedAtRef.current = performance.now();
    setHasStarted(true);
    setIsRacing(true);

    marblesRef.current = createRaceMarbles(marbleNames, marbleCount).map(
      (marble, index) => ({
        ...marble,
        vx: (index - (marbleCount - 1) / 2) * 0.18,
        vy: 1.4 + Math.random() * 0.4,
      })
    );
    stuckStateRef.current = {
      checkedAt: performance.now(),
      leaderY: 36,
    };
  }

  useEffect(() => {
    paint();
  }, [paint]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (resultTimeoutRef.current) {
        window.clearTimeout(resultTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isRacing) {
      return;
    }

    let previousTime = performance.now();

    function animate(time: number) {
      const delta = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;
      const nextMarbles = marblesRef.current.map((marble) => {
        if (marble.finishedAt !== null) {
          return marble;
        }

        let next = {
          ...marble,
          vy: marble.vy + 0.18 * delta,
          vx: marble.vx * 0.995,
        };

        next.x += next.vx * delta;
        next.y += next.vy * delta;

        if (
          next.x < MARBLE_RADIUS + 10 ||
          next.x > BOARD_WIDTH - MARBLE_RADIUS - 10
        ) {
          next.x = Math.max(
            MARBLE_RADIUS + 10,
            Math.min(BOARD_WIDTH - MARBLE_RADIUS - 10, next.x)
          );
          next.vx *= -0.72;
        }

        obstacles.forEach((obstacle) => {
          if (obstacle.type === "bar") {
            next = collideWithBar(next, obstacle);
            return;
          }

          const dx = next.x - obstacle.x;
          const dy = next.y - obstacle.y;
          const distance = Math.hypot(dx, dy);
          const minDistance = MARBLE_RADIUS + obstacle.r;

          if (distance > 0 && distance < minDistance) {
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = minDistance - distance;
            const dot = next.vx * nx + next.vy * ny;

            next.x += nx * overlap;
            next.y += ny * overlap;
            next.vx = next.vx - 1.7 * dot * nx + nx * 0.32;
            next.vy = next.vy - 1.7 * dot * ny + Math.abs(nx) * 0.18;
            next.vx += (Math.random() - 0.5) * 0.22;
          }
        });

        if (next.y >= FINISH_Y - MARBLE_RADIUS) {
          next = {
            ...next,
            y: FINISH_Y - MARBLE_RADIUS,
            vy: 0,
            vx: 0,
            finishedAt: time - startedAtRef.current,
          };
        }

        return next;
      });

      marblesRef.current = nextMarbles;
      paint();

      const leaderY = Math.max(...nextMarbles.map((marble) => marble.y));
      const isNearFinish = leaderY > FINISH_Y - 220;
      const canvas = canvasRef.current;
      const board = canvas?.parentElement;

      if (board) {
        const boardTop = board.getBoundingClientRect().top + window.scrollY;
        const scale = board.clientWidth / BOARD_WIDTH;
        const focusY = isNearFinish ? FINISH_Y : leaderY;
        const targetY =
          boardTop +
          focusY * scale -
          window.innerHeight * (isNearFinish ? 0.72 : 0.46);

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: "auto",
        });
      }

      const nextWinner = nextMarbles.find(
        (marble) => marble.finishedAt !== null
      );

      if (nextWinner) {
        const winnerName =
          nextWinner.name || `${TEXT.name} ${nextWinner.id}`;

        setWinnerId(nextWinner.id);
        setIsRacing(false);
        scrollToFinish();
        resultTimeoutRef.current = window.setTimeout(() => {
          scrollToFinish();
          setWinner({
            id: nextWinner.id,
            color: nextWinner.color,
            name: winnerName,
          });
        }, 1200);
        return;
      }

      const activeMarbles = nextMarbles.filter(
        (marble) => marble.finishedAt === null
      );
      const activeLeaderY = Math.max(
        ...activeMarbles.map((marble) => marble.y)
      );

      if (time - stuckStateRef.current.checkedAt >= STUCK_CHECK_DELAY) {
        const moved = activeLeaderY - stuckStateRef.current.leaderY;

        if (moved < STUCK_MOVEMENT_THRESHOLD) {
          if (window.confirm(TEXT.stuckConfirm)) {
            const restartedAt = performance.now();

            marblesRef.current = createRaceMarbles(
              marbleNames,
              marbleCount
            ).map((marble, index) => ({
                ...marble,
                vx: (index - (marbleCount - 1) / 2) * 0.18,
                vy: 1.4 + Math.random() * 0.4,
              }));
            startedAtRef.current = restartedAt;
            previousTime = restartedAt;
            stuckStateRef.current = {
              checkedAt: restartedAt,
              leaderY: 36,
            };
            setWinnerId(null);
            setWinner(null);
            frameRef.current = requestAnimationFrame(animate);
            return;
          }

          setIsRacing(false);
          return;
        }

        stuckStateRef.current = {
          checkedAt: time,
          leaderY: activeLeaderY,
        };
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
  }, [isRacing, marbleCount, marbleNames, obstacles, paint]);

  return (
    <section className="marble-race-tool" aria-labelledby="marble-race-title">
      <div className="dev-tool-heading">
        <h1 id="marble-race-title" className="dev-tool-title">
          랜덤 마블 레이스
        </h1>
        {desc && <p className="dev-tool-desc">{desc}</p>}
      </div>

      <div
        className={`marble-race-layout${hasStarted ? " is-expanded" : ""}`}
      >
        <div className="marble-race-controls">
          <label className="marble-race-count">
            <span>{TEXT.marbleCount}</span>
            <select
              value={marbleCount}
              onChange={(event) => handleCountChange(event.target.value)}
              disabled={isRacing}
            >
              {Array.from(
                { length: MAX_MARBLES - MIN_MARBLES + 1 },
                (_, index) => MIN_MARBLES + index
              ).map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>

          <div className="marble-race-palette" aria-label="Selected marbles">
            {MARBLE_COLORS.slice(0, marbleCount).map((color, index) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                aria-label={`Marble ${index + 1}`}
              />
            ))}
          </div>

          <div className="marble-race-name-list">
            {MARBLE_COLORS.slice(0, marbleCount).map((color, index) => (
              <label key={color} className="marble-race-name-field">
                <span style={{ backgroundColor: color }} />
                <input
                  value={marbleNames[index]}
                  onChange={(event) =>
                    handleNameChange(index, event.target.value)
                  }
                  disabled={isRacing}
                  placeholder={TEXT.name}
                  aria-label={`Marble ${index + 1} name`}
                />
              </label>
            ))}
          </div>

          <div className="marble-race-actions">
            <button
              type="button"
              className="roulette-action-button"
              onClick={startRace}
              disabled={isRacing}
            >
              {TEXT.start}
            </button>
            <button
              type="button"
              className="roulette-action-button marble-race-reset"
              onClick={handleClearAll}
            >
              {TEXT.clearAll}
            </button>
          </div>
        </div>

        <div className="marble-race-board" aria-label="Marble race board">
          <canvas
            ref={canvasRef}
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            className="marble-race-canvas"
          />
        </div>
      </div>

      {winner && (
        <div
          className="roulette-modal marble-race-modal"
          role="dialog"
          aria-modal="true"
        >
          <CelebrationParticles />
          <div className="roulette-modal-panel marble-race-modal-panel">
            <span
              className="marble-race-winner-dot"
              style={{ backgroundColor: winner.color }}
            />
            <p>{TEXT.winner}</p>
            <strong>{winner.name}</strong>
            <button
              type="button"
              className="roulette-action-button"
              onClick={() => resetRace()}
            >
              {TEXT.again}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
