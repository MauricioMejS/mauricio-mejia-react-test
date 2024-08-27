import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import styles from './Input.module.scss';

type InputProps = {
  name: string;
  label: string;
};

const Input: React.FC<InputProps> = ({ name, label }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className={styles['input-container']}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          console.log(field),
          <input {...field} 
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className={errors[name] ? styles['input-error'] : ''} />
        )}
      />
      {errors[name] && <span className={styles.error}>{String(errors[name]?.message)}</span>}
    </div>
  );
};

export default Input;