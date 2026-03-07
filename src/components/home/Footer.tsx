"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* 1. Brand & Socials */}
                <div className={styles.column} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}> {/* Removed extra top padding for better alignment */}
                    <div className={styles.logo} style={{ marginBottom: '1.5rem', marginLeft: '0' }}> {/* Reset margins */}
                        <span style={{
                            fontFamily: 'serif',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            letterSpacing: '-1px'
                        }}>
                            <span style={{ color: 'red' }}>MKL</span> Konecta
                        </span>
                    </div>
                    <div className={styles.description} style={{ marginTop: 0, marginBottom: '2rem' }}>
                        <p style={{ margin: '0 0 0.5rem 0' }}>{t.footer.contactInfo.address1}</p>
                        <p style={{ margin: '0 0 1.5rem 0' }}>{t.footer.contactInfo.address2}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Image
                                src="/paraguay-flag.svg"
                                alt="PY"
                                width={20}
                                height={15}
                                style={{ borderRadius: '2px', objectFit: 'cover' }}
                            />
                            <p style={{ fontWeight: 600, color: 'var(--color-foreground)', margin: 0 }}>{t.footer.contactInfo.phone}</p>
                        </div>
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="https://instagram.com/mklkonecta" target="_blank" rel="noopener noreferrer" className={styles.icon} aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://facebook.com/mklkonecta" target="_blank" rel="noopener noreferrer" className={styles.icon} aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="mailto:contacto@mklkonecta.com" className={styles.icon} aria-label="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </div>

                {/* 2. Company */}
                <div className={styles.column}>
                    <h3>{t.footer.sections.company.title}</h3>
                    <ul>
                        {t.footer.sections.company.links.map((link, i) => (
                            <li key={i}><Link href={link.href}>{link.label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* 3. Services */}
                <div className={styles.column}>
                    <h3>{t.footer.sections.services.title}</h3>
                    <ul>
                        {t.footer.sections.services.links.map((link, i) => (
                            <li key={i}><Link href={link.href}>{link.label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* 4. Intranet */}
                <div className={styles.column}>
                    <h3>{t.footer.sections.intranet.title}</h3>
                    <ul>
                        {t.footer.sections.intranet.links.map((link, i) => (
                            <li key={i}><Link href={link.href}>{link.label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* 5. Newsletter */}
                <div className={styles.column}>
                    <h3>{t.footer.newsletter.title}</h3>
                    <p className={styles.description} style={{ marginBottom: '1rem', marginTop: 0 }}>
                        {t.footer.newsletter.description}
                    </p>
                    <div className={styles.newsletterInput}>
                        <input type="email" placeholder={t.footer.newsletter.placeholder} className={styles.input} />
                        <button className={styles.button}>{t.footer.newsletter.button}</button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    © {new Date().getFullYear()} {t.footer.copyright}
                </div>
                <div className={styles.legalLinks}>
                    <a href="#">{t.footer.bottomLinks.privacy}</a>
                    <a href="#">{t.footer.bottomLinks.terms}</a>
                    <a href="#">{t.footer.bottomLinks.cookies}</a>
                </div>
            </div>
        </footer>
    );
};
