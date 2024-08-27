import React from 'react';
import styles from './Label.module.scss';

type LabelProps = {
  htmlFor: string;
  text: string;
};

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {text}
    </label>
  );
};

export default Label;