import useAuth from '@/core/hooks/use-auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from '../utils/model';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData, customOnLogin?: (data: LoginFormData) => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (customOnLogin) {
        await customOnLogin(data);
      } else {
        await login({ username: data.username, password: data.password });
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async (customOnGuestLogin?: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (customOnGuestLogin) {
        await customOnGuestLogin();
      } else {
        await login({ username: 'guest', password: '' });
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Guest login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
    handleGuestLogin,
    setError
  };
};
