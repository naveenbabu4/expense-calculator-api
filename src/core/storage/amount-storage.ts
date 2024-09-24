import { Amount, AmountAttr } from "../models/amount";

export interface IAmountStorage {
    addAmount(amount: AmountAttr): Promise<AmountAttr | null>;
    updateAmount(amount: AmountAttr): Promise<AmountAttr | null>;
    deleteAmount(amount: AmountAttr): Promise<AmountAttr | null>;
    getAmount(): Promise<AmountAttr | null>;
    getTotalAmount(): Promise<AmountAttr | null>
    updateAmountByExpenseId(id: string,amountChange:Number): Promise<AmountAttr | null>;
    deleteAmountByExpenseId(id: string,amountChange:Number): Promise<AmountAttr | null>;

}

export class AmountStorage implements IAmountStorage {
    async getAmount(): Promise<AmountAttr | null> {
        const amount = await Amount.findOne().sort({ _id: -1 });
        return amount;
    }
    async getTotalAmount(): Promise<AmountAttr | null> {
        const amount = await Amount.findOne();
        return amount;
    }
    async updateAmountByExpenseId(id: string,amountChange:Number): Promise<AmountAttr | null> {
        const amount = await Amount.findOne({ expenseId: id }).sort({ _id: -1 });
        if (amount) {
            const latestAmount = await Amount.findOne().sort({ _id: -1 });
            const updateAmount = (latestAmount?.totalAmount as number) - (amountChange as number);
            amount.totalAmount = updateAmount;
        }
        const amountDb = new Amount(amount);
        await amountDb.save();
        return amountDb;
    }
    async deleteAmountByExpenseId(id: string,amountChange:Number): Promise<AmountAttr | null> {
        const amount = await Amount.findOne({ expenseId: id }).sort({ _id: -1 });
        if (amount) {
            const latestAmount = await Amount.findOne().sort({ _id: -1 });
            const updateAmount = (latestAmount?.totalAmount as number) + (amountChange as number);
            amount.totalAmount = updateAmount;
        }
        const amountDb = new Amount(amount);
        await amountDb.save();
        return amountDb;
    }
    async addAmount(amount: AmountAttr): Promise<AmountAttr | null> {
        const amountDb = new Amount(amount);
        amountDb.save();
        return amountDb;
    }
    async updateAmount(amount: AmountAttr): Promise<AmountAttr | null> {
        const latestAmount = await Amount.findOne().sort({ _id: -1 });
        const updateAmount = (latestAmount?.totalAmount as number) - (amount.totalAmount as number);
        amount.totalAmount = updateAmount;
        const amountDb = new Amount(amount);
        await amountDb.save();
        return amountDb;
    }
    async deleteAmount(amount: AmountAttr): Promise<AmountAttr | null> {
        const latestAmount = await Amount.findOne().sort({ _id: -1 });
        const updateAmount = (latestAmount?.totalAmount as number) + (amount.totalAmount as number);
        amount.totalAmount = updateAmount;
        const amountDb = new Amount(amount);
        await amountDb.save();
        return amountDb;
    }
}