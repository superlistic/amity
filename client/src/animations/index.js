export const variantForm = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      ease: 'easeIn',
      delay: 0.3,
      duration: 1.5,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

export const variantLandingHeader = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 1.5,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

export const variantLanding = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 2,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};
