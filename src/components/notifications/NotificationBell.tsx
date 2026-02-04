"use client";

import React, { useState, useEffect } from "react";
import styles from "./NotificationBell.module.css";
import { checkNotifications, NotificationState } from "@/actions/notifications";
import Link from "next/link";

export const NotificationBell = () => {
    const [state, setState] = useState<NotificationState>({ hasNotifications: false, count: 0, items: [] });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Initial check
        fetchNotifications();

        // Poll every 60 seconds
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        const result = await checkNotifications();
        setState(result);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.bellButton} ${state.hasNotifications ? styles.ringing : ''}`}
                onClick={toggleDropdown}
                title="Notificaciones"
            >
                🔔
                {state.hasNotifications && (
                    <span className={styles.badge}>{state.count}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.header}>Notificaciones</div>
                    <div className={styles.list}>
                        {state.items.length === 0 ? (
                            <div className={styles.empty}>No tienes notificaciones nuevas.</div>
                        ) : (
                            state.items.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.link || "#"}
                                    className={`${styles.item} ${styles[item.type]}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className={styles.icon}>
                                        {item.type === "URGENT" ? "🔴" : "ℹ️"}
                                    </span>
                                    <span className={styles.message}>{item.message}</span>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop to close on click outside */}
            {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}
        </div>
    );
};
