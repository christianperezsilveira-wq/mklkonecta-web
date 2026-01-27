export type Language = 'es' | 'en';

export const translations = {
    es: {
        nav: {
            services: 'Servicios',
            about: 'Nosotros',
            solutions: 'Soluciones',
            contact: 'Contacto',
            login: 'Acceso Empleados'
        },
        hero: {
            badge: 'Outsourcing Premium',
            title: 'Outsourcing Innovador para\nel Éxito Global',
            description: 'Potenciando tu negocio con soluciones a medida, servicios profesionales e infraestructura TI de alta gama. Somos el motor de tu éxito operativo.',
            btnPrimary: 'Portal de Acceso',
            btnSecondary: 'Nuestros Servicios'
        },
        services: {
            subtitle: 'Nuestra Experiencia',
            title: 'Nuestros Servicios Especializados',
            items: [
                { title: 'Procesos de Negocio', description: 'Operaciones escalables para el crecimiento empresarial.', image: 'business' },
                { title: 'Soporte TI', description: 'Infraestructura técnica y gestión 24/7.', image: 'it' },
                { title: 'Gestión de Clientes', description: 'Atención y compromiso con el cliente de alto nivel.', image: 'customer' },
                { title: 'Consultoría Estratégica', description: 'Perspectivas de negocio expertas y hojas de ruta.', image: 'strategic' }
            ]
        },
        footer: {
            contactInfo: {
                address1: 'Juan E Oleary 505 Piso 2',
                address2: 'Asunción - Paraguay - 1101',
                phone: '+595 991402 584'
            },
            sections: {
                company: {
                    title: 'EMPRESA',
                    links: [
                        { label: 'Nosotros', href: '#about' },
                        { label: 'Nuestro Equipo', href: '#team' },
                        { label: 'Casos de Éxito', href: '#cases' },
                        { label: 'Carreras', href: '#careers' }
                    ]
                },
                services: {
                    title: 'SERVICIOS',
                    links: [
                        { label: 'Soluciones IT', href: '#it' },
                        { label: 'Servicios BPO', href: '#bpo' },
                        { label: 'Consultoría', href: '#consulting' },
                        { label: 'Automatización', href: '#automation' }
                    ]
                },
                intranet: {
                    title: 'INTRANET',
                    links: [
                        { label: 'Portal', href: '/login' },
                        { label: 'Soporte', href: '#support' },
                        { label: 'Recursos', href: '#resources' }
                    ]
                }
            },
            newsletter: {
                title: 'SUSCRÍBETE A NUESTRO NEWSLETTER',
                description: 'Recibe las últimas novedades sobre transformación empresarial directamente en tu bandeja.',
                placeholder: 'Tu email profesional',
                button: 'SUSCRIBIRSE'
            },
            bottomLinks: {
                privacy: 'POLÍTICA DE PRIVACIDAD',
                terms: 'TÉRMINOS DE SERVICIO',
                cookies: 'POLÍTICA DE COOKIES'
            },
            copyright: 'MKL Konecta. Todos los derechos reservados. Soluciones de Negocio Premium.'
        }
    },
    en: {
        nav: {
            services: 'Services',
            about: 'About',
            solutions: 'Solutions',
            contact: 'Contact',
            login: 'Employee Access'
        },
        hero: {
            badge: 'Premium Outsourcing',
            title: 'Innovative Outsourcing for\nGlobal Success',
            description: 'Empowering your business with tailored solutions, professional services, and high-end IT infrastructure. We are the engine of your operational success.',
            btnPrimary: 'Access Portal',
            btnSecondary: 'Our Services'
        },
        services: {
            subtitle: 'Professional Offerings',
            title: 'Our Specialized Services',
            items: [
                { title: 'Business Process', description: 'Scalable operations for enterprise growth.', image: 'business' },
                { title: 'IT Support', description: '24/7 technical infrastructure management.', image: 'it' },
                { title: 'Customer Management', description: 'High-touch client engagement and care.', image: 'customer' },
                { title: 'Strategic Consultancy', description: 'Expert business insights and roadmapping.', image: 'strategic' }
            ]
        },
        footer: {
            contactInfo: {
                address1: 'Juan E Oleary 505 Floor 2',
                address2: 'Asunción - Paraguay - 1101',
                phone: '+595 991402 584'
            },
            sections: {
                company: {
                    title: 'COMPANY',
                    links: [
                        { label: 'About Us', href: '#about' },
                        { label: 'Our Team', href: '#team' },
                        { label: 'Case Studies', href: '#cases' },
                        { label: 'Careers', href: '#careers' }
                    ]
                },
                services: {
                    title: 'SERVICES',
                    links: [
                        { label: 'IT Solutions', href: '#it' },
                        { label: 'BPO Services', href: '#bpo' },
                        { label: 'Consulting', href: '#consulting' },
                        { label: 'Automation', href: '#automation' }
                    ]
                },
                intranet: {
                    title: 'INTRANET',
                    links: [
                        { label: 'Portal', href: '/login' },
                        { label: 'Support', href: '#support' },
                        { label: 'Resources', href: '#resources' }
                    ]
                }
            },
            newsletter: {
                title: 'SUBSCRIBE TO OUR NEWSLETTER',
                description: 'Get the latest insights on business transformation delivered to your inbox.',
                placeholder: 'Your professional email',
                button: 'SUBSCRIBE'
            },
            bottomLinks: {
                privacy: 'PRIVACY POLICY',
                terms: 'TERMS OF SERVICE',
                cookies: 'COOKIE POLICY'
            },
            copyright: 'MKL Konecta. All rights reserved. Premium Business Solutions.'
        }
    }
};
