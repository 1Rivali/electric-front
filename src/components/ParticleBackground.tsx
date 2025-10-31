import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const MotionBox = motion(Box);

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const ParticleBackground = () => {
  const particleColor = useColorModeValue("whiteAlpha.300", "whiteAlpha.200");

  const particles = useMemo(() => {
    const particleArray: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    return particleArray;
  }, []);

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      overflow="hidden"
      pointerEvents="none"
      zIndex={1}
    >
      {particles.map((particle) => (
        <MotionBox
          key={particle.id}
          position="absolute"
          left={`${particle.x}%`}
          top={`${particle.y}%`}
          w={`${particle.size}px`}
          h={`${particle.size}px`}
          bg={particleColor}
          borderRadius="full"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </Box>
  );
};

export default ParticleBackground;
