'use client';

import React, { useState, useEffect } from 'react';
import { getSoftwareTools, createSoftwareTool, updateSoftwareTool, deleteSoftwareTool, getCampaigns } from '@/actions/admin';
import styles from './ToolManager.module.css';

export const ToolManager = () => {
    const [tools, setTools] = useState<any[]>([]);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTool, setEditingTool] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        icon: '',
        image: '',
        order: 0,
        locations: ['DASHBOARD', 'TOOLS_PAGE'], // Default to both
        category: 'GENERAL',
        campaignId: ''
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [toolsData, campaignsData] = await Promise.all([
            getSoftwareTools(),
            getCampaigns()
        ]);
        setTools(toolsData);
        setCampaigns(campaignsData);
        setLoading(false);
    };

    const handleLocationChange = (location: string) => {
        setFormData(prev => {
            const currentLocations = prev.locations || [];
            if (currentLocations.includes(location)) {
                return { ...prev, locations: currentLocations.filter(l => l !== location) };
            } else {
                return { ...prev, locations: [...currentLocations, location] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = editingTool
            ? await updateSoftwareTool(editingTool.id, formData)
            : await createSoftwareTool(formData);

        if (result.success) {
            setFormData({
                name: '',
                url: '',
                description: '',
                icon: '',
                image: '',
                order: 0,
                locations: ['DASHBOARD', 'TOOLS_PAGE'],
                category: 'GENERAL',
                campaignId: ''
            });
            setEditingTool(null);
            const updatedTools = await getSoftwareTools();
            setTools(updatedTools);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleEdit = (tool: any) => {
        setEditingTool(tool);
        setFormData({
            name: tool.name,
            url: tool.url,
            description: tool.description || '',
            icon: tool.icon || '',
            image: tool.image || '',
            order: tool.order,
            locations: tool.locations || [],
            category: tool.category || 'GENERAL',
            campaignId: tool.campaignId || ''
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que quieres eliminar esta herramienta?')) return;
        setLoading(true);
        const result = await deleteSoftwareTool(id);
        if (result.success) {
            const updatedTools = await getSoftwareTools();
            setTools(updatedTools);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Gestión de Herramientas</h2>
                <p>Configura las tarjetas que aparecen en el Dashboard, Herramientas y Campañas.</p>
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
                        <label>Icono (Emoji)</label>
                        <div className={styles.emojiPickerContainer}>
                            <button
                                type="button"
                                className={styles.emojiButton}
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                {formData.icon || 'Seleccionar...'}
                            </button>
                            {showEmojiPicker && (
                                <div className={styles.emojiGrid}>
                                    {['⚡', '🛠️', '📊', '📅', '👥', '📢', '📁', '✉️', '📞', '🌐', '🚀', '🔒', '🔔', '💬', '📝', '📈', '🛒', '🎓', '🚑', '✈️'].map(emoji => (
                                        <div
                                            key={emoji}
                                            className={styles.emojiItem}
                                            onClick={() => {
                                                setFormData({ ...formData, icon: emoji });
                                                setShowEmojiPicker(false);
                                            }}
                                        >
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Imagen URL</label>
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
                    <label>Visibilidad (Dónde aparecerá)</label>
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={formData.locations.includes('DASHBOARD')}
                                onChange={() => handleLocationChange('DASHBOARD')}
                            />
                            Dashboard Principal
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={formData.locations.includes('TOOLS_PAGE')}
                                onChange={() => handleLocationChange('TOOLS_PAGE')}
                            />
                            Página de Herramientas
                        </label>
                    </div>
                </div>


                <div className={styles.inputGroup}>
                    <label>Categoría</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={styles.select}
                    >
                        <option value="GENERAL">General</option>
                        <option value="COMUNICACION">Comunicación (Teléfono, Chat)</option>
                        <option value="CRM">CRM / Gestión</option>
                        <option value="ADMIN">Administración</option>
                        <option value="RRHH">Recursos Humanos</option>
                        <option value="OPERACIONES">Operaciones</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Vincular a Campaña (Opcional)</label>
                    <select
                        value={formData.campaignId}
                        onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
                        className={styles.select}
                    >
                        <option value="">-- No vincular a ninguna campaña --</option>
                        {campaigns.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <p className={styles.hint}>Si seleccionas una campaña, la herramienta aparecerá también en su página.</p>
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
                            setFormData({
                                name: '', url: '', description: '', icon: '', image: '', order: 0,
                                locations: ['DASHBOARD', 'TOOLS_PAGE'],
                                category: 'GENERAL',
                                campaignId: ''
                            });
                        }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form >

            <div className={styles.list}>
                {tools.map((tool) => (
                    <div key={tool.id} className={styles.toolItem}>
                        <div className={styles.toolInfo}>
                            <div className={styles.toolIconWrapper}>
                                {tool.image ? (
                                    <img src={tool.image} alt={tool.name} className={styles.toolListImage} />
                                ) : (
                                    <span className={styles.toolIcon}>{tool.icon || '🛠️'}</span>
                                )}
                            </div>
                            <div>
                                <div className={styles.toolTitle}>{tool.name}</div>
                                <div className={styles.toolMeta}>
                                    {tool.locations?.includes('DASHBOARD') && <span className={styles.badge}>Dash</span>}
                                    {tool.locations?.includes('TOOLS_PAGE') && <span className={styles.badge}>Tools</span>}
                                    <span className={styles.badge}>{tool.category || 'GENERAL'}</span>
                                    {tool.campaign && <span className={styles.badgeCampaign}>{tool.campaign.name}</span>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button onClick={() => handleEdit(tool)} className={styles.editBtn}>Editar</button>
                            <button onClick={() => handleDelete(tool.id)} className={styles.deleteBtn}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};
