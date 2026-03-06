"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import styles from './Contacto.module.css';

function ContactoContent() {
    const { t } = useLanguage();

    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.heroSection}>
                <div className={styles.heroImageContainer}>
                    <Image
                        src="/images/contact-bg.png"
                        alt="Contacto Premium"
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}></div>
                </div>

                <div className={styles.heroContent}>
                    <span className={styles.badge}>
                        {t.contact?.badge || "Atención Exclusiva"}
                    </span>
                    <h1 className={styles.title}>
                        {t.contact?.title || "Hablemos de tu próximo gran proyecto"}
                    </h1>
                    <p className={styles.description}>
                        {t.contact?.description || "Nuestro equipo de asesores está listo para diseñar la solución de outsourcing y tecnología perfecta para tu empresa."}
                    </p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>

                        {/* Información de Contacto */}
                        <div className={styles.infoCard}>
                            <h2 className={styles.cardTitle}>{t.contact?.infoTitle || "Información Corporativa"}</h2>
                            <p className={styles.cardText}>
                                {t.contact?.infoSubtitle || "Estamos ubicados en el corazón financiero, listos para atender las necesidades de clientes globales."}
                            </p>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>📍</div>
                                    <div>
                                        <strong>Oficina Central</strong>
                                        <p>{t.footer.contactInfo.address1}</p>
                                        <p>{t.footer.contactInfo.address2}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>📞</div>
                                    <div>
                                        <strong>Teléfono Directo</strong>
                                        <p>{t.footer.contactInfo.phone}</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}>✉️</div>
                                    <div>
                                        <strong>Correo Electrónico</strong>
                                        <p>contacto@mklkonecta.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulario */}
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>{t.contact?.formTitle || "Envíanos un Mensaje"}</h2>
                            <form className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name">{t.contact?.formName || "Nombre Completo"}</label>
                                    <input type="text" id="name" placeholder="Ej. Juan Pérez" required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email">{t.contact?.formEmail || "Correo Corporativo"}</label>
                                    <input type="email" id="email" placeholder="juan@empresa.com" required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="company">{t.contact?.formCompany || "Empresa"}</label>
                                    <input type="text" id="company" placeholder="Nombre de tu empresa" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="message">{t.contact?.formMessage || "¿En qué podemos ayudarte?"}</label>
                                    <textarea id="message" rows={4} placeholder="Describe tus necesidades de outsourcing o TI..." required></textarea>
                                </div>
                                <button type="button" className={styles.submitButton} onClick={(e) => {
                                    e.preventDefault();
                                    alert(t.contact?.formSuccess || "Mensaje enviado con éxito. Un asesor se comunicará a la brevedad.");
                                }}>
                                    {t.contact?.formSubmit || "Solicitar Asesoramiento"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function Contacto() {
    return (
        <LanguageProvider>
            <ContactoContent />
        </LanguageProvider>
    );
}
