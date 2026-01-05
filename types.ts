
export type Category = 'Food' | 'Clothing' | 'Travelling' | 'Rent' | 'Other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

export interface SplitPerson {
  id: string;
  name: string;
  paid: boolean;
}

export interface BillSplit {
  id: string;
  amount: number;
  description: string;
  people: SplitPerson[];
}

export interface BudgetConfig {
  limit: number;
  month: string;
}

export type PageType = 'home' | 'expenses' | 'splitting' | 'budget';
