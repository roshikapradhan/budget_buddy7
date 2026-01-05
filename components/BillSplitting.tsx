
import React, { useState } from 'react';
import { Users, UserPlus, Receipt, CheckCircle2, Circle, Trash2, SplitSquareVertical } from 'lucide-react';
import { BillSplit, SplitPerson } from '../types';

interface BillSplittingProps {
  splits: BillSplit[];
  setSplits: React.Dispatch<React.SetStateAction<BillSplit[]>>;
}

const BillSplitting: React.FC<BillSplittingProps> = ({ splits, setSplits }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [personName, setPersonName] = useState('');
  const [currentPeople, setCurrentPeople] = useState<{name: string, paid: boolean}[]>([]);

  const addPerson = () => {
    if (!personName) return;
    setCurrentPeople(prev => [...prev, { name: personName, paid: false }]);
    setPersonName('');
  };

  const createSplit = () => {
    if (!description || !amount || currentPeople.length === 0) return;
    
    const newSplit: BillSplit = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      people: currentPeople.map(p => ({ ...p, id: crypto.randomUUID() }))
    };

    setSplits(prev => [newSplit, ...prev]);
    setDescription('');
    setAmount('');
    setCurrentPeople([]);
  };

  const togglePaid = (splitId: string, personId: string) => {
    setSplits(prev => prev.map(s => {
      if (s.id === splitId) {
        return {
          ...s,
          people: s.people.map(p => p.id === personId ? { ...p, paid: !p.paid } : p)
        };
      }
      return s;
    }));
  };

  const deleteSplit = (id: string) => {
    setSplits(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6 sticky top-8 animate-in slide-in-from-left duration-700">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-100 border border-pink-50">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <SplitSquareVertical className="w-8 h-8 text-pink-500" />
            Split a Bill
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Event/Item Name</label>
              <div className="relative group">
                <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-pink-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="e.g., Weekend Dinner"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-200 rounded-2xl outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Total Amount</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-pink-500">Rs.</span>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-200 rounded-2xl outline-none transition-all font-mono font-bold"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-pink-50">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Who's involved?</label>
              <div className="flex gap-2">
                <div className="relative flex-1 group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-300 group-focus-within:text-pink-500 transition-colors" />
                  <input 
                    type="text"
                    placeholder="Friend's Name"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addPerson()}
                    className="w-full pl-12 pr-4 py-4 bg-pink-50 border-2 border-transparent focus:border-pink-200 rounded-2xl outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={addPerson}
                  className="p-4 bg-pink-100 text-pink-500 rounded-2xl hover:bg-pink-200 transition-colors"
                >
                  <UserPlus className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentPeople.map((p, i) => (
                  <div key={i} className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm font-bold animate-in zoom-in">
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={createSplit}
              disabled={!amount || currentPeople.length === 0}
              className="w-full py-4 bg-pink-500 disabled:opacity-50 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all mt-4"
            >
              Start Splitting
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 px-2">Active Splits</h2>
        {splits.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-pink-100">
             <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <SplitSquareVertical className="w-8 h-8 text-pink-200" />
             </div>
             <p className="text-slate-400 font-medium">No active splits. Invite some friends over!</p>
          </div>
        ) : (
          splits.map((split) => (
            <div key={split.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-50 animate-in slide-in-from-right duration-500 group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 flex items-center gap-4">
                 <button 
                  onClick={() => deleteSplit(split.id)}
                  className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-800">{split.description}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-3xl font-black text-slate-900">
                    <span className="text-pink-500 text-sm align-top mr-1">Rs.</span>
                    {split.amount.toLocaleString()}
                  </div>
                  <div className="px-3 py-1 bg-pink-50 text-pink-500 rounded-full text-xs font-bold">
                    Rs. {(split.amount / split.people.length).toFixed(2)} each
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {split.people.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => togglePaid(split.id, person.id)}
                    className={`
                      flex items-center justify-between p-4 rounded-2xl transition-all border-2
                      ${person.paid 
                        ? 'bg-green-50 border-green-100 text-green-700' 
                        : 'bg-pink-50 border-pink-100 text-pink-600'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {person.paid ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      <span className="font-bold">{person.name}</span>
                    </div>
                    <span className="text-xs font-black opacity-60 uppercase tracking-widest">
                      {person.paid ? 'Paid' : 'Due'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BillSplitting;
