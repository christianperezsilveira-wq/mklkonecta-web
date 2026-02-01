import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    hoverable?: boolean;
    className?: string;
    style?: React.CSSProperties; // Add style prop support
}

export const Card: React.FC<CardProps> = ({ children, hoverable = false, className, style }) => {
    return (
        <div
            className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className || ''}`}
            style={style}
        >
            {children}
        </div>
    );
};
