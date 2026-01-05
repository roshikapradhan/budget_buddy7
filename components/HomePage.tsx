
import React from 'react';
import { PageType } from '../types';
import { ArrowRight, Sparkles, Coffee, Heart, Target, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-6 animate-in slide-in-from-top duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full font-bold text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Budgeting simplified
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
          Because <span className="text-pink-500 italic">adulting</span> is hard, <br />
          Budget Buddy makes it <span className="relative">
            easy
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-pink-200/50 -z-10 rounded-full" />
          </span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Take control of your finances without the stress. Track expenses, split bills with friends, and reach your saving goals with a splash of pink.
        </p>
        <button 
          onClick={() => onNavigate('expenses')}
          className="px-10 py-5 bg-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-pink-200 hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
        >
          Start Tracking Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {[
          { icon: Coffee, title: "Daily Expenses", desc: "Log your morning coffee or rent payments in seconds.", color: "bg-pink-100 text-pink-600" },
          { icon: Heart, title: "Bill Splitting", desc: "Dinner with friends? Split it effortlessly without the awkwardness.", color: "bg-rose-100 text-rose-600" },
          { icon: Target, title: "Budget Limits", desc: "Set monthly goals and get nudged when you're being too spendy.", color: "bg-fuchsia-100 text-fuchsia-600" }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-pink-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className={`w-14 h-14 ${feat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <feat.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{feat.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-bold">Financial health is self-care.</h2>
            <p className="text-pink-100 text-lg max-w-md">Join thousands of people taking the 'boring' out of banking. Your future self will thank you.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center">
              <div className="text-3xl font-bold mb-1">10k+</div>
              <div className="text-xs uppercase tracking-widest text-pink-100 font-bold">Happy Users</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-center">
              <div className="text-3xl font-bold mb-1">99%</div>
              <div className="text-xs uppercase tracking-widest text-pink-100 font-bold">Accuracy</div>
            </div>
          </div>
        </div>
        <TrendingUp className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 rotate-12" />
      </div>
    </div>
  );
};

export default HomePage;
