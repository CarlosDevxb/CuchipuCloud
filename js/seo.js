/**
 * CUCHIPU CLOUD - SEO Manager
 * Inyección dinámica de meta tags SEO, Open Graph, Twitter Cards y Schema.org
 */

const SEO = (() => {
    'use strict';

    const SITE_URL = 'https://cuchipu.cloud';
    const SITE_NAME = 'Cuchipu Cloud';
    const DEFAULT_IMAGE = 'images/CuchipuCloud.png';
    const TWITTER_HANDLE = '@cuchipu_cloud';

    const pageConfig = {
        'index': {
            title: 'Cuchipu Cloud - Soluciones Tecnológicas Innovadoras',
            description: 'Desarrollamos software de vanguardia, creamos experiencias web excepcionales y construimos infraestructura cloud escalable para impulsar tu negocio.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: SITE_NAME,
                url: SITE_URL,
                description: 'Servicios de desarrollo de software, desarrollo web, redes e infraestructura cloud',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: SITE_URL + '/buscar?q={search_term_string}',
                    'query-input': 'required name=search_term_string'
                }
            }
        },
        'servicios': {
            title: 'Servicios - Cuchipu Cloud',
            description: 'Servicios de desarrollo web, software a medida, cloud computing, redes, ciberseguridad y consultoría IT para empresas.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'Service',
                serviceType: 'Tecnología de la Información',
                provider: { '@type': 'Organization', name: SITE_NAME },
                areaServed: 'Latinoamérica',
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Servicios IT',
                    itemListElement: [
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Web' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de Software' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Servicios Cloud' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ciberseguridad' } }
                    ]
                }
            }
        },
        'portafolio': {
            title: 'Portafolio - Cuchipu Cloud',
            description: 'Descubre los proyectos de desarrollo web, software y cloud que hemos desarrollado para nuestros clientes.',
            type: 'website'
        },
        'nosotros': {
            title: 'Nosotros - Cuchipu Cloud',
            description: 'Conoce al equipo de Cuchipu Cloud, tu socio tecnológico de confianza con más de 5 años de experiencia en transformación digital.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: SITE_NAME,
                url: SITE_URL,
                logo: SITE_URL + '/images/CuchipuCloud.png',
                description: 'Empresa de desarrollo de software, cloud computing y servicios IT',
                foundingDate: '2019',
                numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+52-844-256-4567',
                    contactType: 'customer service',
                    email: 'cuchinetworks@gmail.com',
                    availableLanguage: 'Spanish'
                },
                sameAs: [
                    'https://facebook.com/cuchipucloud',
                    'https://github.com/cuchipucloud'
                ]
            }
        },
        'contacto': {
            title: 'Contacto - Cuchipu Cloud',
            description: 'Contacta a Cuchipu Cloud para solicitar un presupuesto o consulta sobre nuestros servicios de desarrollo web, software y cloud.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'ContactPage',
                name: 'Contacto - ' + SITE_NAME,
                url: SITE_URL + '/contacto.html',
                mainEntity: {
                    '@type': 'Organization',
                    name: SITE_NAME,
                    contactPoint: {
                        '@type': 'ContactPoint',
                        telephone: '+52-844-256-4567',
                        contactType: 'customer service',
                        email: 'cuchinetworks@gmail.com'
                    }
                }
            }
        },
        'faq': {
            title: 'Preguntas Frecuentes - Cuchipu Cloud',
            description: 'Respuestas a las preguntas más comunes sobre nuestros servicios de desarrollo web, software, cloud y ciberseguridad.',
            type: 'website',
            schema: {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: '¿Cuánto tiempo tarda en desarrollarse un proyecto web?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'El tiempo de desarrollo varía según la complejidad. Un sitio web básico puede tardar 2-4 semanas, mientras que una aplicación web compleja puede tomar 3-6 meses.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: '¿Ofrecen soporte post-venta?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Sí, todos nuestros proyectos incluyen soporte técnico post-venta con diferentes planes de mantenimiento.'
                        }
                    }
                ]
            }
        },
        'terminos': {
            title: 'Términos y Condiciones - Cuchipu Cloud',
            description: 'Términos y condiciones de uso del sitio web y servicios de Cuchipu Cloud.',
            type: 'website'
        },
        'privacidad': {
            title: 'Política de Privacidad - Cuchipu Cloud',
            description: 'Política de privacidad y protección de datos personales de Cuchipu Cloud.',
            type: 'website'
        }
    };

    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }

    function setMetaTag(attr, attrValue, content) {
        let tag = document.querySelector(`meta[${attr}="${attrValue}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attr, attrValue);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    }

    function setCanonical(url) {
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }

    function injectSchema(schema) {
        if (!schema) return;
        const existing = document.getElementById('schema-org');
        if (existing) existing.remove();

        const script = document.createElement('script');
        script.id = 'schema-org';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function init() {
        const page = getCurrentPage();
        const config = pageConfig[page];
        if (!config) return;

        const pageUrl = SITE_URL + '/' + page + '.html';
        const imageUrl = SITE_URL + '/' + DEFAULT_IMAGE;

        document.title = config.title;

        setMetaTag('name', 'description', config.description);
        setCanonical(pageUrl);

        // Open Graph
        setMetaTag('property', 'og:type', config.type);
        setMetaTag('property', 'og:url', pageUrl);
        setMetaTag('property', 'og:title', config.title);
        setMetaTag('property', 'og:description', config.description);
        setMetaTag('property', 'og:image', imageUrl);
        setMetaTag('property', 'og:site_name', SITE_NAME);
        setMetaTag('property', 'og:locale', 'es_ES');

        // Twitter Cards
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:site', TWITTER_HANDLE);
        setMetaTag('name', 'twitter:title', config.title);
        setMetaTag('name', 'twitter:description', config.description);
        setMetaTag('name', 'twitter:image', imageUrl);

        // Schema.org
        if (config.schema) {
            config.schema.url = pageUrl;
            injectSchema(config.schema);
        }
    }

    return { init };
})();

SEO.init();