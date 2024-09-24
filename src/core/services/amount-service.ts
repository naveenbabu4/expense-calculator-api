import { AmountAttr } from "../models/amount";
import { ServiceError } from "../../errors/service-error";
import { IAmountStorage } from "../storage/amount-storage";

export interface IAmountService{
    addAmount(amount: AmountAttr) : Promise<AmountAttr | null>;
    updateAmount(amount: AmountAttr) : Promise<AmountAttr | null>;
    deleteAmount(amount: AmountAttr) : Promise<AmountAttr | null>;
    getAmount() : Promise<AmountAttr | null>;
    getTotalAmount(): Promise<AmountAttr | null>
}

export class AmountSerive implements IAmountService{
    constructor(private amountStorage: IAmountStorage) { }
    async addAmount(amount: AmountAttr): Promise<AmountAttr | null> {
        if(amount){
            const addAmount = await this.amountStorage.addAmount(amount);
            return addAmount;
        }
        else{
            throw new ServiceError(`can't add amount with ${amount}`);
        }
    }
    async updateAmount(amount: AmountAttr): Promise<AmountAttr | null> {
        if(amount.totalAmount){
            const updateAmount = await this.amountStorage.updateAmount(amount);
            return updateAmount;
        }
        else{
            throw new ServiceError(`can't update amount with ${amount}`);
        }
    }
    async deleteAmount(amount: AmountAttr): Promise<AmountAttr | null> {
        if(amount.totalAmount){
            const deleteAmount = await this.amountStorage.deleteAmount(amount);
            return deleteAmount;
        }
        else{
            throw new ServiceError(`can't delete amount with ${amount}`);
        }
    }
    async getAmount(): Promise<AmountAttr | null> {
        const latestAmount = await this.amountStorage.getAmount();
        if(latestAmount){
            return latestAmount;
        }
        else{
            throw new ServiceError(`No amount found`);
        }
    }
    async getTotalAmount(): Promise<AmountAttr | null> {
        const totalAmount = await this.amountStorage.getTotalAmount();
        if(totalAmount){
            return totalAmount;
        }
        else{
            throw new ServiceError(`No amount found`);
        }
    }
}

