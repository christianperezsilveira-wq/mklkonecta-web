"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
                <span style={{
                    fontFamily: 'serif',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    letterSpacing: '-1px',
                    color: 'var(--color-foreground)'
                }}>
                    <span style={{ color: 'red' }}>MKL</span> Konecta
                </span>
            </Link>

            <div className={styles.links}>
                <Link href="#services" className={styles.link}>{t.nav.services}</Link>
                <Link href="#about" className={styles.link}>{t.nav.about}</Link>
                <Link href="#solutions" className={styles.link}>{t.nav.solutions}</Link>
                <Link href="#contact" className={styles.link}>{t.nav.contact}</Link>
            </div>

            <div className={styles.actions}>
                <Link href="/login">
                    <Button variant="primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                        {t.nav.login}
                    </Button>
                </Link>
                <button
                    onClick={toggleLanguage}
                    aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    style={{
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'none',
                        border: 'none'
                    }}
                    title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px', color: 'var(--color-foreground)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S7.5 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};
