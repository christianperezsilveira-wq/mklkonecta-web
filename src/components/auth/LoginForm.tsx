"use client";

import React, { useState, useTransition } from 'react';
import styles from '@/app/login/login.module.css';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/actions/auth';

export const LoginForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        startTransition(async () => {
            try {
                // Forzamos que login NO redireccione internamente para manejarlo aquí
                // si el entorno es inestable con throw redirect.
                // Pero probaremos una última vez con el flujo estándar de catch/rethrow
                // Pero para ser SEGUROS, interceptaremos el error.
                const data = await login({ email, password });

                if (data?.error) {
                    setError(data.error);
                } else if (data?.success) {
                    // REDIRECCIÓN MANUAL: Esto evita problemas con Vercel y Server Actions
                    router.push("/dashboard");
                    router.refresh();
                }
            } catch (err) {
                console.error("Login component error:", err);
                setError("Ocurrió un error inesperado al conectar.");
            }
        });
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
                <span className={styles.label}>USUARIO O CORREO</span>
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
                </div>
            )}

            <Button
                variant="primary"
                fullWidth
                disabled={isPending}
                type="submit"
                style={{ backgroundColor: '#FF0000', height: '48px', borderRadius: '6px', marginTop: '1rem' }}
            >
                {isPending ? 'Cargando...' : 'Acceder al Portal'}
            </Button>
        </form>
    );
};
