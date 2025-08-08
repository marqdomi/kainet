// src/components/Playground.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SectionWrapper from '../hoc/SectionWrapper';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

/* =========================================================================
   Utils: hash -> seed, RNG determinista, helpers
   ========================================================================= */
function hashStringToSeed(str) {
  // djb2
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const lerp = (a, b, t) => a + (b - a) * t;

/* =========================================================================
   MODE 1: Network (nodos + aristas) — original
   ========================================================================= */
function NetworkArt({ seed, keyword }) {
  const group = useRef();
  const linesMatRef = useRef();

  const rng = useMemo(() => mulberry32(seed || 1), [seed]);
  const nodeCount = useMemo(() => Math.floor(lerp(180, 420, rng())), [rng]);
  const radius = useMemo(() => lerp(1.8, 3.0, rng()), [rng]);
  const kNearest = useMemo(() => Math.floor(lerp(3, 6, rng())), [rng]);
  const cyan = new THREE.Color('#00E5FF');
  const white = new THREE.Color('#EAEAEA');

  const posArray = useMemo(() => {
    const arr = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const u = rng();
      const v = rng();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.pow(rng(), 0.25);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      const lower = keyword.toLowerCase();
      const flatten = lower.includes('red') || lower.includes('net') || lower.includes('graph') ? 0.65 : 1.0;
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z * flatten;
    }
    return arr;
  }, [nodeCount, radius, rng, keyword]);

  const linePositions = useMemo(() => {
    const origins = Math.min(nodeCount, 260);
    const maxSegments = origins * kNearest;
    const seg = new Float32Array(maxSegments * 2 * 3);
    const pts = [];
    for (let i = 0; i < nodeCount; i++) {
      pts.push(
        new THREE.Vector3(
          posArray[i * 3 + 0],
          posArray[i * 3 + 1],
          posArray[i * 3 + 2]
        )
      );
    }
    let w = 0;
    for (let i = 0; i < origins; i++) {
      const a = pts[i];
      const dists = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        dists.push([j, a.distanceTo(pts[j])]);
      }
      dists.sort((A, B) => A[1] - B[1]);
      const k = Math.min(kNearest, dists.length);
      for (let n = 0; n < k; n++) {
        const j = dists[n][0];
        const b = pts[j];
        seg[w++] = a.x; seg[w++] = a.y; seg[w++] = a.z;
        seg[w++] = b.x; seg[w++] = b.y; seg[w++] = b.z;
      }
    }
    return seg.subarray(0, w);
  }, [posArray, nodeCount, kNearest]);

  const nodesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    return g;
  }, [posArray]);

  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.25, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.18, 0.06);
    if (linesMatRef.current) {
      const t = state.clock.elapsedTime;
      const breathe = 0.55 + 0.45 * Math.sin(t * 1.2);
      linesMatRef.current.opacity = 0.18 + 0.18 * breathe;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial
          ref={linesMatRef}
          color={cyan}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <Points geometry={nodesGeom} frustumCulled={false}>
        <PointMaterial transparent color={white} size={0.02} sizeAttenuation depthWrite={false} />
      </Points>
      <Points geometry={nodesGeom} frustumCulled={false}>
        <PointMaterial transparent color={'#00E5FF'} opacity={0.28} size={0.012} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

/* =========================================================================
   MODE 2: Flow Field (Perlin) — partículas siguiendo un campo vectorial
   ========================================================================= */
// Pequeño Perlin 2D (clásico) — determinista con seed
function makePerlin(seed) {
  const rng = mulberry32(seed || 1);
  const p = new Uint8Array(512);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 256; i++) p[256 + i] = p[i];
  const grad = (hash, x, y) => {
    switch (hash & 3) {
      case 0: return x + y;
      case 1: return -x + y;
      case 2: return x - y;
      default: return -x - y;
    }
  };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerpN = (a, b, t) => a + (b - a) * t;
  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = p[p[X] + Y];
    const ab = p[p[X] + Y + 1];
    const ba = p[p[X + 1] + Y];
    const bb = p[p[X + 1] + Y + 1];
    const x1 = lerpN(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
    const x2 = lerpN(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);
    return lerpN(x1, x2, v);
  };
}

function FlowFieldArt({ seed }) {
  // Visual tuning
  const count = 8000; // partículas
  const bounds = 1.2; // caja [-b,b]
  const speed = 1.2;  // velocidad base
  const TRAILS = 4;   // capas de estela (ring buffer)

  const group = useRef();
  const cyan = new THREE.Color('#00E5FF');
  const white = new THREE.Color('#EAEAEA');

  const perlin = useMemo(() => makePerlin(seed), [seed]);

  // Posiciones actuales de partículas (plano casi 2D para foco)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const rng = mulberry32(seed ^ 0x9e3779b9);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = lerp(-bounds, bounds, rng());
      arr[i * 3 + 1] = lerp(-bounds, bounds, rng());
      arr[i * 3 + 2] = lerp(-0.1, 0.1, rng());
    }
    return arr;
  }, [seed]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  // ===== Estelas en ring buffer (TRAILS capas) =====
  const trailIndex = useRef(0);
  const segPositionsArr = useMemo(
    () => Array.from({ length: TRAILS }, () => new Float32Array(count * 2 * 3)),
    [count]
  );
  const segGeoms = useMemo(
    () => segPositionsArr.map((buf) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(buf, 3));
      return g;
    }),
    [segPositionsArr]
  );
  const segMatRefs = useRef(segGeoms.map(() => null));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * 0.25; // animar el campo en el tiempo

    // Buffer de estela activo (se sobreescribe cada frame en anillo)
    const idx = trailIndex.current;
    const segPositions = segPositionsArr[idx];

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x0 = positions[ix + 0];
      const y0 = positions[ix + 1];
      let x = x0;
      let y = y0;

      const n = perlin(x * 0.6 + t, y * 0.6 - t); // -1..1
      const angle = n * Math.PI * 2;
      x += Math.cos(angle) * speed * delta;
      y += Math.sin(angle) * speed * delta;

      // wrap
      if (x > bounds) x = -bounds; else if (x < -bounds) x = bounds;
      if (y > bounds) y = -bounds; else if (y < -bounds) y = bounds;

      positions[ix + 0] = x;
      positions[ix + 1] = y;

      // Escribir segmento (prev -> current) en la capa activa
      const sx = ix * 2; // 2 puntos por segmento
      segPositions[sx + 0] = x0; segPositions[sx + 1] = y0; segPositions[sx + 2] = positions[ix + 2];
      segPositions[sx + 3] = x;  segPositions[sx + 4] = y;  segPositions[sx + 5] = positions[ix + 2];
    }

    // Flag updates del buffer actual y de puntos
    segGeoms[idx].attributes.position.needsUpdate = true;
    geom.attributes.position.needsUpdate = true;

    // Opacidades decrescentes por capa (más nueva = más brillante)
    const pulse = 0.65 + 0.35 * Math.sin(state.clock.elapsedTime * 1.5);
    const base = [0.42, 0.26, 0.16, 0.09];
    for (let i = 0; i < TRAILS; i++) {
      const ref = segMatRefs.current[i];
      if (ref) ref.opacity = base[i] * pulse;
    }

    // Avanzar el índice del ring buffer
    trailIndex.current = (trailIndex.current + 1) % TRAILS;

    // sway ligero con mouse + drift
    const { x: mx, y: my } = state.pointer;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.2, 0.06);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.15, 0.06);
      group.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={group} scale={1.6}>
      {/* Estelas multi-capa (más nueva primero) */}
      {segGeoms.map((g, i) => (
        <lineSegments key={i} geometry={g}>
          <lineBasicMaterial
            ref={(el) => (segMatRefs.current[i] = el)}
            color={cyan}
            transparent
            opacity={0.28}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      ))}

      {/* Partículas */}
      <Points geometry={geom} frustumCulled={false}>
        <PointMaterial
          transparent
          color={white}
          opacity={0.9}
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points geometry={geom} frustumCulled={false}>
        <PointMaterial
          transparent
          color={cyan}
          opacity={0.8}
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

/* =========================================================================
   MODE 3: Spectrum — anillos/ barras que responden de forma determinista
   ========================================================================= */
function SpectrumArt({ seed }) {
  const group = useRef();
  const bars = 72; // número de barras
  const radius = 1.6;
  const rng = useMemo(() => mulberry32(seed), [seed]);
  const basePhases = useMemo(() => new Float32Array(bars).map(() => rng() * Math.PI * 2), [rng]);
  const baseFreqs = useMemo(() => new Float32Array(bars).map(() => lerp(0.6, 1.6, rng())), [rng]);

  const geomRefs = useRef([]);

  useEffect(() => {
    geomRefs.current = new Array(bars);
  }, [bars]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = state.pointer.x, my = state.pointer.y;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.25, 0.06);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.2, 0.06);
    }
    for (let i = 0; i < bars; i++) {
      const g = geomRefs.current[i];
      if (!g) continue;
      const amp = 0.6 + 0.4 * Math.sin(t * baseFreqs[i] + basePhases[i]);
      // Escala la barra en Y
      g.scale.set(1, 0.3 + amp, 1);
    }
  });

  const cyan = '#00E5FF';
  const white = '#EAEAEA';

  const items = [];
  for (let i = 0; i < bars; i++) {
    const a = (i / bars) * Math.PI * 2;
    const x = Math.cos(a) * radius;
    const z = Math.sin(a) * radius;
    items.push(
      <group key={i} position={[x, 0, z]} rotation={[0, -a, 0]}
             ref={(el) => (geomRefs.current[i] = el)}>
        <mesh position={[0, 0.15, 0]}> {/* barra */}
          <boxGeometry args={[0.06, 0.3, 0.06]} />
          <meshBasicMaterial color={cyan} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0.02, 0]}> {/* base */}
          <boxGeometry args={[0.065, 0.04, 0.065]} />
          <meshBasicMaterial color={white} opacity={0.3} transparent />
        </mesh>
      </group>
    );
  }

  return <group ref={group}>{items}</group>;
}

/* =========================================================================
   UI + Canvas contenedor con switch de modo
   ========================================================================= */
const Playground = () => {
  const [keyword, setKeyword] = useState('Red Neuronal');
  const [seed, setSeed] = useState(() => hashStringToSeed('Red Neuronal'));
  const [mode, setMode] = useState('network'); // 'network' | 'flow' | 'spectrum'

  const onGenerate = (e) => {
    e.preventDefault();
    const s = hashStringToSeed(keyword.trim() || 'kainet');
    setSeed(s);
    // Detección simple por palabra clave
    const k = keyword.toLowerCase();
    if (k.includes('fractal') || k.includes('flujo') || k.includes('flow')) setMode('flow');
    else if (k.includes('espectro') || k.includes('spectrum') || k.includes('ondas')) setMode('spectrum');
    else setMode('network');
  };

  const randomize = () => {
    const r = Math.floor(Math.random() * 1e9);
    setSeed(r);
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        {/* Encabezado */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Playground de <span className="text-[#00E5FF]">IA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Escribe una palabra clave tecnológica y genera un arte abstracto basado en ella.
            Todo es determinista: la misma palabra produce el mismo patrón. Ahora con <em>modos</em>.
          </p>
        </div>

        {/* Layout 2 columnas */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Panel izquierdo: formulario / controles */}
          <div className="lg:col-span-4">
            <form
              onSubmit={onGenerate}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
            >
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Dale vida a un concepto
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ej. Red Neuronal, Fractal, Espectro, Flujo…"
                className="w-full rounded-lg bg-black/40 text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 focus:border-[#00E5FF] px-4 py-3 transition"
              />
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="submit"
                  className="btn-kainet px-4 py-2"
                >
                  Generar
                </button>
                <button
                  type="button"
                  onClick={randomize}
                  className="btn-kainet--outline"
                >
                  Random
                </button>
              </div>

              {/* Toggle de modos */}
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">Modo</p>
                <div className="inline-flex rounded-lg border border-white/10 bg-black/40 overflow-hidden">
                  {['network','flow','spectrum'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`px-3 py-2 text-sm transition ${mode===m ? 'bg-[#00E5FF] text-black' : 'text-gray-300 hover:bg-white/10'}`}
                    >
                      {m === 'network' ? 'Red' : m === 'flow' ? 'Flujo' : 'Espectro'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-400 space-y-2">
                <p>Tips:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li><span className="text-gray-300">Fractal / Flujo</span> → activa <em>Flow</em>.</li>
                  <li><span className="text-gray-300">Espectro / Ondas</span> → activa <em>Spectrum</em>.</li>
                  <li>La misma palabra siempre genera el mismo seed.</li>
                </ul>
              </div>
            </form>
          </div>

          {/* Panel derecho: Canvas */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-black/60 overflow-hidden">
            <div className="relative h-[440px] md:h-[560px]">
              <Canvas camera={{ position: [0, 0, 6], fov: 55 }} eventPrefix="client">
                <ambientLight intensity={0.4} />
                {mode === 'network' && <NetworkArt seed={seed} keyword={keyword} />}
                {mode === 'flow' && <FlowFieldArt seed={seed} />}
                {mode === 'spectrum' && <SpectrumArt seed={seed} />}
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Playground, 'playground');