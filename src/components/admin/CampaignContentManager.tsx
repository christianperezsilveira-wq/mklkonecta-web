'use client';

import React, { useState, useEffect } from 'react';
import {
    getCampaignContent,
    createCampaignSection, updateCampaignSection, deleteCampaignSection,
    createCampaignLink, updateCampaignLink, deleteCampaignLink
} from '@/actions/admin';
import styles from './CampaignContentManager.module.css';

interface CampaignContentManagerProps {
    campaignId: string;
}

export const CampaignContentManager = ({ campaignId }: CampaignContentManagerProps) => {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // UI States
    const [editingSection, setEditingSection] = useState<any>(null);
    const [editingLink, setEditingLink] = useState<any>(null);
    const [showSectionForm, setShowSectionForm] = useState(false);
    const [showLinkForm, setShowLinkForm] = useState<string | null>(null); // sectionId or null

    // Forms
    const [sectionForm, setSectionForm] = useState({ title: '', order: 0 });
    const [linkForm, setLinkForm] = useState({ title: '', url: '', icon: '', order: 0 });

    useEffect(() => {
        loadContent();
    }, [campaignId]);

    const loadContent = async () => {
        setLoading(true);
        const data = await getCampaignContent(campaignId);
        setSections(data);
        setLoading(false);
    };

    // --- SECTION HANDLERS ---
    const handleSectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = editingSection
            ? await updateCampaignSection(editingSection.id, sectionForm)
            : await createCampaignSection({ ...sectionForm, campaignId });

        if (result.success) {
            setSectionForm({ title: '', order: 0 });
            setEditingSection(null);
            setShowSectionForm(false);
            loadContent();
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleDeleteSection = async (id: string) => {
        if (!confirm('¿Eliminar esta sección y todos sus links?')) return;
        const result = await deleteCampaignSection(id);
        if (result.success) loadContent();
        else alert(result.error);
    };

    // --- LINK HANDLERS ---
    const handleLinkSubmit = async (e: React.FormEvent, sectionId: string) => {
        e.preventDefault();
        setLoading(true);

        const result = editingLink
            ? await updateCampaignLink(editingLink.id, linkForm)
            : await createCampaignLink({ ...linkForm, sectionId });

        if (result.success) {
            setLinkForm({ title: '', url: '', icon: '', order: 0 });
            setEditingLink(null);
            setShowLinkForm(null);
            loadContent();
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleDeleteLink = async (id: string) => {
        if (!confirm('¿Eliminar este link?')) return;
        const result = await deleteCampaignLink(id);
        if (result.success) loadContent();
        else alert(result.error);
    };

    const startEditLink = (link: any) => {
        setEditingLink(link);
        setLinkForm({
            title: link.title,
            url: link.url,
            icon: link.icon || '',
            order: link.order
        });
        setShowLinkForm(link.sectionId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Contenido de la Campaña</h3>
                <button
                    className={styles.addButton}
                    onClick={() => {
                        setEditingSection(null);
                        setSectionForm({ title: '', order: 0 });
                        setShowSectionForm(true);
                    }}
                >
                    + Nueva Sección
                </button>
            </div>

            {/* Section Form Modal/Inline */}
            {showSectionForm && (
                <div className={styles.formContainer}>
                    <h4>{editingSection ? 'Editar Sección' : 'Nueva Sección'}</h4>
                    <form onSubmit={handleSectionSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Título</label>
                            <input
                                type="text"
                                value={sectionForm.title}
                                onChange={e => setSectionForm({ ...sectionForm, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Orden</label>
                            <input
                                type="number"
                                value={sectionForm.order}
                                onChange={e => setSectionForm({ ...sectionForm, order: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button type="submit" disabled={loading} className={styles.saveBtn}>Guardar</button>
                            <button type="button" onClick={() => setShowSectionForm(false)} className={styles.cancelBtn}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.sectionsList}>
                {sections.map(section => (
                    <div key={section.id} className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionInfo}>
                                <span className={styles.dragHandle}>☰</span>
                                <h4>{section.title}</h4>
                                <span className={styles.badge}>{section.order}</span>
                            </div>
                            <div className={styles.sectionActions}>
                                <button onClick={() => {
                                    setEditingSection(section);
                                    setSectionForm({ title: section.title, order: section.order });
                                    setShowSectionForm(true);
                                }}>✏️</button>
                                <button onClick={() => handleDeleteSection(section.id)}>🗑️</button>
                            </div>
                        </div>

                        {/* Links List */}
                        <div className={styles.linksList}>
                            {section.links.map((link: any) => (
                                <div key={link.id} className={styles.linkItem}>
                                    <div className={styles.linkContent}>
                                        <span className={styles.linkIcon}>{link.icon || '🔗'}</span>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                                    </div>
                                    <div className={styles.linkActions}>
                                        <button onClick={() => startEditLink(link)}>✏️</button>
                                        <button onClick={() => handleDeleteLink(link.id)}>✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Link Form */}
                        {showLinkForm === section.id ? (
                            <form onSubmit={(e) => handleLinkSubmit(e, section.id)} className={styles.linkForm}>
                                <div className={styles.gridInputs}>
                                    <input
                                        placeholder="Título del Link"
                                        value={linkForm.title}
                                        onChange={e => setLinkForm({ ...linkForm, title: e.target.value })}
                                        required
                                    />
                                    <input
                                        placeholder="URL (https://...)"
                                        value={linkForm.url}
                                        onChange={e => setLinkForm({ ...linkForm, url: e.target.value })}
                                        required
                                    />
                                    <input
                                        placeholder="Icono (Emoji)"
                                        value={linkForm.icon}
                                        onChange={e => setLinkForm({ ...linkForm, icon: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Orden"
                                        value={linkForm.order}
                                        onChange={e => setLinkForm({ ...linkForm, order: parseInt(e.target.value) })}
                                        style={{ width: '60px' }}
                                    />
                                </div>
                                <div className={styles.miniButtonGroup}>
                                    <button type="submit" className={styles.saveBtnSmall}>Guardar Link</button>
                                    <button type="button" onClick={() => setShowLinkForm(null)} className={styles.cancelBtnSmall}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <button
                                className={styles.addLinkBtn}
                                onClick={() => {
                                    setEditingLink(null);
                                    setLinkForm({ title: '', url: '', icon: '', order: 0 });
                                    setShowLinkForm(section.id);
                                }}
                            >
                                + Añadir Link
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {sections.length === 0 && !loading && (
                <p className={styles.emptyState}>No hay secciones de contenido. Crea una para empezar.</p>
            )}
        </div>
    );
};
