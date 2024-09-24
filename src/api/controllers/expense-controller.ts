import { IExpenseStorage, ExpenseStorage } from '../../core/storage/expense-storage';
import { IExpenseService, ExpenseService } from '../../core/services/expense-service';
import { IExpenseHandler, ExpenseHandler } from '../handlers/expense-handler';
import { asyncErrorMiddleware } from '../middlewares/async-error-middleware';
import { AmountStorage,IAmountStorage } from '../../core/storage/amount-storage';

const expenseStorage: IExpenseStorage = new ExpenseStorage();
const amountStorage: IAmountStorage = new AmountStorage();
const expenseService: IExpenseService = new ExpenseService(expenseStorage,amountStorage);
const expenseHandler: IExpenseHandler = new ExpenseHandler(expenseService);

const createExpense = asyncErrorMiddleware(expenseHandler.createExpense.bind(expenseHandler));
const updateExpense = asyncErrorMiddleware(expenseHandler.updateExpense.bind(expenseHandler));
const deleteExpense = asyncErrorMiddleware(expenseHandler.deleteExpense.bind(expenseHandler));
const getAllExpenses = asyncErrorMiddleware(expenseHandler.getAllExpenses.bind(expenseHandler));
const getAllExpensesByExpenseType = asyncErrorMiddleware(expenseHandler.getAllExpensesByExpenseType.bind(expenseHandler));
const getAllExpenesByName = asyncErrorMiddleware(expenseHandler.getAllExpenesByName.bind(expenseHandler));
const getAllExpensesByDate = asyncErrorMiddleware(expenseHandler.getAllExpensesByDate.bind(expenseHandler));
const getAllExpensesByMonth = asyncErrorMiddleware(expenseHandler.getAllExpensesByMonth.bind(expenseHandler));

export {
    createExpense,
    updateExpense,
    deleteExpense,
    getAllExpenses,
    getAllExpensesByExpenseType,
    getAllExpenesByName,
    getAllExpensesByDate,
    getAllExpensesByMonth
}