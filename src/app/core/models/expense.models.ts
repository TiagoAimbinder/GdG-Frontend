export interface BaseExpense {
  exp_name: string;
  exp_amount: number;
  exp_percentVta: number;
  cat_id: number | null;
}

export interface Expense extends BaseExpense {
  usu_id: number,
}