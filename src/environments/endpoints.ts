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

  //---- Category
  getAllCategories = '/category/getAll',
  deleteCategories = '/category/delete',
  createCategories = '/category/create',
  updateCategories = '/category/update',


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