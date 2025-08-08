// src/components/BackgroundCanvas.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ---- Config rápido para tunear el fondo ----
const CONFIG = {
  particles: { count: 7000, cyanOpacity: 0.28, whiteOpacity: 0.12, sizeCyan: 0.022, sizeWhite: 0.013 },
  bloom: { intensity: 0.85 },
  streaks: { count: 24, attract: 0.08 },
  breathing: { freq: 1.6, amp: 0.12, base: 1.0 },
  cursorGlow: { size: 1.6, pulseAmp: 0.25, color: '#00E5FF', opacity: 0.55 },
  twinkles: { count: 220, sigma: 2.8, speedMin: 0.6, speedMax: 1.4, base: 0.25 },
};

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);
  return reduce;
}

/* ============== util: posición 3D del cursor en un plano Z fijo ============== */
function useCursorOnPlane(planeZ = -8) {
  const { camera, size } = useThree();
  const cursorWorld = useRef(new THREE.Vector3());
  const ndc = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeZ)); // z = planeZ
  const intersect = new THREE.Vector3();

  useFrame(({ pointer }) => {
    ndc.set(pointer.x, pointer.y);
    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(plane.current, intersect);
    cursorWorld.current.copy(intersect);
  });

  return cursorWorld;
}

/* ========================= Partículas de fondo (más visibles) ========================= */
function Particles({ count = CONFIG.particles.count, motionScale = 1 }) {
  const group = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const max = (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      scrollRef.current = max > 0 ? scrollTop / max : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const positions = useMemo(() => {
    const spreadXY = 32, spreadZ = 44;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * spreadXY;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spreadXY;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
    }
    return arr;
  }, [count]);

  const cyanMatRef = useRef();
  const whiteMatRef = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;

    // Breathing global sutil para las partículas
    const breath = CONFIG.breathing.base + (CONFIG.breathing.amp * motionScale) * Math.sin(t * CONFIG.breathing.freq);
    if (cyanMatRef.current) cyanMatRef.current.opacity = CONFIG.particles.cyanOpacity * breath;
    if (whiteMatRef.current) whiteMatRef.current.opacity = CONFIG.particles.whiteOpacity * breath * 0.9;

    // Parallax por scroll
    const targetZ = THREE.MathUtils.lerp(-5, -12, s);
    const targetY = THREE.MathUtils.lerp(0.0, -1.6, s);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);

    // Seguimiento de mouse
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.08 * motionScale, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.06 * motionScale, 0.05);

    // Drift
    group.current.rotation.z += delta * 0.01 * motionScale;
    group.current.position.x = Math.sin(t * 0.05) * 0.35 * motionScale;
  });

  return (
    <group ref={group}>
      {/* Capa cian (visible) */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={cyanMatRef}
          transparent
          color="#00E5FF"
          opacity={CONFIG.particles.cyanOpacity}
          size={CONFIG.particles.sizeCyan}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
      {/* Capa blanca tenue para riqueza */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={whiteMatRef}
          transparent
          color="#EAEAEA"
          opacity={CONFIG.particles.whiteOpacity}
          size={CONFIG.particles.sizeWhite}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/* ===== Streaks con breathing + cola que se acorta + ATRACCIÓN al cursor ===== */
function Streaks({ count = CONFIG.streaks.count, attract = CONFIG.streaks.attract, motionScale = 1 }) {
  const mesh = useRef();
  const dummy = useRef(new THREE.Object3D());
  const cursorWorld = useCursorOnPlane(-8); // usamos el plano del fondo

  const data = useRef(
    new Array(count).fill().map(() => {
      const maxLife = 2 + Math.random() * 6;
      return {
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 36,
          (Math.random() - 0.5) * 22,
          -6 - Math.random() * 10
        ),
        dir: new THREE.Vector3(1, 0, 0)
          .applyAxisAngle(new THREE.Vector3(0, 0, 1), (Math.random() - 0.5) * 0.6)
          .applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.random() - 0.5) * 0.4)
          .normalize(),
        speed: 3 + Math.random() * 7,
        lenMin: 0.3 + Math.random() * 0.4,
        lenMax: 1.2 + Math.random() * 2.0,
        thick: 0.012 + Math.random() * 0.02,
        life: maxLife,
        maxLife,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.7 ? 'cyan' : 'white',
      };
    })
  );

  const reset = (s) => {
    const maxLife = 2 + Math.random() * 6;
    s.pos.set(
      -20 - Math.random() * 10,
      (Math.random() - 0.5) * 22,
      -6 - Math.random() * 10
    );
    s.dir.set(1, 0, 0)
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), (Math.random() - 0.5) * 0.6)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.random() - 0.5) * 0.4)
      .normalize();
    s.speed = 3 + Math.random() * 7;
    s.lenMin = 0.3 + Math.random() * 0.4;
    s.lenMax = 1.2 + Math.random() * 2.0;
    s.thick  = 0.012 + Math.random() * 0.02;
    s.life = maxLife;
    s.maxLife = maxLife;
    s.phase = Math.random() * Math.PI * 2;
    s.hue = Math.random() < 0.7 ? 'cyan' : 'white';
  };

  const tmpQuat = new THREE.Quaternion();
  const baseColorCyan = new THREE.Color(0x00e5ff);
  const baseColorWhite = new THREE.Color(0xeaeaea);
  const toCursor = new THREE.Vector3();

  useFrame((state, delta) => {
    const arr = data.current;
    const t = state.clock.elapsedTime;
    const cursor = cursorWorld.current;

    for (let i = 0; i < arr.length; i++) {
      const s = arr[i];

      // Steering: orientar levemente hacia el cursor (sin perder su inercia)
      toCursor.copy(cursor).sub(s.pos).setZ(0).normalize();         // plano XY para que no “salten” en Z
      s.dir.lerp(toCursor, (attract * motionScale) * delta * 60).normalize();       // intensidad ajustable

      // Avance + envejecimiento
      s.pos.addScaledVector(s.dir, s.speed * delta * motionScale);
      s.life -= delta;

      if (s.pos.x > 24 || s.life <= 0) reset(s);

      // Vida y easing
      const lifeRatio = THREE.MathUtils.clamp(s.life / s.maxLife, 0, 1);
      const eased = 1 - (1 - lifeRatio) * (1 - lifeRatio); // easeOutQuad
      const curLen = THREE.MathUtils.lerp(s.lenMin, s.lenMax, eased);

      // Breathing (pulso)
      const breathe = 0.85 + CONFIG.breathing.amp * Math.sin(t * CONFIG.breathing.freq + s.phase);
      const intensity = (0.25 + 0.75 * eased) * breathe;

      // Orientación del box según dirección
      tmpQuat.setFromUnitVectors(new THREE.Vector3(1, 0, 0), s.dir);

      // Transform
      dummy.current.position.copy(s.pos);
      dummy.current.quaternion.copy(tmpQuat);
      dummy.current.scale.set(curLen, s.thick, s.thick);
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.current.matrix);

      // Color por instancia (controla “glow” con Bloom)
      const c = (s.hue === 'cyan' ? baseColorCyan : baseColorWhite)
        .clone()
        .multiplyScalar(intensity);
      mesh.current.setColorAt(i, c);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#00E5FF"
        opacity={0.55}
        vertexColors
      />
    </instancedMesh>
  );
}


/* ========================= Twinkles: estrellas que parpadean y reaccionan al cursor ========================= */
function Twinkles({ motionScale = 1 }) {
  const cursor = useCursorOnPlane(-8);
  const pointsRef = useRef();
  const colorAttrRef = useRef();

  // Posiciones dispersas
  const positions = useMemo(() => {
    const count = CONFIG.twinkles.count;
    const spreadXY = 34, spreadZ = 46;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * spreadXY;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spreadXY;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
    }
    return arr;
  }, []);

  // Colores (vertex colors)
  const colors = useMemo(() => new Float32Array(CONFIG.twinkles.count * 3).fill(0), []);
  const phases = useMemo(() => new Float32Array(CONFIG.twinkles.count).map(() => Math.random() * Math.PI * 2), []);
  const speeds = useMemo(() => new Float32Array(CONFIG.twinkles.count).map(() => CONFIG.twinkles.speedMin + Math.random() * (CONFIG.twinkles.speedMax - CONFIG.twinkles.speedMin)), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cx = cursor.current.x, cy = cursor.current.y;
    const sigma2 = CONFIG.twinkles.sigma * CONFIG.twinkles.sigma;

    for (let i = 0; i < CONFIG.twinkles.count; i++) {
      const px = positions[i * 3 + 0];
      const py = positions[i * 3 + 1];
      // distancia en plano XY respecto al cursor
      const dx = px - cx; const dy = py - cy;
      const d2 = dx * dx + dy * dy;
      const wave = CONFIG.twinkles.base + 0.75 * Math.max(0, Math.sin(t * speeds[i] + phases[i]));
      const boost = Math.exp(-d2 / (2 * sigma2)); // 0..1
      const intensity = Math.min(1, wave + boost);

      // mezcla ligeramente hacia cian para identidad Kainet
      const r = 0.92 * intensity; // blanco suave base
      const g = 0.96 * intensity;
      const b = Math.min(1, 0.95 * intensity + 0.55 * boost); // añade cian cuando hay boost

      colors[i * 3 + 0] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    if (colorAttrRef.current) colorAttrRef.current.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute ref={colorAttrRef} attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} sizeAttenuation transparent depthWrite={false} vertexColors blending={THREE.AdditiveBlending} opacity={0.6 + 0.3 * motionScale} />
    </points>
  );
}

/* ========================= Canvas de fondo fijo + Bloom ========================= */
const BackgroundCanvas = () => {
  const reduce = usePrefersReducedMotion();
  const motionScale = reduce ? 0.4 : 1;
  const counts = {
    particles: Math.floor(CONFIG.particles.count * (reduce ? 0.5 : 1)),
    streaks: Math.floor(CONFIG.streaks.count * (reduce ? 0.6 : 1)),
    twinkles: Math.floor(CONFIG.twinkles.count * (reduce ? 0.7 : 1)),
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} eventPrefix="client">
        {/* Capas */}
        <Particles count={counts.particles} motionScale={motionScale} />
        <Streaks count={counts.streaks} motionScale={motionScale} />
        <Twinkles motionScale={motionScale} />

        {/* Glow global: partículas y streaks “iluminan” */}
        <EffectComposer>
          <Bloom
            intensity={CONFIG.bloom.intensity}
            luminanceThreshold={0.0}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;