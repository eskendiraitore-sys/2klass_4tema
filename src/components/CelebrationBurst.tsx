import {motion, AnimatePresence} from 'motion/react';
import {useMemo} from 'react';

interface CelebrationBurstProps {
  triggerKey: number;
  variant?: 'stars' | 'fireworks';
}

const PARTICLE_COLORS = [
  '#0284C7', // Cerulean
  '#F59E0B', // Marigold
  '#10B981', // Emerald
  '#EA580C', // Coral
  '#EC4899', // Berry
];

export function CelebrationBurst({
  triggerKey,
  variant = 'stars',
}: CelebrationBurstProps) {
  const particles = useMemo(() => {
    const count = variant === 'fireworks' ? 38 : 18;
    return Array.from({length: count}, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.22;
      const distance =
        variant === 'fireworks'
          ? 140 + ((i * 37) % 210)
          : 75 + ((i * 29) % 115);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - (variant === 'fireworks' ? 30 : 20);
      const rotate = ((i * 53) % 360) - 180;
      const scale = 0.75 + ((i % 4) * 0.2);
      const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      const isStar = i % 2 === 0;
      return {id: i, x, y, rotate, scale, color, isStar};
    });
  }, [variant]);

  return (
    <AnimatePresence>
      {triggerKey > 0 && (
        <div
          key={triggerKey}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{opacity: 1, x: 0, y: 0, scale: 0.3, rotate: 0}}
              animate={{
                opacity: [1, 1, 0],
                x: p.x,
                y: p.y + 40,
                scale: [0.3, p.scale, p.scale * 0.6],
                rotate: p.rotate,
              }}
              transition={{
                duration: variant === 'fireworks' ? 1.5 : 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute"
            >
              {p.isStar ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={p.color}
                  className="drop-shadow-sm"
                >
                  <path d="M12 2.2l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.1l-5.9 3.2 1.2-6.6-4.8-4.6 6.6-.9L12 2.2z" />
                </svg>
              ) : (
                <div
                  className="h-3 w-3 rounded-sm shadow-sm"
                  style={{backgroundColor: p.color}}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
