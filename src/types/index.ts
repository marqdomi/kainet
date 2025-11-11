// Common type definitions for the application

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  image?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

export interface EasterEgg {
  code: string;
  name: string;
  action: () => void;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  stagger?: number;
}

export interface ParallaxConfig {
  offset?: number;
  speed?: number;
  easing?: string;
}

// React component prop types
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}
