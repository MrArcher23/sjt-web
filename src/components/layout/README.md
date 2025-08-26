# Componente Header - SJT Contratistas

Componente Header responsive y reutilizable creado con **Mobile First approach** siguiendo las mejores prácticas de Astro.

## 🚀 Uso Básico

```astro
---
import Header from '../components/layout/Header.astro';
---

<Header
  companyName="SJT Contratistas"
  buttonText="Contacto"
  phoneNumber="(555) 123-4567"
/>
```

## 📋 Props Disponibles

### Props Requeridas
- `companyName` (string): Nombre de la empresa

### Props Opcionales
- `buttonText` (string): Texto del botón principal (default: 'Contacto')
- `buttonLink` (string): URL del botón (default: '/contact')
- `phoneNumber` (string): Número de teléfono para mostrar y llamar
- `backgroundColor` ('blue' | 'primary' | 'white' | 'transparent'): Color de fondo (default: 'primary')
- `logoSrc` (string): URL del logo personalizado
- `logoAlt` (string): Texto alternativo del logo

## 🎨 Esquemas de Color

```astro
<!-- Azul corporativo -->
<Header backgroundColor="blue" ... />

<!-- Color primario (default) -->
<Header backgroundColor="primary" ... />

<!-- Fondo blanco con sombra -->
<Header backgroundColor="white" ... />

<!-- Transparente -->
<Header backgroundColor="transparent" ... />
```

## 📱 Características Mobile First

### Mobile (< 1024px):
- ✅ Logo + nombre compacto
- ✅ Botón de teléfono rápido
- ✅ Botón de contacto
- ✅ Menú hamburguesa animado
- ✅ Navegación colapsible

### Desktop (≥ 1024px):
- ✅ Navegación horizontal completa
- ✅ Teléfono visible con ícono
- ✅ Botón destacado
- ✅ Logo más grande

## 🎯 Slots Disponibles

### `tagline`
Eslogan o descripción breve de la empresa:

```astro
<Header companyName="SJT Contratistas">
  <span slot="tagline">Construcción e Infraestructura</span>
</Header>
```

### `navigation`
Navegación principal (desktop):

```astro
<Header companyName="...">
  <div slot="navigation" class="flex items-center gap-6">
    <a href="/" class="hover:text-yellow-400 transition-colors">Inicio</a>
    <a href="/services" class="hover:text-yellow-400 transition-colors">Servicios</a>
    <a href="/projects" class="hover:text-yellow-400 transition-colors">Proyectos</a>
  </div>
</Header>
```

### `mobile-navigation`
Navegación para dispositivos móviles:

```astro
<Header companyName="...">
  <div slot="mobile-navigation" class="space-y-3">
    <a href="/" class="block py-2 px-4 hover:bg-white/10 rounded-lg">Inicio</a>
    <a href="/services" class="block py-2 px-4 hover:bg-white/10 rounded-lg">Servicios</a>
  </div>
</Header>
```

### `mobile-extra`
Contenido adicional en el menú móvil:

```astro
<Header companyName="...">
  <div slot="mobile-extra" class="border-t border-white/20 pt-4">
    <div class="text-center">
      <p class="text-sm opacity-90">Atención 24/7</p>
      <a href="tel:555123456" class="text-yellow-400 font-semibold">Llamar ahora</a>
    </div>
  </div>
</Header>
```

## 🔧 Ejemplo Completo

```astro
<Header 
  companyName="SJT Contratistas"
  buttonText="Obtener cotización"
  buttonLink="/quote"
  phoneNumber="(555) 123-4567"
  backgroundColor="primary"
  logoSrc="/logo.png"
  logoAlt="Logo SJT Contratistas"
>
  <!-- Tagline -->
  <span slot="tagline">Construcción e Infraestructura</span>
  
  <!-- Navegación Desktop -->
  <div slot="navigation" class="flex items-center gap-6">
    <a href="/" class="hover:text-yellow-400 transition-colors font-medium">Inicio</a>
    <a href="/about" class="hover:text-yellow-400 transition-colors font-medium">Nosotros</a>
    <a href="/services" class="hover:text-yellow-400 transition-colors font-medium">Servicios</a>
    <a href="/projects" class="hover:text-yellow-400 transition-colors font-medium">Proyectos</a>
    <a href="/contact" class="hover:text-yellow-400 transition-colors font-medium">Contacto</a>
  </div>
  
  <!-- Navegación Mobile -->
  <div slot="mobile-navigation" class="space-y-3">
    <a href="/" class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">Inicio</a>
    <a href="/about" class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">Nosotros</a>
    <a href="/services" class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">Servicios</a>
    <a href="/projects" class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">Proyectos</a>
    <a href="/contact" class="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors">Contacto</a>
  </div>

  <!-- Contenido adicional mobile -->
  <div slot="mobile-extra" class="border-t border-white/20 pt-4">
    <div class="text-center">
      <p class="text-sm opacity-90 mb-2">Emergencias 24/7</p>
      <a href="tel:5551234567" class="text-yellow-400 font-semibold">(555) 123-4567</a>
      <div class="mt-3 pt-3 border-t border-white/20">
        <p class="text-xs opacity-75">Síguenos en redes sociales</p>
      </div>
    </div>
  </div>
</Header>
```

## ✨ Características Técnicas

### JavaScript Integrado
- ✅ **Menú hamburguesa**: Toggle automático con animación
- ✅ **Accesibilidad**: ARIA labels y estados
- ✅ **Iconos dinámicos**: Hamburguesa ↔ X

### Responsive Design
- ✅ **Mobile First**: Optimizado desde 320px
- ✅ **Breakpoints**: `lg:` para desktop (1024px+)
- ✅ **Touch friendly**: Botones de 44px mínimo

### Performance
- ✅ **Sticky header**: `position: sticky`
- ✅ **Lazy loading**: Imágenes con `loading="lazy"`
- ✅ **Transitions**: Animaciones CSS optimizadas

### Accesibilidad
- ✅ **Semantic HTML**: `<header>`, `<nav>`, `<button>`
- ✅ **ARIA attributes**: `aria-label`, `aria-expanded`
- ✅ **Keyboard navigation**: Soporte completo
- ✅ **Screen reader**: Textos descriptivos

## 📱 Casos de Uso

### 1. **Sitio corporativo estándar**
```astro
<Header 
  companyName="Tu Empresa" 
  backgroundColor="primary" 
  phoneNumber="(555) 123-4567"
/>
```

### 2. **Landing page con CTA destacado**
```astro
<Header 
  companyName="Tu Servicio" 
  buttonText="Probar gratis"
  buttonLink="/signup"
  backgroundColor="white"
/>
```

### 3. **Header transparente sobre Hero**
```astro
<Header 
  companyName="Tu Marca"
  backgroundColor="transparent"
  buttonText="Comenzar"
/>
```

## 🎨 Personalización de Colores

Los colores se adaptan automáticamente según `backgroundColor`:

| Background | Text Color | Button Style |
|------------|------------|--------------|
| `primary` | Blanco | Amarillo |
| `blue` | Blanco | Amarillo |
| `white` | Gris oscuro | Azul primario |
| `transparent` | Blanco | Amarillo |

## ⚡ Performance Tips

1. **Preload fonts** en el `<head>` de la página
2. **Optimiza logo** (SVG recomendado)
3. **Usa WebP** para logos raster
4. **Minimiza slots** en mobile para mejor UX

## 🔗 Integración con Otros Componentes

```astro
<!-- Uso típico con Hero -->
<Header companyName="SJT" backgroundColor="transparent" />
<Hero title="Bienvenidos" ... />

<!-- Uso con layout -->
<Header companyName="SJT" backgroundColor="white" />
<main class="pt-20"> <!-- Compensar header sticky -->
  <!-- Contenido -->
</main>
```
