import qs from "qs";

const STRAPI_URL = import.meta.env.STRAPI_URL || "http://localhost:1337";
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
    // Limpiar URL base de barras al final
    const cleanBaseUrl = this.baseUrl.replace(/\/+$/, "");
    const url = `${cleanBaseUrl}/api/${endpoint}${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Obtener todos los artículos
  async getArticles(options: StrapiOptions = {}) {
    return this.request("articles", {
      // Sin populate por ahora, solo datos básicos
      sort: ["createdAt:desc"],
      ...options,
    });
  }

  // Obtener un artículo por slug
  async getArticleBySlug(slug: string) {
    return this.request("articles", {
      populate: ["cover"],
      filters: { slug: { $eq: slug } },
    });
  }

  // Obtener información de la empresa (Single Type)
  async getCompany() {
    return this.request("company", {
      populate: ["logo"],
    });
  }

  // ELIMINADO: Métodos Service duplicados - ver SERVICE METHODS modernos más abajo

  // Obtener todos los proyectos
  async getProjects(options: StrapiOptions = {}) {
    return this.request("projects", {
      populate: ["images"],
      sort: ["projectDate:desc"],
      ...options,
    });
  }

  // Obtener un proyecto por slug
  async getProjectBySlug(slug: string) {
    return this.request("projects", {
      populate: ["images"],
      filters: { slug: { $eq: slug } },
    });
  }

  // Obtener proyectos destacados
  async getFeaturedProjects() {
    return this.request("projects", {
      populate: ["images"],
      filters: { featured: { $eq: true } },
      sort: ["projectDate:desc"],
    });
  }

  // Obtener certificaciones
  async getCertifications() {
    return this.request("certifications", {
      populate: ["logo"],
      sort: ["name:asc"],
    });
  }

  // Obtener testimonios
  async getTestimonials(featured: boolean = false) {
    const filters = featured ? { featured: { $eq: true } } : {};

    return this.request("testimonials", {
      populate: ["avatar"],
      filters,
      sort: ["createdAt:desc"],
    });
  }

  // Obtener todos los heroes
  async getHeroes(options: StrapiOptions = {}) {
    return this.request("heroes", {
      populate: ["heroImage", "rating"],
      sort: ["createdAt:desc"],
      ...options,
    });
  }

  // Obtener hero activo (el que se muestra actualmente)
  async getActiveHero() {
    return this.request("heroes/active");
  }

  // Obtener un hero por slug
  async getHeroBySlug(slug: string) {
    return this.request("heroes", {
      populate: ["heroImage", "rating"],
      filters: { slug: { $eq: slug } },
    });
  }

  // Obtener heroes activos solamente
  async getActiveHeroes() {
    return this.request("heroes", {
      populate: ["heroImage", "rating"],
      filters: { isActive: { $eq: true } },
      sort: ["createdAt:desc"],
    });
  }

  // ==================== STEPS METHODS ====================

  // Obtener todos los steps
  async getSteps(options: StrapiOptions = {}) {
    return this.request("steps", {
      sort: ["order:asc"],
      ...options,
    });
  }

  // Obtener steps activos ordenados
  async getActiveSteps() {
    return this.request("steps/active");
  }

  // Obtener un step por slug
  async getStepBySlug(slug: string) {
    return this.request("steps", {
      filters: { slug: { $eq: slug } },
    });
  }

  // Obtener steps por color de fondo
  async getStepsByBackgroundColor(backgroundColor: string) {
    return this.request("steps", {
      filters: {
        backgroundColor: { $eq: backgroundColor },
        isActive: { $eq: true },
      },
      sort: ["order:asc"],
    });
  }

  // ==================== SECTION INFO METHODS ====================

  // Obtener todas las section infos
  async getSectionInfos(options: StrapiOptions = {}) {
    return this.request("section-infos", {
      sort: ["createdAt:desc"],
      populate: ["image"],
      ...options,
    });
  }

  // Obtener section infos activas
  async getActiveSectionInfos() {
    return this.request("section-infos", {
      filters: { isActive: { $eq: true } },
      populate: ["image"],
      sort: ["createdAt:desc"],
    });
  }

  // Obtener una section info por slug
  async getSectionInfoBySlug(slug: string) {
    return this.request("section-infos", {
      filters: { slug: { $eq: slug }, isActive: { $eq: true } },
      populate: ["image"],
    });
  }

  // Obtener la primera section info activa usando filtros estándar
  async getActiveSectionInfo() {
    try {
      console.log("🔍 Obteniendo section info activa (primera)");
      const response = await this.request("section-infos", {
        filters: { isActive: { $eq: true } },
        populate: ["image"],
        sort: ["createdAt:desc"],
      });
      console.log(
        `📊 Section info activa obtenida: ${response?.data ? "Éxito" : "No encontrada"}`
      );
      return response?.data?.[0] || null;
    } catch (error) {
      console.warn("⚠️ Error obteniendo section info activa:", error);
      return null;
    }
  }

  // Obtener section infos por color de fondo
  async getSectionInfosByBackgroundColor(backgroundColor: string) {
    return this.request("section-infos", {
      filters: {
        backgroundColor: { $eq: backgroundColor },
        isActive: { $eq: true },
      },
      populate: ["image"],
      sort: ["createdAt:desc"],
    });
  }

  // ==================== SERVICE METHODS ====================

  // Obtener todos los servicios
  async getServices(options: StrapiOptions = {}) {
    return this.request("services", {
      sort: ["order:asc"],
      populate: "*",
      ...options,
    });
  }

  // Obtener servicios activos ordenados
  async getActiveServices() {
    return this.request("services", {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc"],
      populate: "*",
    });
  }

  // Obtener servicios destacados
  async getFeaturedServices() {
    return this.request("services", {
      filters: {
        isActive: { $eq: true },
        featured: { $eq: true },
      },
      sort: ["order:asc"],
      populate: "*",
    });
  }

  // Obtener un servicio por slug
  async getServiceBySlug(slug: string) {
    return this.request("services", {
      filters: { slug: { $eq: slug }, isActive: { $eq: true } },
      populate: "*",
    });
  }

  // Obtener servicios por color de ícono
  async getServicesByIconColor(iconColor: string) {
    return this.request("services", {
      filters: {
        iconColor: { $eq: iconColor },
        isActive: { $eq: true },
      },
      sort: ["order:asc"],
      populate: "*",
    });
  }

  // Obtener servicios limitados (para homepage)
  async getServicesLimited(limit: number = 6) {
    return this.request("services", {
      filters: { isActive: { $eq: true } },
      sort: ["order:asc"],
      populate: "*",
      pagination: {
        pageSize: limit,
      },
    });
  }

  // === HEADER METHODS ===

  // Obtener todos los headers
  async getHeaders(options: StrapiOptions = {}) {
    return this.request("headers", {
      populate: ["logoFile"],
      ...options,
    });
  }

  // Obtener header activo (para navegación principal)
  async getActiveHeader() {
    try {
      console.log("🔍 Obteniendo header activo");
      const response = await this.request("headers", {
        filters: { isActive: { $eq: true } },
        populate: ["logoFile"],
        sort: ["createdAt:desc"],
      });
      console.log(
        `📊 Header activo obtenido: ${response?.data ? "Éxito" : "No encontrado"}`
      );
      return response?.data?.[0] || null;
    } catch (error) {
      console.warn("⚠️ Error obteniendo header activo:", error);
      return null;
    }
  }

  // Obtener header por slug
  async getHeaderBySlug(slug: string) {
    return this.request("headers", {
      filters: { slug: { $eq: slug }, isActive: { $eq: true } },
      populate: ["logoFile"],
    });
  }

  // Obtener headers activos
  async getActiveHeaders() {
    return this.request("headers", {
      filters: { isActive: { $eq: true } },
      populate: ["logoFile"],
      sort: ["createdAt:desc"],
    });
  }
}

export default new StrapiClient();
