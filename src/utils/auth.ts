import { LoginCredentials } from '../types/auth';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Facai8898@'
};

export const validateCredentials = (credentials: LoginCredentials): boolean => {
  return (
    credentials.username === ADMIN_CREDENTIALS.username &&
    credentials.password === ADMIN_CREDENTIALS.password
  );
};