"use client";

import React, { useState, useEffect } from "react";
import styles from "./ReportsPage.module.css";
import { getDailyReport } from "@/actions/attendance";

export default function ReportsPage() {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [reportData, setReportData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadReport();
    }, [date]);

    const loadReport = async () => {
        setLoading(true);
        const res = await getDailyReport(new Date(date));
        if (res.success) {
            setReportData(res.data);
        }
        setLoading(false);
    };

    const exportCSV = () => {
        if (!reportData.length) return;

        const headers = ["Nombre", "Email", "Entrada", "Salida", "Estado"];
        const rows = reportData.map(row => [
            row.user.name,
            row.user.email,
            row.firstIn ? new Date(row.firstIn).toLocaleTimeString() : "-",
            row.lastOut ? new Date(row.lastOut).toLocaleTimeString() : "-",
            row.status
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `reporte_diario_${date}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Reportes de Asistencia</h1>
                <div className={styles.controls}>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.dateInput}
                    />
                    <button onClick={exportCSV} className={styles.exportButton}>
                        ⬇ Exportar CSV
                    </button>
                </div>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Entrada</th>
                            <th>Salida</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={4} className={styles.loading}>Cargando...</td></tr>
                        ) : reportData.length === 0 ? (
                            <tr><td colSpan={4} className={styles.empty}>No hay datos para esta fecha</td></tr>
                        ) : (
                            reportData.map((row, idx) => (
                                <tr key={idx}>
                                    <td className={styles.userCell}>
                                        <div className={styles.userName}>{row.user.name}</div>
                                        <div className={styles.userEmail}>{row.user.email}</div>
                                    </td>
                                    <td>{row.firstIn ? new Date(row.firstIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}</td>
                                    <td>{row.lastOut ? new Date(row.lastOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[row.status]}`}>
                                            {row.status === "ACTIVE" ? "Activo" : row.status === "COMPLETED" ? "Completado" : "Ausente"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
