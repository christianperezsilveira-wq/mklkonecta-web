"use client";

import React from 'react';
import Image from 'next/image';
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import styles from './Contacto.module.css';

import { sendContactEmail } from "@/actions/contact";

function ContactoContent() {
    const { t } = useLanguage();
    const [isPending, startTransition] = React.useTransition();
    const [error, setError] = React.useState<string | undefined>("");
    const [success, setSuccess] = React.useState<string | undefined>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const company = formData.get("company") as string;
        const message = formData.get("message") as string;

        startTransition(async () => {
            const res = await sendContactEmail({ name, email, company, message });
            if (res.error) {
                setError(res.error);
            } else if (res.success) {
                setSuccess(res.success);
                // Opcional: limpiar formulario
                (e.target as HTMLFormElement).reset();
            }
        });
    };

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
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name">{t.contact?.formName || "Nombre Completo"}</label>
                                    <input name="name" type="text" id="name" placeholder="Ej. Juan Pérez" required disabled={isPending} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email">{t.contact?.formEmail || "Correo Corporativo"}</label>
                                    <input name="email" type="email" id="email" placeholder="juan@empresa.com" required disabled={isPending} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="company">{t.contact?.formCompany || "Empresa"}</label>
                                    <input name="company" type="text" id="company" placeholder="Nombre de tu empresa" disabled={isPending} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="message">{t.contact?.formMessage || "¿En qué podemos ayudarte?"}</label>
                                    <textarea name="message" id="message" rows={4} placeholder="Describe tus necesidades de outsourcing o TI..." required disabled={isPending}></textarea>
                                </div>

                                {error && (
                                    <div style={{ padding: '0.75rem', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem', border: '1px solid #FCA5A5' }}>
                                        ⚠️ {error}
                                    </div>
                                )}

                                {success && (
                                    <div style={{ padding: '0.75rem', backgroundColor: '#F0FDF4', color: '#16A34A', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem', border: '1px solid #86EFAC' }}>
                                        ✅ {success}
                                    </div>
                                )}

                                <button type="submit" className={styles.submitButton} disabled={isPending}>
                                    {isPending ? "Enviando..." : (t.contact?.formSubmit || "Solicitar Asesoramiento")}
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
