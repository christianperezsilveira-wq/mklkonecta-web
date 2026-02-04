"use client";

import React, { useState, useEffect } from "react";
import styles from "./AttendancePage.module.css";
import { getMyAttendance } from "@/actions/attendance";

export default function AttendancePage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setLoading(true);
        const res = await getMyAttendance();
        if (res.success) {
            setHistory(res.data);
        }
        setLoading(false);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "IN": return "ENTRADA";
            case "OUT": return "SALIDA";
            case "PAUSE": return "PAUSA";
            case "RESUME": return "REANUDAR";
            default: return type;
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mi Historial de Asistencia</h1>
            <p className="text-gray-500 mb-6">Visualiza tus registros de entrada y salida del mes en curso.</p>

            <div className={styles.historyList}>
                {loading ? (
                    <div className={styles.empty}>Cargando historial...</div>
                ) : history.length === 0 ? (
                    <div className={styles.empty}>No hay registros este mes.</div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Evento</th>
                                <th>Origen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry) => (
                                <tr key={entry.id} className={styles[entry.type]}>
                                    <td>{formatDate(entry.timestamp)}</td>
                                    <td>{formatTime(entry.timestamp)}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[entry.type]}`}>
                                            {getTypeLabel(entry.type)}
                                        </span>
                                    </td>
                                    <td>{entry.origin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
