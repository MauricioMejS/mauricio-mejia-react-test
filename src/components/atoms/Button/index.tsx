import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
    onClick?: () => void | null | Promise<boolean>;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => {
    return (
        <button type={type} className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;