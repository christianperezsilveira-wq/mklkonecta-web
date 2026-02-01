"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updateUserProfile } from "@/actions/users";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProfileModalProps {
    user: {
        name?: string | null;
        image?: string | null;
    };
    onClose: () => void;
}

export const ProfileModal = ({ user, onClose }: ProfileModalProps) => {
    const router = useRouter();
    const [name, setName] = useState(user.name || "");
    const [imagePreview, setImagePreview] = useState<string | null>(user.image || null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tamaño (2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("La imagen es muy pesada (Máx 2MB)");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await updateUserProfile({
            name,
            image: imagePreview !== user.image ? (imagePreview as string) : undefined
        });

        if (res.error) {
            alert(res.error);
        } else {
            onClose();
            router.refresh();
        }
        setIsLoading(false);
    };

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Card style={{ width: "400px", maxWidth: "90%", padding: "20px" }}>
                <h2 style={{ marginBottom: "20px", marginTop: 0 }}>Editar Perfil</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    {/* Avatar Upload */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <div
                            style={{
                                width: "100px", height: "100px",
                                borderRadius: "50%",
                                border: "2px dashed #ccc",
                                overflow: "hidden",
                                position: "relative",
                                cursor: "pointer"
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt="Avatar"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <div style={{
                                    width: "100%", height: "100%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    backgroundColor: "#f0f0f0", color: "#666"
                                }}>
                                    Subir Foto
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <span style={{ fontSize: "0.8rem", color: "#666" }}>
                            Clic en la imagen para cambiarla
                        </span>
                    </div>

                    <Input
                        label="Nombre Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                    />

                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
