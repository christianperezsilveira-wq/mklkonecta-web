"use client";

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { register } from '@/actions/auth';

export default function RegisterPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const handleRegister = (formData: FormData) => {
        setError("");
        setSuccess("");

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        startTransition(() => {
            register({ name, email, password })
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Crear Cuenta</h1>

                <form action={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Input name="name" placeholder="Nombre completo" required disabled={isPending} />
                    <Input name="email" type="email" placeholder="Correo electrónico" required disabled={isPending} />
                    <Input name="password" type="password" placeholder="Contraseña" required disabled={isPending} />

                    {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
                    {success && <p style={{ color: 'green', fontSize: '0.9rem' }}>{success}</p>}

                    <Button variant="primary" fullWidth disabled={isPending}>
                        {isPending ? "Creando..." : "Registrarse"}
                    </Button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    ¿Ya tienes cuenta? <Link href="/login" style={{ color: 'red' }}>Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}
