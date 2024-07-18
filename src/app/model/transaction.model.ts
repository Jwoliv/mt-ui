import {Account} from "./account.model";

export interface Transaction {
    id: number;
    category: string;
    type: TransactionType
    amount: number;
    date: Date;
    account: Account;
}

type TransactionType = 'EARNING' | 'SPENDING'