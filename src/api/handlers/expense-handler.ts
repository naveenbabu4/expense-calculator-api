import { NextFunction,Request,Response, } from "express";
import { IExpenseService } from '../../core/services/expense-service'
import { Expense } from "../api-models";

export interface IExpenseHandler{
    createExpense(req: Request, res: Response, next: NextFunction): void;
    updateExpense(req: Request, res: Response, next: NextFunction): void;
    deleteExpense(req: Request, res: Response, next: NextFunction): void; 
    getAllExpenses(req: Request, res: Response, next: NextFunction): void;
    getAllExpensesByExpenseType(req: Request, res: Response, next: NextFunction): void;
    getAllExpenesByName(req: Request, res: Response, next: NextFunction): void;
    getAllExpensesByDate(req: Request, res: Response, next: NextFunction): void;
    getAllExpensesByMonth(req: Request, res: Response, next: NextFunction): void;
}

export class ExpenseHandler implements IExpenseHandler{
    constructor(private expenseService: IExpenseService){}
    async createExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
        const expense = await this.expenseService.createExpense(req.body as Expense);
        res.status(201).json(expense);
    }
    async updateExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {id} = req.params;
        const updateExpense = await this.expenseService.updateExpense(id,{...req.body});
        res.status(201).json(updateExpense);
    }
    async deleteExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {id} =  req.params;
        const deleteExpense = await this.expenseService.deleteExpense(id);
        res.status(201).json(deleteExpense);
    }
    async getAllExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
        const expenses = await this.expenseService.getAllExpenses();
        res.status(201).json(expenses);
    }
    async getAllExpensesByExpenseType(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { expenseType } = req.body;
        const expenses = await this.expenseService.getAllExpensesByExpenseType(expenseType);
        res.status(201).json(expenses);
    }
    async getAllExpenesByName(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name } = req.body;
        const expenses = await this.expenseService.getAllExpenesByName(name);
        res.status(201).json(expenses);
    
    }
    async getAllExpensesByDate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { date } = req.body;
        const expenses = await this.expenseService.getAllExpensesByDate(date);
        res.status(201).json(expenses);
    
    }
    async getAllExpensesByMonth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { month } = req.body;
        const expenses = await this.expenseService.getAllExpensesByMonth(month);
        res.status(201).json(expenses);
    }

}