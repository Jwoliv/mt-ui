import {Account} from "./account.model";

export interface Transaction {
    id: number;
    category: string;
    type: 'EARNING' | 'SPENDING'
    amount: number;
    date: Date;
    account: Account;
}