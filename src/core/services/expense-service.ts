import { ServiceError } from '../../errors/service-error'
import { ExpenseAttr } from '../models/expense'
import { AmountAttr } from '../models/amount';
import { IExpenseStorage } from '../storage/expense-storage';
import { IAmountStorage } from '../storage/amount-storage';

export interface IExpenseService {
    createExpense(expense: ExpenseAttr): Promise<ExpenseAttr | null>;
    updateExpense(id: string, expense: ExpenseAttr): Promise<ExpenseAttr | null>;
    deleteExpense(id: string): Promise<string | null>;
    getAllExpenses(): Promise<ExpenseAttr[] | null>
    getAllExpensesByExpenseType(expenseType: string): Promise<ExpenseAttr[] | null>
    getAllExpenesByName(name: string): Promise<ExpenseAttr[] | null>
    getAllExpensesByDate(date: Date): Promise<ExpenseAttr[] | null>
    getAllExpensesByMonth(month: Number): Promise<ExpenseAttr[] | null>
}
const amountProps: AmountAttr = {
    totalAmount: 0,
    addedAmount: 0,
    date: new Date(Date.now()),
    expenseId: "",
}
export class ExpenseService implements IExpenseService {
    constructor(private expenseStorage: IExpenseStorage, private amountStorage: IAmountStorage) { }
    async createExpense(expense: ExpenseAttr): Promise<ExpenseAttr | null> {
        if (expense) {
            const createExpense = await this.expenseStorage.createExpense(expense);
            amountProps.totalAmount = expense.amount;
            amountProps.expenseId = createExpense?.id;
            const amount = await this.amountStorage.updateAmount(amountProps);
            return createExpense;
        }
        else {
            throw new ServiceError(`can't create the expense with ${expense}`);
        }
    }
    async updateExpense(id: string, expense: ExpenseAttr): Promise<ExpenseAttr | null> {
        if (id) {
            const originalExpense = await this.expenseStorage.getExpenseById(id);
            const updateExpense = await this.expenseStorage.updateExpense(id, expense);
            if (updateExpense && originalExpense) {
                const deleteAmount = await this.amountStorage.deleteAmountByExpenseId(id,originalExpense?.amount);
                const amountOfExpense = await this.amountStorage.updateAmountByExpenseId(id,updateExpense?.amount);
                return updateExpense
            }
            else {
                throw new ServiceError(`No Expense found with ${id}`)
            }
        }
        else {
            throw new ServiceError(`Id not found`);
        }
    }
    async deleteExpense(id: string): Promise<string | null> {
        if (id) {
            const res = await this.expenseStorage.deleteExpense(id);
            if (res) {
                return res;
            }
            else {
                throw new ServiceError(`No Expense found with ${id}`);
            }
        }
        else {
            throw new ServiceError(`Id not found`);
        }
    }
    async getAllExpenses(): Promise<ExpenseAttr[] | null> {
        const expenses = await this.expenseStorage.getAllExpenses();
        return expenses;
    }
    async getAllExpensesByExpenseType(expenseType: string): Promise<ExpenseAttr[] | null> {
        if (expenseType) {
            const expenses = await this.expenseStorage.getAllExpensesByExpenseType(expenseType);
            if (expenses) {
                return expenses;
            }
            else {
                throw new ServiceError(`No Expenses found with ${expenseType}`);
            }
        }
        else {
            throw new ServiceError(`No Expense Type Found`);
        }
    }
    async getAllExpenesByName(name: string): Promise<ExpenseAttr[] | null> {
        if (name) {
            const expenses = await this.expenseStorage.getAllExpenesByName(name);
            if (expenses) {
                return expenses;
            }
            else {
                throw new ServiceError(`No Expenses found with ${name}`);
            }
        }
        else {
            throw new ServiceError(`No Name Found`);
        }
    }
    async getAllExpensesByDate(date: Date): Promise<ExpenseAttr[] | null> {
        if (date) {
            const expenses = await this.expenseStorage.getAllExpensesByDate(date);
            if (expenses) {
                return expenses;
            }
            else {
                throw new ServiceError(`No Expenses Found for this ${date}`);
            }
        }
        else {
            throw new ServiceError(`No Date Found`);
        }
    }
    async getAllExpensesByMonth(month: Number): Promise<ExpenseAttr[] | null> {
        throw new Error('Method not implemented.');
    }

}