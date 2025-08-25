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

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

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

export interface Service {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  category: 'construccion' | 'infraestructura' | 'mantenimiento' | 'consultoria';
  featured: boolean;
  image: {
    data: StrapiMedia;
  };
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  location: string;
  client: string;
  projectDate: string;
  duration: string;
  featured: boolean;
  category: 'construccion' | 'infraestructura' | 'mantenimiento' | 'consultoria';
  status: 'completed' | 'in-progress' | 'planned';
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

// Tipos de respuesta de API
export type CompanyResponse = StrapiResponse<Company>;
export type ServicesResponse = StrapiResponse<StrapiEntity<Service>[]>;
export type ServiceResponse = StrapiResponse<StrapiEntity<Service>[]>;
export type ProjectsResponse = StrapiResponse<StrapiEntity<Project>[]>;
export type ProjectResponse = StrapiResponse<StrapiEntity<Project>[]>;
export type CertificationsResponse = StrapiResponse<StrapiEntity<Certification>[]>;
export type TestimonialsResponse = StrapiResponse<StrapiEntity<Testimonial>[]>;
