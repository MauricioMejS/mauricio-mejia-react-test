import React from 'react';
import styles from './AuthTemplate.module.scss';
import LoginForm from '@/components/organisms/LoginForm';
import Label from '@/components/atoms/Label';
import Background from '@/components/organisms/Background';

interface AuthTemplateProps {
    onSubmit: (data: { email: string; password: string }) => void;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({onSubmit}) => {


    return (
      <>
        <Background />
          <div className={styles.authTemplate}>
            <div className={styles.authTemplateContent}>
              <Label htmlFor={"login"} text={"Login"} />
              <LoginForm
                onSubmit={onSubmit}
              />
            </div>
          </div>
      </>
    );
};

export default AuthTemplate;