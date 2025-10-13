/**
 * PageContent - Wrapper for page content with staggered reveal animation
 * 
 * @component
 * @example
 * <PageContent>
 *   <section>Content 1</section>
 *   <section>Content 2</section>
 * </PageContent>
 * 
 * @accessibility
 * - Respects prefers-reduced-motion (disables animation)
 * - Does not interfere with content accessibility
 * 
 * @requirements 3.3
 */

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import useReducedMotion from '../../hooks/useReducedMotion';

const PageContent = ({ children, staggerDelay = 0.1, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  // Container variants for stagger orchestration
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };

  // Child item variants
  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

PageContent.propTypes = {
  /** Child elements to animate */
  children: PropTypes.node.isRequired,
  /** Delay between each child animation in seconds */
  staggerDelay: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default PageContent;
