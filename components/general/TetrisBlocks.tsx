"use client";

/**
 * TetrisBlocks — decorative floating tetromino shapes.
 *
 * Usage:
 *   <TetrisBlocks position="top-left" />
 *   <TetrisBlocks position="bottom-right" />
 *
 * Available positions: "top-left" | "top-right" | "bottom-left" | "bottom-right"
 *
 * Drop inside any `relative` container and they sit at the chosen corner.
 * Pass `className` to adjust size, z-index, or opacity if needed.
 */

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ─── Public types ─────────────────────────────────────────────────────────────
export type BlockPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface TetrisBlocksProps {
  position?: BlockPosition;
  /** Extra Tailwind / CSS classes on the wrapping div */
  className?: string;
}

// ─── Render constants ─────────────────────────────────────────────────────────
const CELL = 14; // px — size of each square cell
const GAP  = 3;  // px — gap between cells
const STEP = CELL + GAP;

// ─── Tetromino cell maps [col, row] ──────────────────────────────────────────
const SHAPES = {
  L: [[0,0],[0,1],[0,2],[1,2]],
  J: [[1,0],[1,1],[0,2],[1,2]],
  T: [[0,0],[1,0],[2,0],[1,1]],
  S: [[1,0],[2,0],[0,1],[1,1]],
  Z: [[0,0],[1,0],[1,1],[2,1]],
  I: [[0,0],[1,0],[2,0],[3,0]],
  O: [[0,0],[1,0],[0,1],[1,1]],
} as const;

type ShapeKey = keyof typeof SHAPES;

// ─── Per-piece config ─────────────────────────────────────────────────────────
interface Piece {
  shape:    ShapeKey;
  x:        number;  // translate-x in SVG user units (≈ px)
  y:        number;  // translate-y in SVG user units (≈ px)
  color:    string;  // CSS custom property string
  opacity:  number;  // 0–1
  delay:    number;  // seconds before float starts
  float:    number;  // px amplitude of vertical float
  duration: number;  // seconds per float cycle
}

// ─── Unique compositions per corner ──────────────────────────────────────────
const COMPOSITIONS: Record<BlockPosition, Piece[]> = {
  "top-left": [
    { shape:"L", x:0,   y:0,   color:"var(--color-primary)",        opacity:0.20, delay:0.0, float:7,  duration:4.2 },
    { shape:"T", x:58,  y:32,  color:"var(--color-brand-violet)",   opacity:0.14, delay:0.7, float:9,  duration:5.1 },
    { shape:"O", x:12,  y:90,  color:"var(--color-brand-emerald)",  opacity:0.16, delay:1.4, float:5,  duration:3.8 },
    { shape:"S", x:96,  y:60,  color:"var(--color-primary)",        opacity:0.09, delay:0.3, float:11, duration:6.0 },
    { shape:"I", x:4,   y:142, color:"var(--color-brand-violet)",   opacity:0.11, delay:1.9, float:7,  duration:4.5 },
  ],
  "top-right": [
    { shape:"J", x:12,  y:0,   color:"var(--color-brand-violet)",   opacity:0.16, delay:0.2, float:7,  duration:4.8 },
    { shape:"L", x:64,  y:38,  color:"var(--color-primary)",        opacity:0.11, delay:0.9, float:9,  duration:5.2 },
    { shape:"S", x:0,   y:92,  color:"var(--color-brand-emerald)",  opacity:0.14, delay:0.5, float:6,  duration:4.0 },
    { shape:"O", x:82,  y:74,  color:"var(--color-primary)",        opacity:0.17, delay:1.2, float:5,  duration:3.6 },
    { shape:"Z", x:36,  y:124, color:"var(--color-brand-violet)",   opacity:0.10, delay:0.0, float:8,  duration:5.5 },
  ],
  "bottom-left": [
    { shape:"T", x:0,   y:10,  color:"var(--color-brand-emerald)",  opacity:0.15, delay:0.3, float:8,  duration:4.4 },
    { shape:"Z", x:56,  y:48,  color:"var(--color-primary)",        opacity:0.11, delay:0.0, float:6,  duration:5.1 },
    { shape:"I", x:10,  y:92,  color:"var(--color-brand-violet)",   opacity:0.10, delay:1.0, float:9,  duration:4.0 },
    { shape:"O", x:84,  y:8,   color:"var(--color-brand-emerald)",  opacity:0.14, delay:1.6, float:5,  duration:3.9 },
    { shape:"L", x:28,  y:150, color:"var(--color-primary)",        opacity:0.09, delay:0.8, float:7,  duration:5.3 },
  ],
  "bottom-right": [
    { shape:"Z", x:8,   y:8,   color:"var(--color-brand-emerald)",  opacity:0.15, delay:0.0, float:7,  duration:4.3 },
    { shape:"O", x:64,  y:28,  color:"var(--color-primary)",        opacity:0.11, delay:1.0, float:9,  duration:5.0 },
    { shape:"L", x:10,  y:76,  color:"var(--color-brand-violet)",   opacity:0.17, delay:0.5, float:5,  duration:3.7 },
    { shape:"T", x:96,  y:64,  color:"var(--color-primary)",        opacity:0.10, delay:1.4, float:8,  duration:5.4 },
    { shape:"S", x:40,  y:118, color:"var(--color-brand-emerald)",  opacity:0.12, delay:0.8, float:6,  duration:4.6 },
  ],
};

const CORNER_CLASSES: Record<BlockPosition, string> = {
  "top-left":     "top-0 left-0",
  "top-right":    "top-0 right-0",
  "bottom-left":  "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

// ─── Component ────────────────────────────────────────────────────────────────
export const TetrisBlocks = memo(function TetrisBlocks({
  position = "top-left",
  className = "",
}: TetrisBlocksProps) {
  const shouldReduceMotion = useReducedMotion();
  const pieces = COMPOSITIONS[position];

  return (
    <div
      className={`
        absolute ${CORNER_CLASSES[position]}
        w-[220px] h-[220px]
        pointer-events-none select-none overflow-hidden
        ${className}
      `}
      aria-hidden="true"
    >
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        {pieces.map((piece, i) => {
          const cells = SHAPES[piece.shape] as readonly (readonly [number, number])[];

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: piece.opacity }
                  : {
                      opacity: piece.opacity,
                      y: [0, -piece.float, 0],
                    }
              }
              transition={{
                opacity: {
                  duration: 0.8,
                  delay: piece.delay + 1.0,
                  ease: "easeOut",
                },
                y: {
                  duration: piece.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: piece.delay + 1.0,
                },
              }}
              transform={`translate(${piece.x}, ${piece.y})`}
            >
              {cells.map(([col, row], j) => (
                <rect
                  key={j}
                  x={col * STEP}
                  y={row * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2.5}
                  fill={piece.color}
                />
              ))}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
});

