# Componente Hero - SJT Contratistas

Componente Hero reutilizable creado siguiendo las mejores prácticas de Astro.

## 🚀 Uso Básico

```astro
---
import Hero from '../components/ui/Hero.astro';
---

<Hero
  title="Su título aquí"
  subtitle="Su descripción aquí"
  buttonText="Texto del botón"
  buttonLink="/destino"
/>
```

## 📋 Props Disponibles

### Props Requeridas
- `title` (string): Título principal del Hero
- `subtitle` (string): Descripción o subtítulo
- `buttonText` (string): Texto del botón principal

### Props Opcionales
- `buttonLink` (string): URL del botón (default: '#services')
- `backgroundColor` ('blue' | 'primary' | 'accent'): Color de fondo (default: 'primary')
- `image` (object): Imagen opcional
  - `src` (string): URL de la imagen
  - `alt` (string): Texto alternativo
- `rating` (object): Calificación y testimonios
  - `stars` (number): Número de estrellas (1-5)
  - `count` (string): Texto del conteo (ej: "2000+")

## 🎨 Slots Disponibles

### `additional-content`
Contenido adicional debajo del subtítulo:

```astro
<Hero title="..." subtitle="..." buttonText="...">
  <div slot="additional-content">
    <p>✓ Certificaciones internacionales</p>
    <p>✓ Garantía de por vida</p>
  </div>
</Hero>
```

### `right-content`
Contenido personalizado del lado derecho (reemplaza imagen):

```astro
<Hero title="..." subtitle="..." buttonText="...">
  <div slot="right-content">
    <div class="bg-white p-6 rounded-lg">
      <!-- Contenido personalizado -->
    </div>
  </div>
</Hero>
```

### `bottom-content`
Contenido adicional en la parte inferior:

```astro
<Hero title="..." subtitle="..." buttonText="...">
  <div slot="bottom-content">
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Estadísticas, testimonios, etc. -->
    </div>
  </div>
</Hero>
```

## 🌈 Ejemplos de Colores

```astro
<!-- Azul corporativo -->
<Hero backgroundColor="blue" ... />

<!-- Color primario de la marca -->
<Hero backgroundColor="primary" ... />

<!-- Color de acento -->
<Hero backgroundColor="accent" ... />
```

## 🖼️ Con Imagen

```astro
<Hero
  title="Título con imagen"
  subtitle="Descripción..."
  buttonText="Botón"
  image={{
    src: "/path/to/image.jpg",
    alt: "Descripción de la imagen"
  }}
/>
```

## ⭐ Con Rating y Testimonios

```astro
<Hero
  title="Título con rating"
  subtitle="Descripción..."
  buttonText="Botón"
  rating={{
    stars: 5,
    count: "2000+"
  }}
/>
```

## 🔧 Ejemplo Completo

```astro
<Hero
  title="Su socio confiable en construcción"
  subtitle="Con más de 20 años de experiencia en el mercado mexicano."
  buttonText="Ver servicios"
  buttonLink="/services"
  backgroundColor="primary"
  rating={{
    stars: 5,
    count: "1500+"
  }}
  image={{
    src: "https://ejemplo.com/trabajador.jpg",
    alt: "Trabajador de construcción con casco"
  }}
>
  <div slot="additional-content">
    <p class="text-blue-200 mb-2">✓ Certificaciones ISO</p>
    <p class="text-blue-200">✓ Garantía en todos los proyectos</p>
  </div>
  
  <div slot="bottom-content">
    <div class="bg-white/10 rounded-xl p-8">
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div class="text-3xl font-bold mb-2">20+</div>
          <p>Años de experiencia</p>
        </div>
        <div>
          <div class="text-3xl font-bold mb-2">500+</div>
          <p>Proyectos completados</p>
        </div>
        <div>
          <div class="text-3xl font-bold mb-2">100%</div>
          <p>Satisfacción garantizada</p>
        </div>
      </div>
    </div>
  </div>
</Hero>
```

## ✨ Características

- ✅ Completamente responsive
- ✅ Soporte para TypeScript
- ✅ Múltiples slots para personalización
- ✅ Tres esquemas de color predefinidos
- ✅ Imagen opcional con efectos decorativos
- ✅ Sistema de rating con estrellas
- ✅ Animaciones suaves con Tailwind CSS
- ✅ Optimizado para SEO y accesibilidad
