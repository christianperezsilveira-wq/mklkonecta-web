import React, { Suspense } from 'react';
import styles from '@/app/login/login.module.css';
import Image from 'next/image';
import { NewPasswordForm } from '@/components/auth/NewPasswordForm';

export default function NewPasswordPage() {
    return (
        <div className={styles.container}>
            <div style={{ position: 'absolute', top: '2rem', right: '3rem', zIndex: 10 }}>
                <Image
                    src="/logo.jpg"
                    alt="MKL Konecta"
                    width={150}
                    height={60}
                    style={{ objectFit: 'contain' }}
                />
            </div>

            <div className={styles.card}>
                <div className={styles.leftPanel}>
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                        alt="Office Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.9) 100%)',
                        zIndex: 1
                    }} />
                    <div style={{ position: 'relative', zIndex: 2, color: '#333', padding: '2rem' }}>
                        <div className={styles.logoIcon} />
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2 }}>
                            Actualizar <br />
                            <strong style={{ color: '#FF0000', fontWeight: 800 }}>Contraseña</strong> de <br />
                            Seguridad.
                        </h1>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.formContainer}>
                        <h2 className={styles.title}>Nueva Contraseña</h2>
                        <p className={styles.subtitle}>Ingrese su nueva contraseña corporativa.</p>
                        <Suspense fallback={<div>Cargando...</div>}>
                            <NewPasswordForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
