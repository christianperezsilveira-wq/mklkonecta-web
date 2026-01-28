"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, Suspense } from "react";
import { newVerification } from "@/actions/auth";
import Link from "next/link";

const VerificationContent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Token no encontrado");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Algo salió mal");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem', background: '#f5f5f5' }}>
            <div style={{ textAlign: 'center', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '90%' }}>
                <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Confirmación de Cuenta</h1>

                {!success && !error && <p>Verificando tu correo...</p>}

                {success && (
                    <div style={{ color: 'green' }}>
                        <p style={{ marginBottom: '1rem' }}>{success}</p>
                        <Link href="/login" style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: '#000',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px'
                        }}>
                            Ir al Login
                        </Link>
                    </div>
                )}

                {error && (
                    <div style={{ color: 'red' }}>
                        <p>{error}</p>
                        <div style={{ marginTop: '1rem' }}>
                            <Link href="/login" style={{ textDecoration: 'underline', color: '#666' }}>
                                Volver al login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function NewVerificationPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <VerificationContent />
        </Suspense>
    );
}
