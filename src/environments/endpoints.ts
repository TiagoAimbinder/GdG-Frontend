export enum endpoints {

  // ---- Login
  loginUser = "/user/login",
  
  // ---- Manangement: 
  manangementCreate = "/manangement/create", 
  manangementGetAll = "/manangement/getAll",
  manangementDelete = "/manangement/delete",
  manangementUpdate = "/manangement/update",

  // ---- CurrencyType: 
  getAllCurrencyTypes = "/currency/getAll",

  // Users
  getAllUsers = "/user/getAll",

  // ---- Expenses
  getAllExpenses = '/expenses/getAll',
  deleteExpense = '/expenses/delete',
  createExpense = '/expenses/create',
  updateExpense = '/expenses/update',


  // ---- Categories 
  getAllCategories = '/category/getAll'
}