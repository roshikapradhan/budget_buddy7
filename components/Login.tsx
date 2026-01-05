
import React, { useState } from 'react';
import { Heart, Lock, User, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    if (username && password) {
      onLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-pink-200 overflow-hidden border border-pink-100 animate-in zoom-in duration-500">
        <div className="bg-pink-500 p-12 text-center text-white relative">
          <div className="absolute top-4 right-4 animate-bounce">
            <Sparkles className="w-6 h-6 text-pink-200" />
          </div>
          <div className="inline-flex p-4 bg-white/20 rounded-3xl mb-6 backdrop-blur-md">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h2 className="text-4xl font-bold mb-2">Budget Buddy</h2>
          <p className="text-pink-100 text-sm">Welcome back, gorgeous!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-pink-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-300 rounded-2xl outline-none transition-all placeholder:text-pink-300 font-medium"
                required
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-pink-500 transition-colors" />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-300 rounded-2xl outline-none transition-all placeholder:text-pink-300 font-medium"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isRegistering ? 'Sign Up' : 'Log In'}
          </button>
          
          <div className="text-center pt-4">
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-pink-500 font-semibold hover:underline decoration-pink-300 underline-offset-4"
            >
              {isRegistering ? 'Already have an account? Login' : 'New here? Create an account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
