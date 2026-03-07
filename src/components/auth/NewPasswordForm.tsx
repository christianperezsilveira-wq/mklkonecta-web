"use client";

import React, { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/login/login.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { newPassword } from '@/actions/auth';

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    // Si no hay token al cargar la página, mostramos error inmediatamente
    React.useEffect(() => {
        if (!token) {
            setError("Falta el identificador de seguridad (Token). Por favor, use el enlace de su correo.");
        }
    }, [token]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setError("No se puede procesar sin un token válido.");
            return;
        }

        setError("");
        setSuccess("");

        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get("password") as string;

        startTransition(() => {
            newPassword({ password }, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
                <span className={styles.label}>NUEVA CONTRASEÑA</span>
                <Input
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    disabled={isPending}
                    required
                    style={{ background: '#F9F9F9', border: '1px solid #EEE' }}
                />
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

            {success && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#F0FDF4',
                    color: '#16A34A',
                    borderRadius: '6px',
                    marginTop: '1rem',
                    fontSize: '0.875rem',
                    border: '1px solid #86EFAC'
                }}>
                    ✅ {success}
                </div>
            )}

            <Button
                variant="primary"
                fullWidth
                disabled={isPending}
                type="submit"
                style={{ backgroundColor: '#FF0000', height: '48px', borderRadius: '6px', marginTop: '1.5rem' }}
            >
                {isPending ? 'Actualizando...' : 'Restablecer contraseña'}
            </Button>

            <div className={styles.helpText} style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link href="/login" className={styles.contactLink}>
                    Volver al inicio de sesión
                </Link>
            </div>
        </form>
    );
};
