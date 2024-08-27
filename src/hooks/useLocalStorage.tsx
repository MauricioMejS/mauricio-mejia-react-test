import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';

function useSession(secretKey: string, preSessionData: any = null) {
  const [sessionData, setSessionData] = useState(null);
  const router = useRouter();
  let logoutTimer: NodeJS.Timeout;

  const saveSession = (key: string, value: any) => {
    try {
      const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
      window.localStorage.setItem(key, encryptedValue);
      setSessionData(value);
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

  const verifySession = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const bytes = CryptoJS.AES.decrypt(item, secretKey);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setSessionData(data);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
      return null;
    }
  };

  const removeSession = (key: string) => {
    try {
      window.localStorage.removeItem(key);
      setSessionData(null);
      clearTimeout(logoutTimer);
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
    }
  };

  const startSessionTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      removeSession('mySecretKey');
      router.push('/login');
    }, 1000 * 60 * 5);
  };

  const resetSessionTimer = () => {
    startSessionTimer();
  };

  useEffect(() => {
    const existingSession = verifySession('mySecretKey');
    if (!existingSession && preSessionData) {
      saveSession('mySecretKey', preSessionData);
    }
    
    const handleActivity = () => resetSessionTimer();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(logoutTimer);
    };
  }, []);

  return { sessionData, saveSession, verifySession, removeSession };
}

export default useSession;