
import React, { useState } from 'react';
import { Plus, Trash2, Tag, IndianRupee, FileText, Filter } from 'lucide-react';
import { Expense, Category } from '../types';

interface AddExpensesProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const categories: Category[] = ['Food', 'Clothing', 'Travelling', 'Rent', 'Other'];

const AddExpenses: React.FC<AddExpensesProps> = ({ expenses, setExpenses }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses(prev => [newExpense, ...prev]);
    setDescription('');
    setAmount('');
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6 sticky top-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-100 border border-pink-50 animate-in slide-in-from-left">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <Plus className="w-8 h-8 text-pink-500" />
            Add Expense
          </h2>
          
          <form onSubmit={handleAddExpense} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">What did you spend on?</label>
              <div className="relative group">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-pink-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="e.g., Starbucks Coffee"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-200 rounded-2xl outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">How much?</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-pink-500">Rs.</span>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-200 rounded-2xl outline-none transition-all font-mono font-bold text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`
                      px-4 py-3 rounded-xl border-2 transition-all font-semibold flex items-center justify-center gap-2
                      ${category === cat 
                        ? 'border-pink-500 bg-pink-500 text-white shadow-md shadow-pink-100' 
                        : 'border-pink-100 bg-white text-pink-400 hover:border-pink-300 hover:text-pink-600'}
                    `}
                  >
                    <Tag className="w-4 h-4" />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-[1.02] active:scale-95 transition-all mt-4"
            >
              Save to List
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between px-2 mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Recent Transactions</h2>
          <div className="text-pink-500 font-bold bg-pink-100 px-4 py-2 rounded-full text-sm">
            {expenses.length} Total
          </div>
        </div>
        
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-pink-100">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-10 h-10 text-pink-200" />
              </div>
              <p className="text-slate-400 font-medium">No expenses yet. Go ahead, treat yourself!</p>
            </div>
          ) : (
            expenses.map((expense) => (
              <div 
                key={expense.id}
                className="group bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-pink-50 flex items-center justify-between animate-in slide-in-from-bottom duration-500"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center font-bold">
                    {expense.description.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{expense.description}</h4>
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <span className="text-pink-400 uppercase tracking-tighter">{expense.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 font-normal">{expense.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">
                      <span className="text-pink-500 text-sm align-top mr-0.5">Rs.</span>
                      {expense.amount.toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeExpense(expense.id)}
                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;
