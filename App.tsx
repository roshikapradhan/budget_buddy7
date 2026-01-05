
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  PlusCircle, 
  Users, 
  PieChart, 
  LogOut, 
  Heart,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import HomePage from './components/HomePage';
import AddExpenses from './components/AddExpenses';
import BillSplitting from './components/BillSplitting';
import MonthlyBudget from './components/MonthlyBudget';
import Login from './components/Login';
import { PageType, Expense, BillSplit, BudgetConfig } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  // Persistence states
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [billSplits, setBillSplits] = useState<BillSplit[]>(() => {
    const saved = localStorage.getItem('billSplits');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState<BudgetConfig>(() => {
    const saved = localStorage.getItem('budget');
    return saved ? JSON.parse(saved) : { limit: 50000, month: new Date().toISOString().slice(0, 7) };
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('billSplits', JSON.stringify(billSplits));
  }, [billSplits]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    setCurrentPage('home');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={(p) => setCurrentPage(p)} />;
      case 'expenses': return <AddExpenses expenses={expenses} setExpenses={setExpenses} />;
      case 'splitting': return <BillSplitting splits={billSplits} setSplits={setBillSplits} />;
      case 'budget': return <MonthlyBudget budget={budget} setBudget={setBudget} expenses={expenses} />;
      default: return <HomePage onNavigate={(p) => setCurrentPage(p)} />;
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'expenses', icon: PlusCircle, label: 'Add Expenses' },
    { id: 'splitting', icon: Users, label: 'Bill Splitting' },
    { id: 'budget', icon: PieChart, label: 'Monthly Budget' },
  ];

  return (
    <div className="min-h-screen flex bg-pink-50 text-slate-800 selection:bg-pink-200">
      {/* Sidebar / Sidebar Nav */}
      <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white border-r border-pink-100 flex flex-col items-center py-8 z-50">
        <div className="flex items-center gap-3 mb-12 group cursor-default">
          <div className="p-3 bg-pink-500 rounded-2xl shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="hidden md:block text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-transparent">
            Budget Buddy
          </h1>
        </div>

        <div className="flex-1 flex flex-col gap-4 w-full px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as PageType)}
              className={`
                flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative
                ${currentPage === item.id 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'text-pink-400 hover:bg-pink-50 hover:text-pink-600'}
              `}
            >
              <item.icon className={`w-6 h-6 ${currentPage === item.id ? 'animate-pulse' : 'group-hover:scale-110'}`} />
              <span className="hidden md:block font-semibold">{item.label}</span>
              {currentPage === item.id && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-l-full" />
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-4 py-4 w-full md:px-8 text-pink-400 hover:text-rose-600 transition-colors group"
        >
          <LogOut className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          <span className="hidden md:block font-semibold">Logout</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8 animate-in fade-in slide-in-from-right duration-700">
        <div className="max-w-6xl mx-auto pb-12">
          {renderPage()}
        </div>
      </main>

      {/* Global Background Decorations */}
      <div className="fixed top-[-10%] right-[-5%] w-[400px] h-[400px] bg-pink-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
    </div>
  );
};

export default App;
