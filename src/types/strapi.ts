// Tipos base de Strapi
export interface StrapiMedia {
  id: number;
  attributes: {
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
    url: string;
  };
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
export interface Article {
  title: string;
  slug: string;
  description: string;
  cover: {
    data: StrapiMedia;
  };
  author: string;
  category: string;
  blocks: any; // Para contenido rich text
}

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

// Rating component para heroes y testimonios
export interface Rating {
  stars: number;
  count: string;
}

// Hero Collection Type
export interface Hero {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  backgroundColor?: "blue" | "primary" | "accent";
  heroImage?: {
    id: number;
    url: string;
    alternativeText?: string;
    name: string;
    width: number;
    height: number;
  };
  rating?: Rating;
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
export type ArticlesResponse = StrapiResponse<StrapiEntity<Article>[]>;
export type ArticleResponse = StrapiResponse<StrapiEntity<Article>[]>;
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

// === SERVICE TYPES (MODERNO) ===
export interface Service {
  title: string;
  description: string;
  svgIcon?: string;
  iconColor: "blue" | "green" | "yellow" | "purple" | "orange" | "red";
  order: number;
  slug?: string;
  isActive: boolean;
  featured: boolean;
}

export type ServicesResponse = StrapiResponse<StrapiEntity<Service>[]>;
export type ServiceResponse = StrapiResponse<StrapiEntity<Service>>;

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
