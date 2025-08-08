import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// -------------------- Utils --------------------
const rand = (a, b) => a + Math.random() * (b - a);
const push = (arr, x, y, z) => { arr.push(x, y, z); };

// 2D point-in-polygon (ray casting)
function pointInPoly(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Sample uniformly inside polygon using rejection in bbox
function addFill(points, poly, count, depth = 1.2, jitter = 0.0) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of poly) { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); }
  let added = 0, guard = 0, maxGuard = count * 20;
  while (added < count && guard++ < maxGuard) {
    const x = rand(minX, maxX);
    const y = rand(minY, maxY);
    if (pointInPoly(poly, x, y)) {
      const jx = jitter ? rand(-jitter, jitter) : 0;
      const jy = jitter ? rand(-jitter, jitter) : 0;
      const z = rand(-depth / 2, depth / 2);
      push(points, x + jx, y + jy, z);
      added++;
    }
  }
}

// Sample along polygon edges with small thickness (outline density)
function addOutline(points, poly, count, thickness = 0.04, depth = 1.2) {
  const segCounts = poly.length; // distribute roughly equally
  for (let s = 0; s < segCounts; s++) {
    const a = poly[s];
    const b = poly[(s + 1) % poly.length];
    for (let i = 0; i < Math.ceil(count / segCounts); i++) {
      const t = Math.random();
      const x = THREE.MathUtils.lerp(a.x, b.x, t);
      const y = THREE.MathUtils.lerp(a.y, b.y, t);
      const nx = b.y - a.y; // perp
      const ny = -(b.x - a.x);
      const nlen = Math.hypot(nx, ny) || 1;
      const ox = (nx / nlen) * rand(-thickness, thickness);
      const oy = (ny / nlen) * rand(-thickness, thickness);
      const z = rand(-depth / 2, depth / 2);
      push(points, x + ox, y + oy, z);
    }
  }
}

// Quadratic Bézier helpers for curved beams
const bezierQ = (p0, p1, p2, t) => {
  const u = 1 - t;
  return new THREE.Vector2(
    u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
  );
};

function curveBandPoly(p0, p1, p2, thicknessTop = 0.52, thicknessBottom = 0.42, steps = 48) {
  // builds a closed poly approximating a thick curve (top/bottom curves)
  const top = []; const bottom = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // central curve
    const c = bezierQ(p0, p1, p2, t);
    // tangent via finite diff
    const t2 = Math.min(1, t + 0.001);
    const c2 = bezierQ(p0, p1, p2, t2);
    const tx = c2.x - c.x, ty = c2.y - c.y;
    const nx = -ty, ny = tx;
    const nlen = Math.hypot(nx, ny) || 1;
    const nxn = nx / nlen, nyn = ny / nlen;
    const thick = THREE.MathUtils.lerp(thicknessBottom, thicknessTop, Math.sin(t * Math.PI));
    top.push(new THREE.Vector2(c.x + nxn * thick * 0.5, c.y + nyn * thick * 0.5));
    bottom.push(new THREE.Vector2(c.x - nxn * thick * 0.5, c.y - nyn * thick * 0.5));
  }
  bottom.reverse();
  return [...top, ...bottom];
}

// -------------------- Torii from logo --------------------
function buildToriiPolys() {
  // scale tuned for camera z=8
  const polys = [];

  // Top beam (kasagi) — pronounced upward curve with rising ends
  const kasagi = curveBandPoly(
    new THREE.Vector2(-2.9, 1.22),
    new THREE.Vector2(0, 1.78),
    new THREE.Vector2(2.9, 1.22),
    0.62, 0.5, 56
  );
  polys.push(kasagi);

  // Secondary beam (shimaki) — milder curve, thinner
  const shimaki = curveBandPoly(
    new THREE.Vector2(-2.6, 1.02),
    new THREE.Vector2(0, 1.22),
    new THREE.Vector2(2.6, 1.02),
    0.28, 0.26, 40
  );
  polys.push(shimaki);

  // Crossbar (nuki) — rectangle
  const nuki = [
    new THREE.Vector2(-2.05, 0.32), new THREE.Vector2(2.05, 0.32),
    new THREE.Vector2(2.05, 0.52), new THREE.Vector2(-2.05, 0.52)
  ];
  polys.push(nuki);

  // Pillars as trapezoids (slight taper)
  const leftPillar = [
    new THREE.Vector2(-2.05, -1.82), new THREE.Vector2(-1.35, -1.82),
    new THREE.Vector2(-1.48, 0.26),   new THREE.Vector2(-1.92, 0.26)
  ];
  const rightPillar = [
    new THREE.Vector2(1.35, -1.82), new THREE.Vector2(2.05, -1.82),
    new THREE.Vector2(1.92, 0.26),  new THREE.Vector2(1.48, 0.26)
  ];
  polys.push(leftPillar, rightPillar);

  // Shoulders (small rectangles)
  const shoulderL = [
    new THREE.Vector2(-2.0, 0.52), new THREE.Vector2(-1.42, 0.52),
    new THREE.Vector2(-1.42, 0.64), new THREE.Vector2(-2.0, 0.64)
  ];
  const shoulderR = [
    new THREE.Vector2(1.42, 0.52), new THREE.Vector2(2.0, 0.52),
    new THREE.Vector2(2.0, 0.64), new THREE.Vector2(1.42, 0.64)
  ];
  polys.push(shoulderL, shoulderR);

  return polys;
}

function generateToriiPointsFromLogo() {
  const depth = 1.4;
  const pts = [];
  const polys = buildToriiPolys();

  // Dense outlines for sharp silhouette
  for (const poly of polys) addOutline(pts, poly, 700, 0.035, depth);

  // Fill each shape with controlled density (more on beams/pillars)
  const fillCounts = [1800, 600, 700, 1000, 1000, 240, 240];
  for (let i = 0; i < polys.length; i++) addFill(pts, polys[i], fillCounts[i] || 400, depth, 0.02);

  return new Float32Array(pts);
}

export default function Logo3D() {
  const group = useRef();
  const baseRot = useRef(0);
  const positions = useMemo(() => generateToriiPointsFromLogo(), []);

  useFrame((state, delta) => {
    if (!group.current) return;
    baseRot.current += delta * 0.1;
    const { x, y } = state.pointer;
    const targetYaw = x * 0.3; // slightly less sway for sharper read
    const targetPitch = -y * 0.22;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, baseRot.current + targetYaw, 0.085);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetPitch, 0.085);
  });

  return (
    <group ref={group}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#EAEAEA" size={0.013} sizeAttenuation depthWrite={false} />
      </Points>
      {/* Cyan outline accent for brand identity (very subtle) */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00E5FF" opacity={0.18} size={0.010} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}