import { Lock, User } from 'lucide-react';
import { LoginCredentials } from '../../types/auth';
import { AnimatedElement } from '../UI/AnimatedElement';
import { InputField } from './InputField';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
  error: string | null;
}

export function LoginForm({ onLogin, error }: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onLogin({
      username: formData.get('username') as string,
      password: formData.get('password') as string
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <AnimatedElement animation="scaleIn">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
            <AnimatedElement animation="slideUp" className="text-center mb-8">
              <h2 className="text-2xl font-medium text-primary mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">Sign in to access admin panel</p>
            </AnimatedElement>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedElement animation="slideIn">
                <InputField
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  icon={<User className="h-5 w-5 text-gray-500" />}
                  required
                />
              </AnimatedElement>

              <AnimatedElement animation="slideIn">
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  icon={<Lock className="h-5 w-5 text-gray-500" />}
                  required
                />
              </AnimatedElement>

              {error && (
                <AnimatedElement animation="fadeIn">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                </AnimatedElement>
              )}

              <AnimatedElement animation="slideUp">
                <button 
                  type="submit" 
                  className="btn-primary w-full justify-center py-2.5"
                >
                  Sign In
                </button>
              </AnimatedElement>
            </form>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
}