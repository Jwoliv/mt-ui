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

export interface TransactionDto {
  id: number;
  date: Date;
  amount: number;
  type: TransactionType;
  userId: number;
  categoryId: number;
  accountId: number;
  receiverAccountId: number;
  sender: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

type TransactionType = 'EARNING' | 'SPENDING' | 'TRANSFER'