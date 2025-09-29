'use client';

import { useState } from 'react';
import { X, UserPlus, Mail, Lock, Eye, EyeOff, User, Building, Building2, Sun, Moon } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  darkMode?: boolean;
  setDarkMode?: (darkMode: boolean) => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin, darkMode = false, setDarkMode }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Here you would typically redirect to dashboard or send verification email
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-3xl shadow-xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto transition-colors duration-300 ${darkMode ? 'bg-black border border-gray-800' : 'bg-white'}`}>
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
          <h2 className={`text-3xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Crear Cuenta</h2>
          <p className={`text-lg transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Únete a Nexus Studio hoy mismo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nombre Completo
            </label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Tu nombre completo"
                required
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className={`block text-sm font-medium mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Empresa
            </label>
            <div className="relative">
              <Building className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Nombre de tu empresa"
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-12 pr-12 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-12 pr-12 py-4 rounded-2xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder="Confirma tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Al registrarte, aceptas nuestros{' '}
            <button type="button" className={`font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
              Términos de Servicio
            </button>{' '}
            y{' '}
            <button type="button" className={`font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
              Política de Privacidad
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
                <span>Creando cuenta...</span>
              </div>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-8 text-center">
          <p className={`transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onSwitchToLogin}
              className={`font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}