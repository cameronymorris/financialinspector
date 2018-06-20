export interface FinancialListRecord {
    sign: string;
    description: string;
    value: number;
    currency: string;
}
  
export type FinancialList = FinancialListRecord[];