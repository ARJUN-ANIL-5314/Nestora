import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FadeInOnScroll = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
}) => {
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
