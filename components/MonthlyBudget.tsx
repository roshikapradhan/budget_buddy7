
import React, { useState, useEffect } from 'react';
import { Target, AlertCircle, PieChart as ChartIcon, Calendar, TrendingDown, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BudgetConfig, Expense } from '../types';

interface MonthlyBudgetProps {
  budget: BudgetConfig;
  setBudget: React.Dispatch<React.SetStateAction<BudgetConfig>>;
  expenses: Expense[];
}

const COLORS = ['#f472b6', '#fb7185', '#e879f9', '#fca5a5', '#d946ef'];

const MonthlyBudget: React.FC<MonthlyBudgetProps> = ({ budget, setBudget, expenses }) => {
  const [newLimit, setNewLimit] = useState(budget.limit.toString());
  const [showNotification, setShowNotification] = useState(false);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = Math.max(0, budget.limit - totalSpent);
  const percentUsed = (totalSpent / budget.limit) * 100;

  useEffect(() => {
    if (totalSpent > budget.limit) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [totalSpent, budget.limit]);

  const updateLimit = () => {
    const limitNum = parseFloat(newLimit);
    if (!isNaN(limitNum)) {
      setBudget(prev => ({ ...prev, limit: limitNum }));
    }
  };

  const getChartData = () => {
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  const chartData = getChartData();

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {showNotification && (
        <div className="bg-rose-500 text-white p-6 rounded-[2rem] flex items-center gap-6 shadow-xl shadow-rose-200 animate-bounce">
          <div className="bg-white/20 p-4 rounded-2xl">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Budget Exceeded!</h3>
            <p className="opacity-90">Slow down, bestie! You've spent Rs. {(totalSpent - budget.limit).toLocaleString()} over your limit.</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-100 border border-pink-50">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Target className="w-7 h-7 text-pink-500" />
              Set Budget
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Monthly Limit</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-pink-500">Rs.</span>
                  <input 
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-200 rounded-2xl outline-none transition-all font-mono font-bold"
                  />
                </div>
              </div>
              <button 
                onClick={updateLimit}
                className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Update Budget
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-xl">
             <div className="flex justify-between items-start mb-12">
               <div>
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Spent</p>
                 <h3 className="text-3xl font-black">Rs. {totalSpent.toLocaleString()}</h3>
               </div>
               <div className="p-3 bg-white/10 rounded-2xl">
                 <TrendingDown className="w-6 h-6 text-pink-400" />
               </div>
             </div>
             
             <div className="space-y-4">
               <div className="flex justify-between items-end text-sm">
                 <span className="font-bold opacity-60">Progress</span>
                 <span className="font-black text-pink-400">{percentUsed.toFixed(1)}%</span>
               </div>
               <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-1000 ${percentUsed > 100 ? 'bg-rose-500' : 'bg-pink-500'}`}
                   style={{ width: `${Math.min(percentUsed, 100)}%` }}
                 />
               </div>
               <p className="text-xs text-slate-400 text-center font-bold tracking-tight">
                 {remaining > 0 ? `Rs. ${remaining.toLocaleString()} left to spend` : `You're in the red!`}
               </p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-100 border border-pink-50 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <ChartIcon className="w-7 h-7 text-pink-500" />
              Category Breakdown
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-slate-500 font-bold text-sm">
              <Calendar className="w-4 h-4" />
              Current Month
            </div>
          </div>

          <div className="flex-1 min-h-[400px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '15px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                  <ChartIcon className="w-10 h-10" />
                </div>
                <p className="font-bold">Add some expenses to see the magic!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudget;
