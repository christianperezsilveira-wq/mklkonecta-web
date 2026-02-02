"use client";

import React, { useState } from 'react';
import { createCampaign, updateCampaign, deleteCampaign } from '@/actions/admin';
import styles from './CampaignManager.module.css';

interface Campaign {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    status: string;
}

export const CampaignManager = ({ initialCampaigns }: { initialCampaigns: any[] }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            const result = await updateCampaign(editingId, formData);
            if (result.success) {
                setCampaigns(campaigns.map(c => c.id === editingId ? { ...c, ...formData } : c));
                setEditingId(null);
            }
        } else {
            const result = await createCampaign(formData);
            if (result.success && result.data) {
                setCampaigns([result.data as any, ...campaigns]);
                setIsAdding(false);
            }
        }
        setFormData({ name: '', slug: '', description: '' });
    };

    const handleEdit = (c: Campaign) => {
        setEditingId(c.id);
        setFormData({ name: c.name, slug: c.slug, description: c.description || '' });
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar esta campaña?")) {
            const result = await deleteCampaign(id);
            if (result.success) {
                setCampaigns(campaigns.filter(c => c.id !== id));
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Lista de Campañas</h3>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className={styles.addButton}>
                        + Nueva Campaña
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Nombre (ej: Vivo mi viaje)"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Slug (ej: vivo-mi-viaje)"
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Descripción corta"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>
                            {editingId ? 'Actualizar' : 'Guardar'}
                        </button>
                        <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className={styles.list}>
                {campaigns.map(c => (
                    <div key={c.id} className={styles.item}>
                        <div className={styles.itemInfo}>
                            <strong>{c.name}</strong>
                            <span>/{c.slug}</span>
                        </div>
                        <div className={styles.itemActions}>
                            <button onClick={() => handleEdit(c)}>✏️</button>
                            <button onClick={() => handleDelete(c.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
