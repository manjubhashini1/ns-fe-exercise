import { Transaction } from "./interfaces";

export const mockTransactions: Transaction[] = [
  { id: 1, description: "GMKrodddcery shopping", amount: 75.5, type: "debit", category_rel: { id: 1, name: "Groceries" }, date: "2026-02-01", user_id: 101 },
  { id: 2, description: "Monthly salary", amount: 3200, type: "credit", category_rel: { id: 2, name: "Salary" }, date: "2026-02-01", user_id: 101 },
  { id: 3, description: "Electricity bill", amount: 120, type: "debit", category_rel: { id: 3, name: "Utilities" }, date: "2026-02-02", user_id: 101 },
  { id: 4, description: "Dinner at restaurant", amount: 45.25, type: "debit", category_rel: { id: 4, name: "Dining" }, date: "2026-02-03", user_id: 101 },
  { id: 5, description: "Freelance project", amount: 600, type: "credit", category_rel: { id: 5, name: "Freelance" }, date: "2026-02-04", user_id: 101 },
  { id: 6, description: "Uber ride", amount: 18.9, type: "debit", category_rel: { id: 6, name: "Transport" }, date: "2026-02-05", user_id: 101 },
  { id: 7, description: "Gym membership", amount: 50, type: "debit", category_rel: { id: 7, name: "Health" }, date: "2026-02-05", user_id: 101 },
  { id: 8, description: "Movie tickets", amount: 30, type: "debit", category_rel: { id: 8, name: "Entertainment" }, date: "2026-02-06", user_id: 101 },
  { id: 9, description: "Coffee", amount: 5.75, type: "debit", category_rel: { id: 9, name: "Food & Drinks" }, date: "2026-02-06", user_id: 101 },
  { id: 10, description: "Internet bill", amount: 60, type: "debit", category_rel: { id: 3, name: "Utilities" }, date: "2026-02-07", user_id: 101 },
  { id: 11, description: "Book purchase", amount: 22.4, type: "debit", category_rel: { id: 10, name: "Education" }, date: "2026-02-08", user_id: 101 },
  { id: 12, description: "Bonus", amount: 500, type: "credit", category_rel: { id: 11, name: "Bonus" }, date: "2026-02-08", user_id: 101 },
  { id: 13, description: "Clothing shopping", amount: 140, type: "debit", category_rel: { id: 12, name: "Shopping" }, date: "2026-02-09", user_id: 101 },
  { id: 14, description: "Pharmacy", amount: 28.6, type: "debit", category_rel: { id: 7, name: "Health" }, date: "2026-02-10", user_id: 101 },
  { id: 15, description: "Car fuel", amount: 55, type: "debit", category_rel: { id: 6, name: "Transport" }, date: "2026-02-11", user_id: 101 },
  { id: 16, description: "Streaming subscription", amount: 15.99, type: "debit", category_rel: { id: 8, name: "Entertainment" }, date: "2026-02-12", user_id: 101 },
  { id: 17, description: "Side gig payment", amount: 250, type: "credit", category_rel: { id: 5, name: "Freelance" }, date: "2026-02-13", user_id: 101 },
  { id: 18, description: "Lunch", amount: 12.5, type: "debit", category_rel: { id: 9, name: "Food & Drinks" }, date: "2026-02-14", user_id: 101 },
  { id: 19, description: "Parking fee", amount: 10, type: "debit", category_rel: { id: 6, name: "Transport" }, date: "2026-02-15", user_id: 101 },
  { id: 20, description: "Investment return", amount: 180, type: "credit", category_rel: { id: 13, name: "Investment" }, date: "2026-02-16", user_id: 101 }
];