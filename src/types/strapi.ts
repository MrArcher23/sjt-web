// Tipos base de Strapi v5 (estructura directa, sin attributes wrapper)
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string; // ← URL directa en la raíz
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  width: number;
  height: number;
  url: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi v4 Entity (legacy)
export interface StrapiEntityV4<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Strapi v5 Entity (current structure)
export type StrapiEntity<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

// Content Types específicos

export interface Company {
  name: string;
  slogan: string;
  mission: string;
  vision: string;
  foundedYear: number;
  employeeCount: number;
  phone: string;
  email: string;
  address: string;
  logo: {
    data: StrapiMedia;
  };
}

// Movido abajo - ver SERVICE TYPES moderno

export interface Project {
  title: string;
  slug: string;
  description: string;
  location: string;
  client: string;
  projectDate: string;
  duration: string;
  featured: boolean;
  category:
    | "construccion"
    | "infraestructura"
    | "mantenimiento"
    | "consultoria";
  status: "completed" | "in-progress" | "planned";
  images: {
    data: StrapiMedia[];
  };
}

export interface Certification {
  name: string;
  description: string;
  validUntil: string;
  certificationNumber: string;
  logo: {
    data: StrapiMedia;
  };
}

export interface Testimonial {
  clientName: string;
  clientPosition: string;
  company: string;
  testimonial: string;
  rating: number;
  featured: boolean;
  avatar: {
    data: StrapiMedia;
  };
}

// Hero Collection Type (actualizado para HeroSection)
export interface Hero {
  // Contenido principal
  companyName: string; // se mapea a name_company en el componente
  subtitle?: string;

  // Configuración visual
  showOverlay: boolean; // Control del overlay
  titlePosition: "bottom" | "center"; // Posición del título

  // Media de fondo (solo uno activo a la vez) - Estructura v5: ambos directos
  backgroundVideo?: StrapiMedia; // Estructura corregida: directa, sin .data wrapper
  backgroundImage?: StrapiMedia; // Estructura corregida: directa, sin .data wrapper

  // Configuración adicional
  slug?: string;
  isActive: boolean;
}

// Step Collection Type
export interface Step {
  title: string;
  description: string;
  svgIcon: string;
  order: number;
  isActive: boolean;
  slug?: string;
  backgroundColor?: "yellow" | "blue" | "green" | "purple" | "orange";
}

// Tipos de respuesta de API
export type CompanyResponse = StrapiResponse<Company>;
// Movido abajo - ver SERVICE TYPES moderno
export type ProjectsResponse = StrapiResponse<StrapiEntity<Project>[]>;
export type ProjectResponse = StrapiResponse<StrapiEntity<Project>[]>;
export type CertificationsResponse = StrapiResponse<
  StrapiEntity<Certification>[]
>;
export type TestimonialsResponse = StrapiResponse<StrapiEntity<Testimonial>[]>;
export type HeroesResponse = StrapiResponse<StrapiEntity<Hero>[]>;
export type HeroResponse = StrapiResponse<StrapiEntity<Hero>>;
export type StepsResponse = StrapiResponse<StrapiEntity<Step>[]>;
export type StepResponse = StrapiResponse<StrapiEntity<Step>>;

// === SECTION INFO TYPES ===
export interface SectionInfo {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image?: {
    id: number;
    url: string;
    alternativeText?: string;
    name: string;
    width: number;
    height: number;
  };
  strength1?: string;
  strength2?: string;
  strength3?: string;
  backgroundColor: "white" | "gray" | "blue" | "primary";
  slug?: string;
  isActive: boolean;
}

export type SectionInfosResponse = StrapiResponse<StrapiEntity<SectionInfo>[]>;
export type SectionInfoResponse = StrapiResponse<StrapiEntity<SectionInfo>>;

// === HEADER TYPES ===
export interface Header {
  companyName: string;
  subtitle?: string;
  phoneNumber?: string;
  buttonText: string;
  buttonLink?: string;
  backgroundColor: "blue" | "primary" | "white" | "transparent";
  logoSrc?: string;
  logoFile?: {
    id: number;
    url: string;
    alternativeText?: string;
    name: string;
    width: number;
    height: number;
  };
  logoAlt?: string;
  slug?: string;
  isActive: boolean;
}

export type HeadersResponse = StrapiResponse<StrapiEntity<Header>[]>;
export type HeaderResponse = StrapiResponse<StrapiEntity<Header>>;
