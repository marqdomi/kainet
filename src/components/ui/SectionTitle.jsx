import React from 'react';
import PropTypes from 'prop-types';
import { getKanjiForSection, getKanjiByName } from '../../utils/sectionKanji';

/**
 * SectionTitle - Enhanced section title with optional kanji prefix
 * 
 * Displays section titles with decorative Japanese kanji characters
 * that reinforce the cyberpunk-Japanese aesthetic of KAINET.
 * 
 * @component
 * @example
 * // Auto-detect kanji from title
 * <SectionTitle>Our Services</SectionTitle>
 * 
 * // Explicit kanji
 * <SectionTitle kanji="innovation">About Us</SectionTitle>
 * 
 * // Without kanji
 * <SectionTitle showKanji={false}>Contact</SectionTitle>
 */
const SectionTitle = ({
  children,
  showKanji = true,
  kanji = null,
  className = '',
  as: Component = 'h2',
  ...props
}) => {
  // Get kanji based on explicit prop or auto-detect from title
  const kanjiData = kanji
    ? getKanjiByName(kanji)
    : getKanjiForSection(children);

  return (
    <Component
      className={`section-title ${className}`}
      {...props}
    >
      {showKanji && kanjiData && (
        <span
          className="section-title__kanji"
          aria-hidden="true"
          title={kanjiData.meaning}
        >
          {kanjiData.char}
        </span>
      )}
      <span className="section-title__text">
        {children}
      </span>
    </Component>
  );
};

SectionTitle.propTypes = {
  /** The title text content */
  children: PropTypes.node.isRequired,

  /** Whether to show the kanji prefix */
  showKanji: PropTypes.bool,

  /** Explicit kanji category (e.g., 'tech', 'ai', 'innovation') */
  kanji: PropTypes.string,

  /** Additional CSS classes */
  className: PropTypes.string,

  /** HTML element to render as (h1, h2, h3, etc.) */
  as: PropTypes.elementType
};

export default SectionTitle;
