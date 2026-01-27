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
                        <a href="#" className={styles.icon} aria-label="Share">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </a>
                        <a href="#" className={styles.icon} aria-label="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                        <a href="#" className={styles.icon} aria-label="Global">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
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
