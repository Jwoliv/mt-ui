import {Account} from "./account.model";

export interface Transaction {
    id: number;
    category: string;
    type: TransactionType
    amount: number;
    date: Date;
    account: Account;
}

export interface NewTransactionRequest {
    amount: number;
    accountId: number;
    categoryId: number;
    date: Date;
    from?: string;
    note?: string;
    type: TransactionType
}

export interface TransactionDashboard {
  id: number;
  amount: number;
  type: TransactionType;
  categoryName: string;
  accountName: string;
  date: Date;
}

type TransactionType = 'EARNING' | 'SPENDING'
