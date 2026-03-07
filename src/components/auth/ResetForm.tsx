"use client";

import React, { useState, useTransition } from 'react';
import styles from '@/app/login/login.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { reset } from '@/actions/auth';

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;

        startTransition(async () => {
            try {
                const data = await reset({ email });
                setError(data?.error);
                setSuccess(data?.success);
            } catch (error) {
                setError("Ocurrió un error inesperado. Inténtelo más tarde.");
            }
        });
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
                <span className={styles.label}>CORREO ELECTRÓNICO</span>
                <Input
                    name="email"
                    placeholder="nombre.apellido@konecta.com"
                    type="email"
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
                {isPending ? 'Enviando...' : 'Enviar correo de recuperación'}
            </Button>

            <div className={styles.helpText} style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link href="/login" className={styles.contactLink}>
                    Volver al inicio de sesión
                </Link>
            </div>
        </form>
    );
};
