import qs from 'qs';

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.STRAPI_API_TOKEN;

interface StrapiOptions {
  populate?: string | string[] | object;
  sort?: string | string[];
  filters?: object;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

class StrapiClient {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = STRAPI_URL;
    this.token = STRAPI_API_TOKEN;
  }

  private async request(endpoint: string, options: StrapiOptions = {}) {
    const query = qs.stringify(options, { encodeValuesOnly: true });
    const url = `${this.baseUrl}/api/${endpoint}${query ? `?${query}` : ''}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Obtener información de la empresa (Single Type)
  async getCompany() {
    return this.request('company', {
      populate: ['logo']
    });
  }

  // Obtener todos los servicios
  async getServices(options: StrapiOptions = {}) {
    return this.request('services', {
      populate: ['image'],
      sort: ['title:asc'],
      ...options
    });
  }

  // Obtener un servicio por slug
  async getServiceBySlug(slug: string) {
    return this.request('services', {
      populate: ['image'],
      filters: { slug: { $eq: slug } }
    });
  }

  // Obtener servicios destacados
  async getFeaturedServices() {
    return this.request('services', {
      populate: ['image'],
      filters: { featured: { $eq: true } },
      sort: ['title:asc']
    });
  }

  // Obtener todos los proyectos
  async getProjects(options: StrapiOptions = {}) {
    return this.request('projects', {
      populate: ['images'],
      sort: ['projectDate:desc'],
      ...options
    });
  }

  // Obtener un proyecto por slug
  async getProjectBySlug(slug: string) {
    return this.request('projects', {
      populate: ['images'],
      filters: { slug: { $eq: slug } }
    });
  }

  // Obtener proyectos destacados
  async getFeaturedProjects() {
    return this.request('projects', {
      populate: ['images'],
      filters: { featured: { $eq: true } },
      sort: ['projectDate:desc']
    });
  }

  // Obtener certificaciones
  async getCertifications() {
    return this.request('certifications', {
      populate: ['logo'],
      sort: ['name:asc']
    });
  }

  // Obtener testimonios
  async getTestimonials(featured: boolean = false) {
    const filters = featured ? { featured: { $eq: true } } : {};
    
    return this.request('testimonials', {
      populate: ['avatar'],
      filters,
      sort: ['createdAt:desc']
    });
  }
}

export default new StrapiClient();
