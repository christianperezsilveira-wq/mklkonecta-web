"use client";

import React, { useState } from 'react';
import { createQuickLink, updateQuickLink, deleteQuickLink } from '@/actions/admin';
import styles from './LinkManager.module.css';

interface QuickLink {
    id: string;
    title: string;
    url: string;
    icon?: string | null;
    order: number;
}

export const LinkManager = ({ initialLinks }: { initialLinks: any[] }) => {
    const [links, setLinks] = useState<QuickLink[]>(initialLinks);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', url: '', icon: '', order: 0 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            const result = await updateQuickLink(editingId, formData);
            if (result.success) {
                setLinks(links.map(l => l.id === editingId ? { ...l, ...formData } : l).sort((a, b) => a.order - b.order));
                setEditingId(null);
            }
        } else {
            const result = await createQuickLink(formData);
            if (result.success && result.data) {
                setLinks([...links, result.data as any].sort((a, b) => a.order - b.order));
                setIsAdding(false);
            }
        }
        setFormData({ title: '', url: '', icon: '', order: 0 });
    };

    const handleEdit = (l: QuickLink) => {
        setEditingId(l.id);
        setFormData({ title: l.title, url: l.url, icon: l.icon || '', order: l.order });
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar este link?")) {
            const result = await deleteQuickLink(id);
            if (result.success) {
                setLinks(links.filter(l => l.id !== id));
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Lista de Links</h3>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className={styles.addButton}>
                        + Nuevo Link
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Título (ej: Portal de Nómina)"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL (ej: /dashboard/payroll o https://...)"
                        value={formData.url}
                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                        required
                    />
                    <div className={styles.row}>
                        <input
                            type="text"
                            placeholder="Icono (emoji)"
                            value={formData.icon}
                            style={{ width: '100px' }}
                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Orden"
                            value={formData.order}
                            onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        />
                    </div>
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
                {links.map(l => (
                    <div key={l.id} className={styles.item}>
                        <div className={styles.itemInfo}>
                            <strong>{l.icon} {l.title}</strong>
                            <span>{l.url}</span>
                        </div>
                        <div className={styles.itemActions}>
                            <button onClick={() => handleEdit(l)}>✏️</button>
                            <button onClick={() => handleDelete(l.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
