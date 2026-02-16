export const TRANSACTION_TYPES = ["credit", "debit", "all"] as const;

export type transactionType = typeof TRANSACTION_TYPES[number];
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: transactionType;
  category_rel: {
    id: number;
    name: string;
  };
  date: string;
  user_id: number;
}