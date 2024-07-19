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
    type: 'EARNING' | 'SPENDING' | 'TRANSFER'
}

type TransactionType = 'EARNING' | 'SPENDING'