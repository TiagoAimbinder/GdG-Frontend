export enum endpoints {

  // ---- Login
  loginUser = "/user/login",
  
  // ---- Manangement: 
  manangementCreate = "/manangement/create", 
  manangementGetAll = "/manangement/getAll",
  manangementDelete = "/manangement/delete",
  manangementUpdate = "/manangement/update",

    // ---- ManangementWeek: 
  manangementWeekCreate = "/manangementweek/create", 
  manangementWeekGetAll = "/manangementweek/getAll",
  manangementWeekDelete = "/manangementweek/delete",
  manangementWeekUpdate = "/manangementweek/update",
  manangementWeekMigrate = "/manangementweek/migrate",




  // ---- CurrencyType: 
  getAllCurrencyTypes = "/currency/getAll",

  // ---- Categories 
  getAllCategories = '/category/getAll',
  deleteCategories = '/category/delete',
  createCategories = '/category/create',
  updateCategories = '/category/update',

  // ---- Users
  getAllUsers = "/user/getAll",
  validateToken = "/user/validateToken", 

  // ---- Expenses
  getAllExpenses = '/expenses/getAll',
  deleteExpense = '/expenses/delete',
  createExpense = '/expenses/create',
  updateExpense = '/expenses/update',


}