import { Expense, ExpenseAttr } from "../models/expense";

export interface IExpenseStorage {
    createExpense(expense: ExpenseAttr) : Promise<ExpenseAttr | null >;
    updateExpense(id: string, expense:ExpenseAttr) : Promise<ExpenseAttr | null>;
    deleteExpense(id: string) : Promise<string | null>;
    getExpenseById(id: string) : Promise<ExpenseAttr | null>;
    getAllExpenses() : Promise<ExpenseAttr[] | null>
    getAllExpensesByExpenseType(expenseType: string) : Promise<ExpenseAttr[] | null>
    getAllExpenesByName(name:string) : Promise<ExpenseAttr[] | null>
    getAllExpensesByDate(date: Date) : Promise<ExpenseAttr[] | null>
    getAllExpensesByMonth(month: Number) : Promise<ExpenseAttr[] | null>
 }

 export class ExpenseStorage implements IExpenseStorage{
     async getExpenseById(id: string): Promise<ExpenseAttr | null> {
         const expense = await Expense.findById(id);
         return expense;
     }
     async createExpense(expense: ExpenseAttr): Promise<ExpenseAttr | null> {
         const expenseDb = new Expense(expense);
         expenseDb.save();
         return expenseDb;
     }
     async updateExpense(id: string, expense: ExpenseAttr): Promise<ExpenseAttr | null> {
         const exisitingExpense =  await Expense.findByIdAndUpdate(id,expense, {new: true})
         return exisitingExpense;
     }
     async deleteExpense(id: string): Promise<string | null> {
         const exisitingExpense =  await Expense.findByIdAndDelete(id);
         return exisitingExpense?.id;
     }
     async getAllExpenses(): Promise<ExpenseAttr[] | null> {
         const expenses = await Expense.find();
         return expenses;
     }
     async getAllExpensesByExpenseType(expenseType: string): Promise<ExpenseAttr[] | null> {
         const expensesOfExpenseType = await Expense.find({expenseType: expenseType}) ;
         return expensesOfExpenseType;
     }
     async getAllExpenesByName(name: string): Promise<ExpenseAttr[] | null> {
         const expensesByName = await Expense.find({name: name}) ;
         return expensesByName;
     }
     async getAllExpensesByDate(date: Date): Promise<ExpenseAttr[] | null>{
        const expensesByDate = await Expense.find({date: date}) ;
        return expensesByDate;
     }
     async getAllExpensesByMonth(month: Number): Promise<ExpenseAttr[] | null>{
        const expensesByMonth = await Expense.find({date: month}) ;
        return expensesByMonth;
     }
    
 }