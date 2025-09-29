'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X, LogIn, Mail, Lock, Eye, EyeOff, Building2, Sun, Moon } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  darkMode?: boolean;
  setDarkMode?: (darkMode: boolean) => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister, darkMode = false, setDarkMode }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError('Credenciales inválidas');
      } else {
        onClose();
        window.location.reload(); // Refresh to update auth state
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-3xl shadow-xl max-w-md w-full p-8 relative transition-colors duration-300 ${darkMode ? 'bg-black border border-gray-800' : 'bg-white'}`}>
        {/* Header with Logo and Dark Mode Toggle */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}>
              <Building2 className={`w-6 h-6 ${darkMode ? 'text-black' : 'text-white'}`} />
            </div>
            <span className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nexus Studio</span>
          </div>

          <div className="flex items-center space-x-2">
            {setDarkMode && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Iniciar Sesión</h2>
          <p className={`text-lg transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Accede a tu cuenta de Nexus Studio</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`border rounded-2xl p-4 mb-6 transition-colors ${darkMode ? 'bg-red-900/20 border-red-800 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Contraseña
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-12 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className={`text-sm font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-full text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${darkMode ? 'border-black' : 'border-white'}`}></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-8 flex items-center">
          <div className={`flex-grow border-t transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
          <span className={`px-4 text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>o continúa con</span>
          <div className={`flex-grow border-t transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
        </div>

        {/* Google Login */}
        <button
          onClick={() => signIn('google')}
          className={`w-full flex items-center justify-center space-x-3 py-4 px-4 border rounded-2xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'}`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continuar con Google</span>
        </button>

        {/* Switch to Register */}
        <div className="mt-8 text-center">
          <p className={`transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ¿No tienes cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className={`font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}