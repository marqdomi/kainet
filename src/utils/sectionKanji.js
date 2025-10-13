/**
 * Section Kanji Utility - Maps section titles to appropriate kanji prefixes
 * 
 * This utility provides intelligent kanji selection for section titles
 * based on keywords and context, enhancing the Japanese-cyberpunk aesthetic.
 * 
 * @module sectionKanji
 */

import { techKanji } from './kanjiLibrary';

/**
 * Keyword-to-kanji mapping for intelligent section title decoration
 * @type {Object.<string, Object>}
 */
const sectionKeywordMap = {
  // Technology & Development
  'tech': techKanji.tech,
  'technology': techKanji.tech,
  'development': techKanji.development,
  'develop': techKanji.development,
  'code': techKanji.code,
  'coding': techKanji.code,
  'programming': techKanji.code,
  
  // AI & Innovation
  'ai': techKanji.ai,
  'artificial': techKanji.ai,
  'intelligence': techKanji.ai,
  'innovation': techKanji.innovation,
  'innovative': techKanji.innovation,
  'future': techKanji.future,
  
  // Automation & Systems
  'automation': techKanji.automation,
  'automate': techKanji.automation,
  'automatic': techKanji.automation,
  'network': techKanji.network,
  'web': techKanji.network,
  'cloud': techKanji.cloud,
  
  // Data & Information
  'data': techKanji.data,
  'database': techKanji.data,
  'information': techKanji.data,
  
  // Generic sections
  'about': techKanji.innovation,
  'services': techKanji.tech,
  'projects': techKanji.development,
  'work': techKanji.development,
  'portfolio': techKanji.development,
  'blog': techKanji.data,
  'posts': techKanji.data,
  'contact': techKanji.network,
  'team': techKanji.network,
  'skills': techKanji.tech,
  'experience': techKanji.development,
  'testimonials': techKanji.innovation,
  'clients': techKanji.network,
  'partners': techKanji.network
};

/**
 * Get appropriate kanji for a section title based on keywords
 * 
 * @param {string} title - The section title text
 * @returns {{char: string, meaning: string, unicode: string}|null} Kanji object or null if no match
 * 
 * @example
 * const kanji = getKanjiForSection('Our Services');
 * console.log(kanji.char); // '技術'
 * 
 * const kanji2 = getKanjiForSection('AI Projects');
 * console.log(kanji2.char); // 'AI'
 */
export const getKanjiForSection = (title) => {
  if (!title || typeof title !== 'string') {
    return null;
  }
  
  // Normalize title to lowercase for matching
  const normalizedTitle = title.toLowerCase();
  
  // Check each keyword in the mapping
  for (const [keyword, kanji] of Object.entries(sectionKeywordMap)) {
    if (normalizedTitle.includes(keyword)) {
      return kanji;
    }
  }
  
  // Default to tech kanji if no specific match
  return techKanji.tech;
};

/**
 * Get kanji by explicit category name
 * Useful when you want to specify the exact kanji type
 * 
 * @param {string} category - Category name (e.g., 'tech', 'ai', 'future')
 * @returns {{char: string, meaning: string, unicode: string}|null} Kanji object or null if not found
 * 
 * @example
 * const kanji = getKanjiByName('innovation');
 * console.log(kanji.char); // '革新'
 */
export const getKanjiByName = (category) => {
  if (!category || typeof category !== 'string') {
    return null;
  }
  
  const normalizedCategory = category.toLowerCase();
  return techKanji[normalizedCategory] || null;
};
