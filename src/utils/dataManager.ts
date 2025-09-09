// 🚀 DATA MANAGER CENTRALIZADO - Solución al problema crítico de BaseLayout
// Resuelve: Múltiples llamadas al mismo endpoint desde diferentes páginas

import strapi from "./strapi";
import type {
  StrapiEntity,
  Header as HeaderType,
  Hero as HeroType,
} from "../types/strapi";

interface SharedData {
  header: StrapiEntity<HeaderType> | null;
  activeHero: StrapiEntity<HeroType> | null;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live en milliseconds
}

class DataManager {
  private static cache = new Map<string, CacheEntry<any>>();
  private static readonly DEFAULT_TTL = 300000; // 5 minutos

  // 📊 Métricas de performance
  private static stats = {
    hits: 0,
    misses: 0,
    totalCalls: 0,
    totalTime: 0,
  };

  /**
   * 🎯 MÉTODO PRINCIPAL: Obtener datos compartidos con cache
   * Resuelve el problema de BaseLayout llamando getActiveHeader() en cada página
   */
  static async getSharedData(): Promise<SharedData> {
    const cacheKey = "shared-data";
    const startTime = performance.now();

    // 🎯 Verificar cache primero
    const cached = this.getFromCache<SharedData>(cacheKey);
    if (cached) {
      this.stats.hits++;
      console.log(`🎯 Cache HIT: ${cacheKey} - Tiempo: 0ms`);
      return cached;
    }

    // 📡 Cache MISS - Fetch datos en paralelo
    this.stats.misses++;
    console.log(`📡 Cache MISS: ${cacheKey} - Fetching datos compartidos...`);

    try {
      const [header, activeHero] = await Promise.all([
        this.getActiveHeaderCached(),
        this.getActiveHeroCached(),
      ]);

      const sharedData: SharedData = {
        header,
        activeHero,
      };

      // 💾 Guardar en cache
      this.setCache(cacheKey, sharedData, this.DEFAULT_TTL);

      const endTime = performance.now();
      const duration = endTime - startTime;
      this.stats.totalCalls++;
      this.stats.totalTime += duration;

      console.log(
        `✅ Datos compartidos obtenidos - Tiempo: ${duration.toFixed(2)}ms`
      );
      console.log(
        `📊 Cache Stats - Hits: ${this.stats.hits}, Misses: ${this.stats.misses}`
      );

      return sharedData;
    } catch (error) {
      console.error("❌ Error obteniendo datos compartidos:", error);
      // Retornar datos vacíos en caso de error
      return {
        header: null,
        activeHero: null,
      };
    }
  }

  /**
   * 🏠 Header con cache individual (fallback para componentes específicos)
   */
  private static async getActiveHeaderCached(): Promise<StrapiEntity<HeaderType> | null> {
    const cacheKey = "active-header";

    const cached = this.getFromCache<StrapiEntity<HeaderType> | null>(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    try {
      const header = await strapi.getActiveHeader();
      this.setCache(cacheKey, header, this.DEFAULT_TTL);
      return header;
    } catch (error) {
      console.warn("⚠️ Error obteniendo header:", error);
      this.setCache(cacheKey, null, this.DEFAULT_TTL);
      return null;
    }
  }

  /**
   * 🦸 Hero con cache individual (para páginas que lo necesiten)
   */
  private static async getActiveHeroCached(): Promise<StrapiEntity<HeroType> | null> {
    const cacheKey = "active-hero";

    const cached = this.getFromCache<StrapiEntity<HeroType> | null>(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    try {
      const hero = await strapi.getActiveHero();
      this.setCache(cacheKey, hero, this.DEFAULT_TTL);
      return hero;
    } catch (error) {
      console.warn("⚠️ Error obteniendo hero:", error);
      this.setCache(cacheKey, null, this.DEFAULT_TTL);
      return null;
    }
  }

  /**
   * 📄 Método para datos específicos de página (futuro uso)
   */
  static async getPageData(
    pageId: string,
    fetcher: () => Promise<any>
  ): Promise<any> {
    const cacheKey = `page-${pageId}`;

    const cached = this.getFromCache(cacheKey);
    if (cached !== undefined) {
      this.stats.hits++;
      console.log(`🎯 Cache HIT: ${cacheKey}`);
      return cached;
    }

    this.stats.misses++;
    console.log(`📡 Cache MISS: ${cacheKey} - Fetching...`);

    try {
      const data = await fetcher();
      this.setCache(cacheKey, data, this.DEFAULT_TTL);
      return data;
    } catch (error) {
      console.error(`❌ Error obteniendo datos de página ${pageId}:`, error);
      this.setCache(cacheKey, null, this.DEFAULT_TTL);
      return null;
    }
  }

  // 🔧 MÉTODOS INTERNOS DE CACHE

  private static getFromCache<T>(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Verificar si el cache ha expirado
    const now = Date.now();
    if (now > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      console.log(`⏰ Cache EXPIRED: ${key}`);
      return undefined;
    }

    return entry.data as T;
  }

  private static setCache<T>(
    key: string,
    data: T,
    ttl: number = this.DEFAULT_TTL
  ): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    this.cache.set(key, entry);
    console.log(`💾 Cache SET: ${key} (TTL: ${ttl}ms)`);
  }

  /**
   * 🧹 Limpiar cache (útil para desarrollo)
   */
  static clearCache(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, totalCalls: 0, totalTime: 0 };
    console.log("🧹 Cache limpiado");
  }

  /**
   * 📊 Obtener estadísticas de performance
   */
  static getStats() {
    const hitRate =
      this.stats.hits + this.stats.misses > 0
        ? (
            (this.stats.hits / (this.stats.hits + this.stats.misses)) *
            100
          ).toFixed(1)
        : "0";

    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      avgTime:
        this.stats.totalCalls > 0
          ? (this.stats.totalTime / this.stats.totalCalls).toFixed(2) + "ms"
          : "0ms",
    };
  }

  /**
   * 🎯 Método de conveniencia para obtener solo el header (mantiene compatibilidad)
   */
  static async getHeader(): Promise<StrapiEntity<HeaderType> | null> {
    const sharedData = await this.getSharedData();
    return sharedData.header;
  }

  /**
   * 🦸 Método de conveniencia para obtener solo el hero (mantiene compatibilidad)
   */
  static async getHero(): Promise<StrapiEntity<HeroType> | null> {
    const sharedData = await this.getSharedData();
    return sharedData.activeHero;
  }
}

export default DataManager;
