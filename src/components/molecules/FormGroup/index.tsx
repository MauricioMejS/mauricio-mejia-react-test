import React, { ReactNode } from 'react';
import styles from './FormGroup.module.scss';
import Label from '@/components/atoms/Label';

interface FormGroupProps {
    label: string;
    children: ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children }) => {
    return (
        <div className={styles.formGroup}>
            <Label htmlFor={''} text={label} />
            <div className={styles.inputContainer}>{children}</div>
        </div>
    );
};

export default FormGroup;