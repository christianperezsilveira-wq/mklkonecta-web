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
        },
        contact: {
            badge: 'Atención Exclusiva',
            title: 'Hablemos de tu próximo gran proyecto',
            description: 'Nuestro equipo de asesores está listo para diseñar la solución de outsourcing y tecnología perfecta para tu empresa.',
            infoTitle: 'Información Corporativa',
            infoSubtitle: 'Estamos ubicados en el corazón financiero, listos para atender las necesidades de clientes globales.',
            formTitle: 'Envíanos un Mensaje',
            formName: 'Nombre Completo',
            formEmail: 'Correo Corporativo',
            formCompany: 'Empresa',
            formMessage: '¿En qué podemos ayudarte?',
            formSuccess: 'Mensaje enviado con éxito. Un asesor se comunicará a la brevedad.',
            formSubmit: 'Solicitar Asesoramiento'
        },
        serviciosPage: {
            hero: {
                badge: 'Soluciones Enterprise',
                title: 'Transformando Negocios con Soluciones Expertas',
                description: 'Nuestra suite completa de servicios empresariales está diseñada para impulsar su negocio, optimizar operaciones y lograr un crecimiento sostenible.',
                btnPrimary: 'Explorar Servicios',
                btnSecondary: 'Agendar Consultoría'
            },
            advisory: {
                badge: 'Asesoría Estratégica',
                title: 'Consultoría Empresarial',
                description: 'Nuestros servicios expertos de consultoría están diseñados para optimizar sus procesos y estrategia para maximizar la eficiencia.',
                items: [
                    { title: 'Optimización de Procesos', description: 'Agilice sus operaciones para una máxima eficiencia y reducción de costos.' },
                    { title: 'Planificación Estratégica', description: 'Desarrolle estrategias accionables para un crecimiento de mercado a largo plazo.' },
                    { title: 'Gestión de Riesgos', description: 'Identifique y mitigue los riesgos empresariales de manera efectiva.' }
                ],
                link: 'Saber más sobre Consultoría'
            },
            digital: {
                badge: 'Innovación Digital',
                title: 'Transformación Digital',
                description: 'Manténgase a la vanguardia con nuestras estrategias integrales de transformación digital. Ayudamos a integrar tecnologías de punta.',
                items: [
                    { title: 'Migración a la Nube', description: 'Transición sin problemas a entornos de nube escalables y seguros.' },
                    { title: 'Modernización de Sistemas', description: 'Actualice sistemas heredados con tecnologías modernas para mejorar la agilidad.' },
                    { title: 'Integración Tecnológica', description: 'Armonice sus aplicaciones de negocio para un flujo de trabajo unificado.' }
                ],
                link: 'Explorar Transformación Digital'
            },
            bi: {
                badge: 'Inteligencia de Datos',
                title: 'Business Intelligence',
                description: 'Desbloquee información valiosa de sus datos con nuestras soluciones avanzadas de BI, impulsando decisiones basadas en datos.',
                items: [
                    { title: 'Visualización de Datos', description: 'Transforme conjuntos de datos complejos en representaciones visuales intuitivas.' },
                    { title: 'Tableros de Rendimiento', description: 'Siga sus KPIs críticos con tableros personalizados en tiempo real.' },
                    { title: 'Automatización de Reportes', description: 'Agilice sus procesos de reporte para ahorrar tiempo y asegurar precisión.' }
                ],
                link: 'Descubrir Soluciones BI'
            },
            cta: {
                title: '¿Listo para Elevar su Empresa?',
                description: 'Asóciese con nosotros hoy para transformar sus operaciones y alcanzar un crecimiento sin precedentes.',
                btnPrimary: 'Empezar Hoy',
                btnSecondary: 'Hablar con un Experto'
            }
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
        },
        contact: {
            badge: 'Exclusive Care',
            title: 'Lets discuss your next big project',
            description: 'Our advisory team is ready to design the perfect outsourcing and technology solution for your company.',
            infoTitle: 'Corporate Information',
            infoSubtitle: 'We are located in the financial heart, ready to serve the needs of global clients.',
            formTitle: 'Send us a Message',
            formName: 'Full Name',
            formEmail: 'Corporate Email',
            formCompany: 'Company',
            formMessage: 'How can we help you?',
            formSuccess: 'Message sent successfully. An advisor will contact you shortly.',
            formSubmit: 'Request Advising'
        },
        serviciosPage: {
            hero: {
                badge: 'Enterprise Solutions',
                title: 'Transforming Business Through Expert Solutions.',
                description: 'Discover our comprehensive suite of enterprise-grade services designed to propel your business forward, optimize operations, and drive sustainable growth.',
                btnPrimary: 'Explore Services',
                btnSecondary: 'Schedule Consultation'
            },
            advisory: {
                badge: 'Strategic Advisory',
                title: 'Enterprise Consulting',
                description: 'Our expert consulting services are tailored to optimize your business processes and strategy for maximum efficiency.',
                items: [
                    { title: 'Process Optimization', description: 'Streamline your operations for maximum efficiency and reduced costs.' },
                    { title: 'Strategic Planning', description: 'Develop comprehensive, actionable strategies for sustainable long-term growth.' },
                    { title: 'Risk Management', description: 'Identify, assess, and mitigate potential enterprise risks effectively.' }
                ],
                link: 'Learn more about Consulting'
            },
            digital: {
                badge: 'Digital Innovation',
                title: 'Digital Transformation',
                description: 'Stay ahead of the curve with our comprehensive digital transformation strategies. We help you integrate cutting-edge technologies.',
                items: [
                    { title: 'Cloud Migration', description: 'Seamlessly transition your infrastructure to scalable, secure cloud environments.' },
                    { title: 'Legacy System Modernization', description: 'Update outdated systems with modern technologies to improve agility.' },
                    { title: 'Tech Integration', description: 'Harmonize disparate business applications for a unified, efficient workflow.' }
                ],
                link: 'Explore Digital Transformation'
            },
            bi: {
                badge: 'Data Insights',
                title: 'Business Intelligence',
                description: 'Unlock valuable insights from your data with our advanced Business Intelligence solutions, driving data-backed decision-making.',
                items: [
                    { title: 'Data Visualization', description: 'Transform complex data sets into intuitive, actionable visual representations.' },
                    { title: 'Performance Dashboards', description: 'Monitor critical KPIs with customized, real-time performance dashboards.' },
                    { title: 'Reporting Automation', description: 'Streamline your reporting processes to save time and ensure accuracy.' }
                ],
                link: 'Discover BI Solutions'
            },
            cta: {
                title: 'Ready to Elevate Your Enterprise?',
                description: 'Partner with us today to transform your business operations and achieve unprecedented growth.',
                btnPrimary: 'Get Started Today',
                btnSecondary: 'Talk to an Expert'
            }
        }
    }
};
