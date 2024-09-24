import { NextFunction,Request,Response, } from "express";
import { IAmountService } from '../../core/services/amount-service'
import { Amount } from "../api-models";

export interface IAmountHandler{
    addAmount(req: Request, res: Response, next: NextFunction) : void;
    getAmount(req: Request, res: Response, next: NextFunction) : void;
    getTotalAmount(req: Request, res: Response, next: NextFunction) : void;
}

export class AmountHandler implements IAmountHandler{
    constructor(private amountService:IAmountService){}
    async addAmount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const amount = await this.amountService.addAmount(req.body as Amount);
        res.status(201).json(amount);
    }
    async getAmount(req: Request, res: Response, next: NextFunction): Promise<void>{
        const amount = await this.amountService.getAmount();
        res.status(201).json(amount);
    }
    async getTotalAmount(req: Request, res: Response, next: NextFunction): Promise<void>{
        const amount = await this.amountService.getTotalAmount();
        res.status(201).json(amount);
    }
}