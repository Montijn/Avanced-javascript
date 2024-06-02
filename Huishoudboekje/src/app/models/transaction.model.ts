
export interface Transaction {
    id: string;
    householdBookId: string;
    amount: number;
    type: 'income' | 'expense';
    date: Date;
    description: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
}