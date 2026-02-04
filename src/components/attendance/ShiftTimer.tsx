"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./ShiftTimer.module.css";
import { getShiftStatus, clockIn, clockOut, togglePause } from "@/actions/attendance";
import { useRouter } from "next/navigation";

export const ShiftTimer = () => {
    const router = useRouter();
    const [status, setStatus] = useState("LOADING"); // NULL, ACTIVE, PAUSED, LOADING
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [loadingAction, setLoadingAction] = useState(false);

    const fetchStatus = useCallback(async () => {
        try {
            const data = await getShiftStatus();
            if (data?.error) return; // Handle error silently or show toast

            setStatus(data.status || "NULL");
            if (data.status === "ACTIVE" && data.lastEntry) {
                setStartTime(new Date(data.lastEntry.timestamp));
            } else {
                setStartTime(null);
                setElapsed(0);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === "ACTIVE" && startTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
                setElapsed(diff);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status, startTime]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    const getLocation = (): Promise<{ lat?: number; lng?: number; accuracy?: number }> => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({});
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        accuracy: pos.coords.accuracy
                    });
                },
                (err) => {
                    console.warn("Location error:", err);
                    resolve({});
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        });
    };

    const handleAction = async (action: "IN" | "OUT" | "PAUSE") => {
        setLoadingAction(true);
        const loc = await getLocation();

        let res;
        if (action === "IN") res = await clockIn(loc);
        else if (action === "OUT") res = await clockOut(loc);
        else if (action === "PAUSE") res = await togglePause(loc);

        if (res?.success) {
            await fetchStatus();
            router.refresh();
        } else {
            alert(res?.error || "Error al procesar la solicitud");
        }
        setLoadingAction(false);
    };

    if (status === "LOADING") return <div className={styles.container}>...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.timerDisplay}>
                <div className={`${styles.statusDot} ${styles[status]}`} />
                <span className={styles.timeText}>
                    {status === "ACTIVE" ? formatTime(elapsed) : status === "PAUSED" ? "EN PAUSA" : "00:00:00"}
                </span>
            </div>

            <div className={styles.controls}>
                {status === "NULL" && (
                    <button
                        className={styles.btnStart}
                        onClick={() => handleAction("IN")}
                        disabled={loadingAction}
                    >
                        {loadingAction ? "..." : "▶ Iniciar"}
                    </button>
                )}

                {status === "ACTIVE" && (
                    <>
                        <button
                            className={styles.btnPause}
                            onClick={() => handleAction("PAUSE")}
                            disabled={loadingAction}
                            title="Pausar"
                        >
                            ⏸
                        </button>
                        <button
                            className={styles.btnStop}
                            onClick={() => handleAction("OUT")}
                            disabled={loadingAction}
                            title="Finalizar Turno"
                        >
                            ⏹
                        </button>
                    </>
                )}

                {status === "PAUSED" && (
                    <button
                        className={styles.btnResume}
                        onClick={() => handleAction("PAUSE")} // Toggle calls resume if paused
                        disabled={loadingAction}
                    >
                        ▶ Reanudar
                    </button>
                )}
            </div>
        </div>
    );
};
