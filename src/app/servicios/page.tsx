"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import styles from './Servicios.module.css';

function ServiciosContent() {
    const { t } = useLanguage();
    const s = t.serviciosPage;

    if (!s) return null;

    return (
        <main className={styles.serviciosPage}>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <Navbar />

            {/* Hero Section */}
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>{s.hero.badge}</span>
                    <h1 className={styles.heroTitle}>{s.hero.title}</h1>
                    <p className={styles.heroDescription}>{s.hero.description}</p>
                    <div className={styles.buttons}>
                        <button className={styles.btnPrimary}>{s.hero.btnPrimary}</button>
                        <button className={styles.btnSecondary}>{s.hero.btnSecondary}</button>
                    </div>
                </div>
            </section>

            {/* Service 1: Consulting */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.serviceGrid}>
                        <div className={styles.serviceContent}>
                            <div className={styles.serviceBadge}>
                                <span className="material-symbols-outlined">lightbulb</span>
                                {s.advisory.badge}
                            </div>
                            <h2 className={styles.serviceTitle}>{s.advisory.title}</h2>
                            <p className={styles.serviceDescription}>{s.advisory.description}</p>

                            <ul className={styles.featureList}>
                                {s.advisory.items.map((item: any, i: number) => (
                                    <li key={i} className={styles.featureItem}>
                                        <span className={`${styles.icon} material-symbols-outlined`}>check_circle</span>
                                        <div className={styles.featureText}>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Link href="#" className={styles.moreLink}>
                                {s.advisory.link} <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/enterprise-strategy.png"
                                alt="Consultoría Empresarial"
                                fill
                                className={styles.serviceImage}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 2: Digital Transformation (Reversed) */}
            <section className={`${styles.section} ${styles.lightBg}`}>
                <div className={styles.container}>
                    <div className={`${styles.serviceGrid} ${styles.reverse}`}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/enterprise-digital.png"
                                alt="Transformación Digital"
                                fill
                                className={styles.serviceImage}
                            />
                        </div>
                        <div className={styles.serviceContent}>
                            <div className={styles.serviceBadge}>
                                <span className="material-symbols-outlined">terminal</span>
                                {s.digital.badge}
                            </div>
                            <h2 className={styles.serviceTitle}>{s.digital.title}</h2>
                            <p className={styles.serviceDescription}>{s.digital.description}</p>

                            <ul className={styles.featureList}>
                                {s.digital.items.map((item: any, i: number) => (
                                    <li key={i} className={styles.featureItem}>
                                        <span className={`${styles.icon} material-symbols-outlined`}>check_circle</span>
                                        <div className={styles.featureText}>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Link href="#" className={styles.moreLink}>
                                {s.digital.link} <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: Business Intelligence */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.serviceGrid}>
                        <div className={styles.serviceContent}>
                            <div className={styles.serviceBadge}>
                                <span className="material-symbols-outlined">monitoring</span>
                                {s.bi.badge}
                            </div>
                            <h2 className={styles.serviceTitle}>{s.bi.title}</h2>
                            <p className={styles.serviceDescription}>{s.bi.description}</p>

                            <ul className={styles.featureList}>
                                {s.bi.items.map((item: any, i: number) => (
                                    <li key={i} className={styles.featureItem}>
                                        <span className={`${styles.icon} material-symbols-outlined`}>check_circle</span>
                                        <div className={styles.featureText}>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <Link href="#" className={styles.moreLink}>
                                {s.bi.link} <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/enterprise-bi.png"
                                alt="Business Intelligence"
                                fill
                                className={styles.serviceImage}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>{s.cta.title}</h2>
                    <p className={styles.ctaDescription}>{s.cta.description}</p>
                    <div className={styles.ctaButtons}>
                        <button className={styles.btnWhite}>{s.cta.btnPrimary}</button>
                        <button className={styles.btnOutline}>{s.cta.btnSecondary}</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function Servicios() {
    return (
        <LanguageProvider>
            <ServiciosContent />
        </LanguageProvider>
    );
}
