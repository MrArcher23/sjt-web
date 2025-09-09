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
      const errorText = await response.text();
      throw new Error(`Strapi request failed: ${response.statusText} - ${errorText}`);
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
      populate: ["backgroundVideo", "backgroundImage"],
      sort: ["createdAt:desc"],
      ...options,
    });
  }

  // Obtener hero activo (el que se muestra actualmente)
  async getActiveHero() {
    try {
      const response = await this.request("heroes", {
        filters: { isActive: { $eq: true } },
        populate: ["backgroundVideo", "backgroundImage"],
        sort: ["createdAt:desc"],
      });
      return response?.data?.[0] || null;
    } catch (error) {
      return null;
    }
  }

  // Obtener un hero por slug
  async getHeroBySlug(slug: string) {
    return this.request("heroes", {
      populate: ["backgroundVideo", "backgroundImage"],
      filters: { slug: { $eq: slug } },
    });
  }

  // Obtener heroes activos solamente
  async getActiveHeroes() {
    return this.request("heroes", {
      populate: ["backgroundVideo", "backgroundImage"],
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
      const response = await this.request("section-infos", {
        filters: { isActive: { $eq: true } },
        populate: ["image"],
        sort: ["createdAt:desc"],
      });
      return response?.data?.[0] || null;
    } catch (error) {
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
      const response = await this.request("headers", {
        filters: { isActive: { $eq: true } },
        populate: ["logoFile"],
        sort: ["createdAt:desc"],
      });
      return response?.data?.[0] || null;
    } catch (error) {
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

  // ===== SERVICE GALLERY =====
  // Obtener servicios de galería (4 servicios para la galería visual)
  async getGalleryServices(options: StrapiOptions = {}) {
    return this.request("services", {
      populate: ["image"],
      ...options,
    });
  }

  // Obtener servicios activos para galería (endpoint personalizado)
  async getActiveGalleryServices() {
    return this.request("services/active");
  }

  // Obtener servicio por orden específico
  async getGalleryServiceByOrder(order: number) {
    return this.request(`services/order/${order}`);
  }

  // Obtener servicio de galería por slug
  async getGalleryServiceBySlug(slug: string, options: StrapiOptions = {}) {
    return this.request("services", {
      filters: { slug: { $eq: slug } },
      populate: ["image"],
      ...options,
    });
  }

  // ==================== TITLE SECTION INFO METHODS ====================

  // Obtener todas las title section infos
  async getTitleSectionInfos(options: StrapiOptions = {}) {
    return this.request("title-section-infos", {
      populate: {
        image: true,
        floatingElement1: true,
        floatingElement2: true,
      },
      sort: ["createdAt:desc"],
      ...options,
    });
  }

  // Obtener title section info por identifier
  async getTitleSectionInfoByIdentifier(identifier: string) {
    try {
      const response = await this.request("title-section-infos", {
        filters: { identifier: { $eq: identifier } },
        populate: {
          image: true,
          floatingElement1: true,
          floatingElement2: true,
        },
      });
      return response?.data?.[0] || null;
    } catch (error) {
      return null;
    }
  }

  // Obtener title section info por slug (si decides usar slug en el futuro)
  async getTitleSectionInfoBySlug(slug: string) {
    return this.request("title-section-infos", {
      filters: { slug: { $eq: slug } },
      populate: {
        image: true,
        floatingElement1: true,
        floatingElement2: true,
      },
    });
  }

  // ==================== PROJECT SHOWCASE METHODS ====================

  // Obtener todos los project showcases
  async getProjectShowcases(options: StrapiOptions = {}) {
    return this.request("project-showcases", {
      populate: {
        heroImage: true,
        stats: true,
        highlights: true,
      },
      sort: ["createdAt:desc"],
      ...options,
    });
  }

  // Obtener project showcase por identifier
  async getProjectShowcaseByIdentifier(identifier: string) {
    try {
      const response = await this.request("project-showcases", {
        filters: { identifier: { $eq: identifier } },
        populate: {
          heroImage: true,
          stats: true,
          highlights: true,
        },
      });
      return response?.data?.[0] || null;
    } catch (error) {
      return null;
    }
  }

  // Obtener project showcase por slug (si decides usar slug en el futuro)
  async getProjectShowcaseBySlug(slug: string) {
    return this.request("project-showcases", {
      filters: { slug: { $eq: slug } },
      populate: {
        heroImage: true,
        stats: true,
        highlights: true,
      },
    });
  }

  // ==================== PROJECT CARD METHODS ====================

  // Obtener todas las project cards
  async getProjectCards(options: StrapiOptions = {}) {
    return this.request("project-cards", {
      populate: {
        image: true,
        tags: true,
      },
      sort: ["year:desc", "createdAt:desc"],
      ...options,
    });
  }

  // Obtener project cards con filtros múltiples
  async getProjectCardsFiltered(
    filters: {
      categories?: string[];
      statuses?: string[];
      years?: string[];
      limit?: number;
    } = {}
  ) {
    const { categories, statuses, years, limit = 50 } = filters;

    let filterQuery: any = {};

    if (categories?.length) {
      filterQuery.category = { $in: categories };
    }

    if (statuses?.length) {
      filterQuery.status = { $in: statuses };
    }

    if (years?.length) {
      filterQuery.year = { $in: years };
    }

    return this.request("project-cards", {
      filters: filterQuery,
      populate: {
        image: true,
        tags: true,
      },
      pagination: { pageSize: limit },
      sort: ["year:desc", "createdAt:desc"],
    });
  }

  // Obtener project cards por categoría
  async getProjectCardsByCategory(category: string) {
    return this.request("project-cards", {
      filters: { category: { $eq: category } },
      populate: {
        image: true,
        tags: true,
      },
      sort: ["createdAt:desc"],
    });
  }

  // Obtener project cards por estado
  async getProjectCardsByStatus(status: string) {
    return this.request("project-cards", {
      filters: { status: { $eq: status } },
      populate: {
        image: true,
        tags: true,
      },
      sort: ["createdAt:desc"],
    });
  }

  // Obtener project card por slug (si decides usar slug en el futuro)
  async getProjectCardBySlug(slug: string) {
    return this.request("project-cards", {
      filters: { slug: { $eq: slug } },
      populate: {
        image: true,
        tags: true,
      },
    });
  }
}

export default new StrapiClient();
