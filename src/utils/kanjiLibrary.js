/**
 * Kanji Library - Tech-themed Japanese characters for KAINET
 * 
 * This library provides a curated collection of technology-related kanji
 * characters for use in visual effects and UI elements throughout the site.
 * 
 * @module kanjiLibrary
 */

/**
 * Tech-themed kanji dictionary with meanings and unicode values
 * @type {Object.<string, {char: string, meaning: string, unicode: string}>}
 */
export const techKanji = {
  tech: { 
    char: '技術', 
    meaning: 'Technology', 
    unicode: '\u6280\u8853' 
  },
  ai: { 
    char: 'AI', 
    meaning: 'Artificial Intelligence', 
    unicode: 'AI' 
  },
  future: { 
    char: '未来', 
    meaning: 'Future', 
    unicode: '\u672a\u6765' 
  },
  innovation: { 
    char: '革新', 
    meaning: 'Innovation', 
    unicode: '\u9769\u65b0' 
  },
  development: { 
    char: '開発', 
    meaning: 'Development', 
    unicode: '\u958b\u767a' 
  },
  automation: { 
    char: '自動', 
    meaning: 'Automation', 
    unicode: '\u81ea\u52d5' 
  },
  network: { 
    char: '網', 
    meaning: 'Network', 
    unicode: '\u7db2' 
  },
  data: { 
    char: 'データ', 
    meaning: 'Data', 
    unicode: '\u30c7\u30fc\u30bf' 
  },
  cloud: { 
    char: '雲', 
    meaning: 'Cloud', 
    unicode: '\u96f2' 
  },
  code: { 
    char: 'コード', 
    meaning: 'Code', 
    unicode: '\u30b3\u30fc\u30c9' 
  }
};

/**
 * Get a random kanji from the tech kanji dictionary
 * 
 * @returns {{char: string, meaning: string, unicode: string}} Random kanji object
 * 
 * @example
 * const kanji = getRandomKanji();
 * console.log(kanji.char); // '技術' or any other kanji
 * console.log(kanji.meaning); // 'Technology' or corresponding meaning
 */
export const getRandomKanji = () => {
  const keys = Object.keys(techKanji);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return techKanji[randomKey];
};

/**
 * Get a kanji character based on project category
 * Maps common project categories to appropriate kanji characters
 * 
 * @param {string} category - The project category (e.g., 'AI', 'Web', 'Automation', 'MLOps')
 * @returns {{char: string, meaning: string, unicode: string}} Mapped kanji object
 * 
 * @example
 * const aiKanji = getKanjiByCategory('AI');
 * console.log(aiKanji.char); // 'AI'
 * 
 * const webKanji = getKanjiByCategory('Web');
 * console.log(webKanji.char); // '網' (network)
 */
export const getKanjiByCategory = (category) => {
  const mapping = {
    'AI': techKanji.ai,
    'Web': techKanji.network,
    'Automation': techKanji.automation,
    'MLOps': techKanji.data,
    'Cloud': techKanji.cloud,
    'Development': techKanji.development,
    'Innovation': techKanji.innovation,
    'Future': techKanji.future,
    'Code': techKanji.code
  };
  
  // Return mapped kanji or default to 'tech' if category not found
  return mapping[category] || techKanji.tech;
};
