"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>{t.hero.badge}</span>
                    <h1 className={styles.title} style={{ whiteSpace: 'pre-line' }}>
                        {t.hero.title}
                    </h1>
                    <p className={styles.description}>
                        {t.hero.description}
                    </p>
                    <div className={styles.buttons}>
                        <Link href="/login">
                            <Button variant="primary">{t.hero.btnPrimary}</Button>
                        </Link>
                        <Link href="#services">
                            <Button variant="secondary">{t.hero.btnSecondary}</Button>
                        </Link>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <Image
                        src="/images/hero-bg.png"
                        alt="MKL Technology"
                        fill
                        className={styles.image}
                        priority
                    />
                </div>
            </div>
        </section>
    );
};
