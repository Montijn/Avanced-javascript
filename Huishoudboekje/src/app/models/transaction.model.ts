
export interface Transaction {
    id: string;
    huishoudboekjeId: string;
    amount: number;
    type: 'income' | 'expense';
    date: Date;
    description: string;
    categoryId?: string;
}