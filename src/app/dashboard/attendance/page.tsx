"use client";

import React, { useState, useEffect } from "react";
import styles from "./AttendancePage.module.css";
import { getAttendanceHistory } from "@/actions/attendance";

export default function AttendancePage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1); // First day of month
        const end = new Date();

        // Is userId needed? The action gets it from session if not provided, 
        // but the action signature I wrote was (userId, start, end).
        // Let's verify the action signature.
        // Actually I can't pass userId from potential client component easily without session. 
        // I should update the action to use current user if ID not passed, or fetch session here.
        // For now let's try calling it. logic in action: if (session.user.id !== userId) return error.
        // Wait, the client component doesn't know the ID unless I pass it or fetch it.
        // Better approach: Server Component for the page? Or request user ID.
        // Let's make this page a Server Component that passes data to client, OR just fetch session.
        // Actually, let's keep it simple. I'll make a wrapper action or just fetch session.
        // But wait, getAttendanceHistory checks: if (session.user.id !== userId).
        // So I must provide the correct ID.

        // PROPER FIX: make this page authentication aware or fetch "my history" action.
    };

    // Changing approach: Create a specific action `getMyAttendanceHistory` to avoid ID exposure issues
    // OR just use useSession.

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mi Historial de Asistencia</h1>
            <p className="text-gray-500 mb-6">Visualiza tus registros de entrada y salida.</p>

            <div className={styles.historyList}>
                {/* Placeholder for history */}
                <div className={styles.empty}>
                    Cargando historial... (Implementación en curso)
                </div>
            </div>
        </div>
    );
}
