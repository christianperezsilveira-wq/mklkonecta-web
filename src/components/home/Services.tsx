"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Services.module.css';
import { Card } from '@/components/ui/Card';
import cardStyles from '@/components/ui/Card.module.css'; // Accessing internal styles for image parts if needed, or better compostion
import { useLanguage } from '@/context/LanguageContext';

const serviceImages: Record<string, string> = {
    business: "https://images.unsplash.com/photo-1665686306574-1aeec1f1821a?auto=format&fit=crop&q=80&w=800", // Business process
    it: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", // Tech/Servers
    customer: "https://images.unsplash.com/photo-1556740714-a9391ab1a4ed?auto=format&fit=crop&q=80&w=800", // Customer support
    strategic: "https://images.unsplash.com/photo-1507675984201-5744f6acaeb7?auto=format&fit=crop&q=80&w=800" // Analytics/Dashboard
};

export const Services = () => {
    const { t } = useLanguage();

    return (
        <section id="services" className={styles.services}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.subtitle}>{t.services.subtitle}</span>
                    <h2 className={styles.title}>{t.services.title}</h2>
                </div>

                <div className={styles.grid}>
                    {t.services.items.map((service, index) => (
                        <Card key={index} hoverable className={cardStyles.card}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '1 / 1', // Make it square-ish like the reference
                                marginBottom: '1.5rem',
                                borderRadius: '1rem', // Match card curvature more closely
                                overflow: 'hidden'
                            }}>
                                <Image
                                    src={serviceImages[service.image as string] || serviceImages.business}
                                    alt={service.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <h3 className={cardStyles.title}>{service.title}</h3>
                            <p className={cardStyles.description}>{service.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
