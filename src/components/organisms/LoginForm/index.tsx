import React from 'react';
import styles from './LoginForm.module.scss';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import FormGroup from '@/components/molecules/FormGroup';
import Button from "@/components/atoms/Button";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label={"Email"}>
          <div className={styles.inputContainer}>
            <input placeholder='me@example.com' className={errors.email ? styles.inputError : styles.inputContainer} {...register("email")} />
            {errors.email?.message && (
              <p role="alert" className={styles.error}>
                {errors.email?.message}
              </p>
            )}
          </div>
        </FormGroup>
        <FormGroup label={"Password"}>
          <div className={styles.inputContainer}>
            <input type='password' placeholder='••••••••••' className={errors.password ? styles.inputError : styles.inputContainer} {...register("password")} />
            {errors.email?.message && (
              <p role="alert" className={styles.error}>
                {errors.password?.message}
              </p>
            )}
          </div>
        </FormGroup>
        <Button type={"submit"}>Login</Button>
      </form>
    );
};

export default LoginForm;