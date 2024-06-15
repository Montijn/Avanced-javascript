import { Timestamp } from "firebase/firestore";

export interface Category {
    id: string;
    huishoudboekjeId: string;
    name: string;
    maxBudget: number;
    endDate?: Timestamp | null;
}