// Common type definitions for the application

// ===== Blog Types =====
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

// ===== Project Types =====
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

// ===== Service Types =====
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// ===== Feature Flags Types =====
export interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

// ===== Easter Egg Types =====
export interface EasterEgg {
  code: string;
  name: string;
  action: () => void;
}

export type SpecialDateEffect = 'sakuraPetals' | 'fireworks' | null;

export interface EasterEggContextType {
  matrixRainActive: boolean;
  toriiAnimationActive: boolean;
  specialDateEffect: SpecialDateEffect;
  handleLogoClick: () => void;
  dismissMatrixRain: () => void;
  dismissToriiAnimation: () => void;
  activateMatrixRain: () => void;
  activateToriiAnimation: () => void;
}

// ===== Animation Types =====
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  stagger?: number;
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
  repeatDelay?: number;
}

export interface ParallaxConfig {
  offset?: number;
  speed?: number;
  easing?: string;
}

export interface MotionVariants {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
  whileInView?: Record<string, any>;
}

// ===== Component Prop Types =====
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

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'holographic' | 'glass' | 'neon';
  onClick?: () => void;
  href?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

// ===== Form Types =====
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
}

export interface FormData {
  [key: string]: string | number | boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

// ===== API Response Types =====
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

// ===== Route Types =====
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  title?: string;
  description?: string;
  protected?: boolean;
}

// ===== Effect Component Props =====
export interface ParticlesProps extends BaseComponentProps {
  count?: number;
  speed?: number;
  colors?: string[];
}

export interface LiquidEtherProps extends BaseComponentProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export interface PageTransitionProps extends BaseComponentProps {
  duration?: number;
}

// ===== Utility Types =====
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

