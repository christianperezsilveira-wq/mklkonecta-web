"use client";

import React, { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/actions/auth';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Import login dynamically or at top if not there
            // We need to import 'login' from '@/actions/auth' at the top of the file
            // Since this tool replaces a block, I will assume the import needs to be added or is already there?
            // Wait, I haven't added the import statement yet. 
            // I should probably do a multi_replace or ensure import is there.
            // Let's just write the function logic here and I'll add the import in another step if needed, 
            // or I'll use multi_replace to do both safely.
            const data = await login({ email, password });

            if (data?.error) {
                const message = data.debug ? `${data.error} (${data.debug})` : data.error;
                setError(message);
                setLoading(false);
            } else if (data?.success) {
                setSuccess(data.success);
                // Keep loading state true while redirecting to prevent interactions
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Algo salió mal (Error desconocido)");
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Top Right Logo */}
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
                {/* Left Side - Image & Brand Message */}
                <div className={styles.leftPanel}>
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                        alt="Office Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />

                    {/* Gray/White Fade Overlay (Sfumato) to right */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.9) 100%)',
                        zIndex: 1
                    }} />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 2, color: '#333', padding: '2rem' }}>
                        <div className={styles.logoIcon} />
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2 }}>
                            Experiencia <br />
                            <strong style={{ color: '#FF0000', fontWeight: 800 }}>Premium</strong> para el <br />
                            talento digital.
                        </h1>
                        <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#555', maxWidth: '300px', lineHeight: 1.6 }}>
                            Acceda a su ecosistema de trabajo corporativo de forma segura y simplificada.
                        </p>
                        <div style={{ width: '40px', height: '4px', background: '#FF0000', marginTop: '3rem' }} />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.rightPanel}>
                    <div className={styles.formContainer}>
                        <h2 className={styles.title}>Iniciar Sesión</h2>
                        <p className={styles.subtitle}>Bienvenido de nuevo. Ingrese sus credenciales.</p>

                        <form className={styles.form} onSubmit={handleLogin}>
                            <div className={styles.inputGroup}>
                                <span className={styles.label}>USUARIO O CORREO</span>
                                {/* Assuming Input component accepts style/className or we pass props */}
                                <Input
                                    name="email"
                                    label=""
                                    placeholder="nombre.apellido@konecta.com"
                                    required
                                    style={{ background: '#F9F9F9', border: '1px solid #EEE' }}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <span className={styles.label}>CONTRASEÑA</span>
                                <Input
                                    name="password"
                                    label=""
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    style={{ background: '#F9F9F9', border: '1px solid #EEE' }}
                                />
                            </div>

                            <div className={styles.options}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ accentColor: '#FF0000' }} />
                                    Recordar equipo
                                </label>
                                <Link href="#" style={{ color: '#999', textDecoration: 'none' }}>
                                    ¿Olvidó su contraseña?
                                </Link>
                            </div>

                            {error && (
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#FEF2F2',
                                    color: '#DC2626',
                                    borderRadius: '6px',
                                    marginTop: '1rem',
                                    fontSize: '0.875rem',
                                    border: '1px solid #FCA5A5'
                                }}>
                                    ⚠️ {error}
                                    {/* @ts-ignore - debug is our custom property */}
                                    {typeof error === 'object' && (error as any).debug && (
                                        <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.7 }}>
                                            {(error as any).debug}
                                        </div>
                                    )}
                                </div>
                            )}

                            {success && (
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#ECFDF5',
                                    color: '#059669',
                                    borderRadius: '6px',
                                    marginTop: '1rem',
                                    fontSize: '0.875rem',
                                    border: '1px solid #6EE7B7'
                                }}>
                                    ✅ {success}
                                </div>
                            )}

                            <Button
                                variant="primary"
                                fullWidth
                                disabled={loading}
                                style={{ backgroundColor: '#FF0000', height: '48px', borderRadius: '6px', marginTop: '1rem' }}
                            >
                                {loading ? 'Cargando...' : 'Acceder al Portal'}
                            </Button>
                        </form>

                        <div className={styles.helpText}>
                            ¿Aún no tiene acceso corporativo?
                            <Link href="/register" className={styles.contactLink}>
                                Contactar con IT para Registro
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
