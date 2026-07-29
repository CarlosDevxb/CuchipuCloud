# Cuchipu Cloud

Sitio web corporativo de **Cuchipu Cloud**, empresa de soluciones tecnológicas con sede en Saltillo y Ramos Arizpe, Coahuila, México.

## Servicios

- Desarrollo Web
- Desarrollo de Software a medida
- Servicios Cloud (AWS, infraestructura escalable)
- Redes e Infraestructura
- Ciberseguridad
- Consultoría IT

## Stack del sitio

| Capa | Tecnología |
|------|------------|
| Markup | HTML5 |
| Estilos | CSS3 (variables, grid, flexbox, animaciones) |
| JavaScript | Vanilla JS (módulos IIFE) |
| Formulario de contacto | EmailJS |
| Formulario de empleo | Google Forms (iframe) |
| Despliegue | Nginx + Cloudflare Tunnel |

## Estructura del proyecto

```
├── css/
│   ├── variables.css      # Paleta de colores, tipografía, espaciados
│   ├── base.css           # Reset, tipografía base, utilidades
│   ├── components.css     # Botones, cards, formularios, badges
│   ├── layout.css         # Header, footer, grid base
│   ├── sections.css       # Estilos por sección (hero, servicios, equipo, etc.)
│   ├── animations.css     # Animaciones y transiciones
│   ├── responsive.css     # Media queries (5 breakpoints)
│   └── cookies.css        # Banner de consentimiento de cookies
├── js/
│   ├── components.js      # Carga dinámica de header y footer
│   ├── navigation.js      # Menú móvil y scroll behavior
│   ├── animations.js      # Intersection Observer y animaciones
│   ├── main.js            # Inicialización, slider de testimonios, FAQ accordion
│   ├── contact-form.js    # Validación y envío con EmailJS
│   ├── gallery.js         # Galería del portafolio
│   ├── seo.js             # Meta tags, Open Graph, Schema.org (JSON-LD)
│   └── cookies.js         # Consentimiento de cookies (GDPR/LFPDPPP)
├── images/
│   ├── tech/              # Logos de tecnologías
│   ├── portfolio/         # Imágenes de proyectos
│   └── team/              # Fotos del equipo
├── index.html             # Página principal
├── servicios.html         # Servicios y tecnologías
├── portafolio.html        # Proyectos destacados
├── nosotros.html          # Equipo y historia
├── contacto.html          # Formulario de contacto + formulario de empleo
├── faq.html               # Preguntas frecuentes
├── privacidad.html        # Política de privacidad
├── terminos.html          # Términos y condiciones
├── 404.html               # Página de error
├── robots.txt             # Directivas para crawlers
└── sitemap.xml            # Mapa del sitio
```

## Características

- **Dark theme** permanente (sin dependencia de la configuración del dispositivo)
- **Responsive** con 5 breakpoints: mobile, tablet, laptop, desktop, large
- **Animaciones** con Intersection Observer y `prefers-reduced-motion`
- **SEO** optimizado con meta tags, Open Graph, Twitter Cards y Schema.org
- **Cookies** banner de consentimiento (GDPR/LFPDPPP)
- **Accesibilidad** con ARIA labels, skip links y contraste WCAG

## Despliegue

### Servidor

- **OS:** Ubuntu (Linux)
- **Web server:** Nginx
- **Tunnel:** Cloudflare Tunnel
- **Dominio:** [cuchipu.cloud](https://cuchipu.cloud)
## Contacto

- **Email:** cuchinetworks@gmail.com
- **Teléfono:** +52 (844) 256-4567
- **Web:** [cuchipu.cloud](https://cuchipu.cloud)

## Licencia

© 2026 Cuchipu Cloud. Todos los derechos reservados.
