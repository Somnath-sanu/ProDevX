import { motion } from "framer-motion";

interface HeartAnimationProps {
  onComplete: () => void;
}

export function HeartAnimation({ onComplete }: HeartAnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.8,
        times: [0, 0.4, 1],
      }}
      onAnimationComplete={onComplete}
      className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        {/* Main heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-red-500 text-8xl"
        >
          ❤️
        </motion.div>

        {/* Particle hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: [0, Math.cos(i * 60 * (Math.PI / 180)) * 100],
              y: [0, Math.sin(i * 60 * (Math.PI / 180)) * 100],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.4, 1],
            }}
            className="absolute left-1/2 top-1/2 text-red-500 text-2xl"
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
