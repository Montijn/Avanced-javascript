import { Timestamp } from "firebase/firestore";

export interface Transaction {
    id: string;
    huishoudboekjeId: string;
    amount: number;
    type: 'income' | 'expense';
    date: Timestamp;
    description: string;
    categoryId?: string;
}