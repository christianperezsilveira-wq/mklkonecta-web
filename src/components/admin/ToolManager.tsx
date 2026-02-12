'use client';

import React, { useState, useEffect } from 'react';
import {
    getSoftwareTools, createSoftwareTool, updateSoftwareTool, deleteSoftwareTool,
    getCampaigns,
    getToolCategories, createToolCategory, updateToolCategory, deleteToolCategory
} from '@/actions/admin';
import styles from './ToolManager.module.css';

export const ToolManager = () => {
    const [activeTab, setActiveTab] = useState<'tools' | 'categories'>('tools');

    // Tools State
    const [tools, setTools] = useState<any[]>([]);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Tool Form State
    const [editingTool, setEditingTool] = useState<any>(null);
    const [toolFormData, setToolFormData] = useState({
        name: '',
        url: '',
        description: '',
        icon: '',
        image: '',
        order: 0,
        locations: ['DASHBOARD', 'TOOLS_PAGE'],
        categoryId: '',
        campaignId: ''
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // Category Form State
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [categoryFormData, setCategoryFormData] = useState({
        name: '',
        slug: '',
        order: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [toolsData, campaignsData, categoriesData] = await Promise.all([
            getSoftwareTools(),
            getCampaigns(),
            getToolCategories()
        ]);
        setTools(toolsData);
        setCampaigns(campaignsData);
        setCategories(categoriesData);
        setLoading(false);
    };

    // --- TOOL HANDLERS ---

    const handleToolLocationChange = (location: string) => {
        setToolFormData(prev => {
            const currentLocations = prev.locations || [];
            if (currentLocations.includes(location)) {
                return { ...prev, locations: currentLocations.filter(l => l !== location) };
            } else {
                return { ...prev, locations: [...currentLocations, location] };
            }
        });
    };

    const handleToolSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = editingTool
            ? await updateSoftwareTool(editingTool.id, toolFormData)
            : await createSoftwareTool(toolFormData);

        if (result.success) {
            setToolFormData({
                name: '', url: '', description: '', icon: '', image: '', order: 0,
                locations: ['DASHBOARD', 'TOOLS_PAGE'],
                categoryId: '',
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

    const handleEditTool = (tool: any) => {
        setEditingTool(tool);
        setToolFormData({
            name: tool.name,
            url: tool.url,
            description: tool.description || '',
            icon: tool.icon || '',
            image: tool.image || '',
            order: tool.order,
            locations: tool.locations || [],
            categoryId: tool.categoryId || '',
            campaignId: tool.campaignId || ''
        });
    };

    const handleDeleteTool = async (id: string) => {
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

    // --- CATEGORY HANDLERS ---

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Auto-generate slug if empty
        const dataToSubmit = {
            ...categoryFormData,
            slug: categoryFormData.slug || categoryFormData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        };

        const result = editingCategory
            ? await updateToolCategory(editingCategory.id, dataToSubmit)
            : await createToolCategory(dataToSubmit);

        if (result.success) {
            setCategoryFormData({ name: '', slug: '', order: 0 });
            setEditingCategory(null);
            const updatedCategories = await getToolCategories();
            setCategories(updatedCategories);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleEditCategory = (category: any) => {
        setEditingCategory(category);
        setCategoryFormData({
            name: category.name,
            slug: category.slug,
            order: category.order
        });
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('¿Eliminar esta categoría? Las herramientas perderán su clasificación.')) return;
        setLoading(true);
        const result = await deleteToolCategory(id);
        if (result.success) {
            const updatedCategories = await getToolCategories();
            setCategories(updatedCategories);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Gestión de Herramientas y Categorías</h2>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'tools' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('tools')}
                    >
                        Herramientas
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'categories' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('categories')}
                    >
                        Categorías
                    </button>
                </div>
            </div>

            {activeTab === 'tools' ? (
                /* --- TOOLS TAB --- */
                <>
                    <form onSubmit={handleToolSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={toolFormData.name}
                                onChange={(e) => setToolFormData({ ...toolFormData, name: e.target.value })}
                                placeholder="Ej: CRM Interno"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>URL</label>
                            <input
                                type="text"
                                value={toolFormData.url}
                                onChange={(e) => setToolFormData({ ...toolFormData, url: e.target.value })}
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div className={styles.gridInputs}>
                            <div className={styles.inputGroup}>
                                <label>Icono</label>
                                <div className={styles.emojiPickerContainer}>
                                    <button
                                        type="button"
                                        className={styles.emojiButton}
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    >
                                        {toolFormData.icon || 'Seleccionar...'}
                                    </button>
                                    {showEmojiPicker && (
                                        <div className={styles.emojiGrid}>
                                            {['⚡', '🛠️', '📊', '📅', '👥', '📢', '📁', '✉️', '📞', '🌐', '🚀', '🔒', '🔔', '💬', '📝', '📈', '🛒', '🎓', '🚑', '✈️'].map(emoji => (
                                                <div
                                                    key={emoji}
                                                    className={styles.emojiItem}
                                                    onClick={() => {
                                                        setToolFormData({ ...toolFormData, icon: emoji });
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
                                    value={toolFormData.image}
                                    onChange={(e) => setToolFormData({ ...toolFormData, image: e.target.value })}
                                    placeholder="URL de imagen"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Orden</label>
                                <input
                                    type="number"
                                    value={toolFormData.order}
                                    onChange={(e) => setToolFormData({ ...toolFormData, order: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Categoría</label>
                            <select
                                value={toolFormData.categoryId}
                                onChange={(e) => setToolFormData({ ...toolFormData, categoryId: e.target.value })}
                                className={styles.select}
                            >
                                <option value="">-- Sin categoría --</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Visibilidad</label>
                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={toolFormData.locations.includes('DASHBOARD')}
                                        onChange={() => handleToolLocationChange('DASHBOARD')}
                                    />
                                    Dashboard
                                </label>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={toolFormData.locations.includes('TOOLS_PAGE')}
                                        onChange={() => handleToolLocationChange('TOOLS_PAGE')}
                                    />
                                    Página Herramientas
                                </label>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Vincular a Campaña</label>
                            <select
                                value={toolFormData.campaignId}
                                onChange={(e) => setToolFormData({ ...toolFormData, campaignId: e.target.value })}
                                className={styles.select}
                            >
                                <option value="">-- Ninguna --</option>
                                {campaigns.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {editingTool ? 'Actualizar' : 'Añadir'}
                            </button>
                            {editingTool && (
                                <button type="button" className={styles.cancelBtn} onClick={() => {
                                    setEditingTool(null);
                                    setToolFormData({
                                        name: '', url: '', description: '', icon: '', image: '', order: 0,
                                        locations: ['DASHBOARD', 'TOOLS_PAGE'],
                                        categoryId: '',
                                        campaignId: ''
                                    });
                                }}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    <div className={styles.list}>
                        {tools.map((tool) => {
                            const categoryName = categories.find(c => c.id === tool.categoryId)?.name || 'General';
                            return (
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
                                                <span className={styles.badge}>{categoryName}</span>
                                                {tool.campaign && <span className={styles.badgeCampaign}>{tool.campaign.name}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <button onClick={() => handleEditTool(tool)} className={styles.editBtn}>Editar</button>
                                        <button onClick={() => handleDeleteTool(tool.id)} className={styles.deleteBtn}>X</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                /* --- CATEGORIES TAB --- */
                <>
                    <form onSubmit={handleCategorySubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Nombre de Categoría</label>
                            <input
                                type="text"
                                value={categoryFormData.name}
                                onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                                placeholder="Ej: CRM, Operaciones..."
                                required
                            />
                        </div>
                        <div className={styles.gridInputs}>
                            <div className={styles.inputGroup}>
                                <label>Indentificador (Slug)</label>
                                <input
                                    type="text"
                                    value={categoryFormData.slug}
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })}
                                    placeholder="crm-gestion (opcional)"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Orden</label>
                                <input
                                    type="number"
                                    value={categoryFormData.order}
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, order: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {editingCategory ? 'Actualizar Categoría' : 'Añadir Categoría'}
                            </button>
                            {editingCategory && (
                                <button type="button" className={styles.cancelBtn} onClick={() => {
                                    setEditingCategory(null);
                                    setCategoryFormData({ name: '', slug: '', order: 0 });
                                }}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    <div className={styles.list}>
                        {categories.map((cat) => (
                            <div key={cat.id} className={styles.toolItem}>
                                <div className={styles.toolInfo}>
                                    <div>
                                        <div className={styles.toolTitle}>{cat.name}</div>
                                        <div className={styles.toolMeta}>
                                            <span className={styles.badge}>Slug: {cat.slug}</span>
                                            <span className={styles.badge}>Orden: {cat.order}</span>
                                            <span className={styles.badge}>{cat.tools?.length || 0} herramientas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => handleEditCategory(cat)} className={styles.editBtn}>Editar</button>
                                    <button onClick={() => handleDeleteCategory(cat.id)} className={styles.deleteBtn}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
