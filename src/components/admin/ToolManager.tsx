'use client';

import React, { useState, useEffect } from 'react';
import { getSoftwareTools, createSoftwareTool, updateSoftwareTool, deleteSoftwareTool } from '@/actions/admin';
import styles from './ToolManager.module.css';

export const ToolManager = () => {
    const [tools, setTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTool, setEditingTool] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        icon: '',
        image: '',
        order: 0
    });

    useEffect(() => {
        loadTools();
    }, []);

    const loadTools = async () => {
        const data = await getSoftwareTools();
        setTools(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = editingTool
            ? await updateSoftwareTool(editingTool.id, formData)
            : await createSoftwareTool(formData);

        if (result.success) {
            setFormData({ name: '', url: '', description: '', icon: '', image: '', order: 0 });
            setEditingTool(null);
            await loadTools();
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    const handleEdit = (tool: any) => {
        setEditingTool(tool);
        setFormData({
            name: tool.name,
            url: tool.url,
            description: tool.description || '',
            icon: tool.icon || '',
            image: tool.image || '',
            order: tool.order
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que quieres eliminar esta herramienta?')) return;
        setLoading(true);
        const result = await deleteSoftwareTool(id);
        if (result.success) {
            await loadTools();
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Gestión de Herramientas</h2>
                <p>Configura las tarjetas que aparecen en el Dashboard y en la sección de Herramientas.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Nombre de la Herramienta</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: CRM Interno, Outlook..."
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>URL / Enlace</label>
                    <input
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://..."
                        required
                    />
                </div>
                <div className={styles.gridInputs}>
                    <div className={styles.inputGroup}>
                        <label>Icono (Emoji o nombre Lucide)</label>
                        <input
                            type="text"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            placeholder="Ej: ⚡, ✉️"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Imagen URL (Opcional)</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="URL de imagen"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Orden</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label>Descripción Corta</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Ej: Gestión de Clientes"
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {editingTool ? 'Actualizar Herramienta' : 'Añadir Herramienta'}
                    </button>
                    {editingTool && (
                        <button type="button" className={styles.cancelBtn} onClick={() => {
                            setEditingTool(null);
                            setFormData({ name: '', url: '', description: '', icon: '', image: '', order: 0 });
                        }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className={styles.list}>
                {tools.map((tool) => (
                    <div key={tool.id} className={styles.toolItem}>
                        <div className={styles.toolInfo}>
                            <span className={styles.toolIcon}>{tool.icon || '🛠️'}</span>
                            <div>
                                <div className={styles.toolTitle}>{tool.name}</div>
                                <div className={styles.toolUrl}>{tool.url}</div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button onClick={() => handleEdit(tool)} className={styles.editBtn}>Editar</button>
                            <button onClick={() => handleDelete(tool.id)} className={styles.deleteBtn}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
