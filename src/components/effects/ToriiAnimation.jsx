import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * ToriiAnimation - Elaborate torii animation with circuit connections
 * Shows hidden message: "改 (KAI) = Change, Innovation"
 * Triggered by triple-click on logo
 * 
 * @component
 * @example
 * <ToriiAnimation active={true} onDismiss={() => setActive(false)} />
 * 
 * @accessibility
 * - Can be dismissed by clicking anywhere
 * - Auto-dismisses after 8 seconds
 * - Announces message to screen readers
 */
const ToriiAnimation = ({ active = false, onDismiss }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Show message after torii animation
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1500);

    // Auto-dismiss after 8 seconds
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, 8000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(dismissTimer);
    };
  }, [active]);

  const handleDismiss = () => {
    setShowMessage(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={handleDismiss}
          role="dialog"
          aria-label="Special Torii Animation"
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Torii SVG with animations */}
            <motion.svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Circuit lines connecting to torii */}
              <motion.g stroke="#00E5FF" strokeWidth="1" fill="none" opacity="0.6">
                {/* Top left circuit */}
                <motion.path
                  d="M 50 100 L 100 100 L 100 80"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                {/* Top right circuit */}
                <motion.path
                  d="M 350 100 L 300 100 L 300 80"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                {/* Bottom left circuit */}
                <motion.path
                  d="M 50 300 L 100 300 L 140 320"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                {/* Bottom right circuit */}
                <motion.path
                  d="M 350 300 L 300 300 L 260 320"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </motion.g>

              {/* Torii structure */}
              <g stroke="#00E5FF" strokeWidth="4" fill="none" strokeLinecap="round">
                {/* Top horizontal beam (kasagi) */}
                <motion.line
                  x1="80"
                  y1="80"
                  x2="320"
                  y2="80"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />
                
                {/* Second horizontal beam (nuki) */}
                <motion.line
                  x1="100"
                  y1="140"
                  x2="300"
                  y2="140"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />

                {/* Left pillar (hashira) */}
                <motion.line
                  x1="120"
                  y1="80"
                  x2="140"
                  y2="320"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />

                {/* Right pillar (hashira) */}
                <motion.line
                  x1="280"
                  y1="80"
                  x2="260"
                  y2="320"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />
              </g>

              {/* Energy particles flowing through circuits */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="#00E5FF"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    cx: i % 2 === 0 ? [50, 100, 100] : [350, 300, 300],
                    cy: i < 2 ? [100, 100, 80] : [300, 300, 320]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="drop-shadow-[0_0_8px_rgba(0,229,255,1)]"
                />
              ))}

              {/* Center glow effect */}
              <motion.circle
                cx="200"
                cy="200"
                r="60"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, delay: 1.5 }}
              />
            </motion.svg>

            {/* Hidden message */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="text-6xl font-bold text-cyan-400 mb-2 drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]">
                    改
                  </div>
                  <div className="text-xl text-cyan-300 font-light">
                    KAI = Change, Innovation
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    Click anywhere to dismiss
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ToriiAnimation.propTypes = {
  active: PropTypes.bool,
  onDismiss: PropTypes.func
};

export default ToriiAnimation;
