
export interface Category {
    id: string;
    householdBookId: string;
    name: string;
    maxBudget: number;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}