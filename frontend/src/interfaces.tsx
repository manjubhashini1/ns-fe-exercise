export const TRANSACTION_TYPES = ['credit', 'debit', 'all'] as const;

export type transactionType = (typeof TRANSACTION_TYPES)[number];
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: transactionType;
  category_rel: {
    id: number;
    name: string;
  };
    category?: {
    id: number;
    name: string;
  };
  date: string;
  user_id: number;
  tags?: { id: number; name: string }[];
}

type SortBy = "date" | "amount" | "description" | "type" | "category";
type SortOrder = "asc" | "desc";
