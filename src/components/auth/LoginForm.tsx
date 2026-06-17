"use client";

import React, { useState, useTransition } from 'react';
import styles from '@/app/login/login.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login, loginWithGoogle } from '@/actions/auth';

export const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");

    const getErrorMessage = () => {
        if (error) return error;
        if (urlError === "PendingApproval") return "Tu cuenta está pendiente de aprobación corporativa.";
        if (urlError === "OAuthAccountNotLinked") return "Este correo electrónico ya está registrado con contraseña. Inicia sesión con tus credenciales.";
        if (urlError === "AccessDenied") return "Acceso denegado. No tienes permisos para ingresar.";
        if (urlError) return "Ocurrió un error al iniciar sesión con Google.";
        return undefined;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        startTransition(async () => {
            try {
                const data = await login({ email, password });

                if (data?.error) {
                    setError(data.error);
                } else if (data?.success) {
                    router.push("/dashboard");
                    router.refresh();
                }
            } catch (err) {
                console.error("Login component error:", err);
                setError("Ocurrió un error inesperado al conectar.");
            }
        });
    };

    const handleGoogleLogin = () => {
        setError("");
        startTransition(() => {
            loginWithGoogle()
                .catch((err) => {
                    // Next.js redirect signals are thrown as errors.
                    // We must let them bubble up so Next.js redirects properly.
                    if (err instanceof Error && (err.message.includes("NEXT_REDIRECT") || err.message === "NEXT_REDIRECT")) {
                        throw err;
                    }
                    console.error("Google login error:", err);
                    setError("Ocurrió un error al iniciar sesión con Google.");
                });
        });
    };

    const displayError = getErrorMessage();

    return (
        <div>
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <span className={styles.label}>USUARIO O CORREO</span>
                    <Input
                        name="email"
                        label=""
                        placeholder="nombre.apellido@konecta.com"
                        required
                        disabled={isPending}
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
                        disabled={isPending}
                        style={{ background: '#F9F9F9', border: '1px solid #EEE' }}
                    />
                </div>

                <div className={styles.options}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: '#FF0000' }} disabled={isPending} />
                        Recordar equipo
                    </label>
                    <Link href="/auth/reset" style={{ color: '#999', textDecoration: 'none' }}>
                        ¿Olvidó su contraseña?
                    </Link>
                </div>

                {displayError && (
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        borderRadius: '6px',
                        marginTop: '1rem',
                        fontSize: '0.875rem',
                        border: '1px solid #FCA5A5'
                    }}>
                        ⚠️ {displayError}
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

            <div className={styles.divider}>O</div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className={styles.googleButton}
                disabled={isPending}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Continuar con Google
            </button>
        </div>
    );
};
