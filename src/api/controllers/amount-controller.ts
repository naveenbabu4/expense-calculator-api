import { AmountStorage, IAmountStorage } from "../../core/storage/amount-storage";
import { AmountSerive, IAmountService } from "../../core/services/amount-service";
import { AmountHandler, IAmountHandler } from "../handlers/amount-handler";
import { asyncErrorMiddleware } from "../middlewares/async-error-middleware";

const amountStorage: IAmountStorage = new AmountStorage();
const amountService: IAmountService = new AmountSerive(amountStorage);
const amountHandler: IAmountHandler = new AmountHandler(amountService);

const addAmount = asyncErrorMiddleware(amountHandler.addAmount.bind(amountHandler));
const getAmount = asyncErrorMiddleware(amountHandler.getAmount.bind(amountHandler));
const getTotalAmount = asyncErrorMiddleware(amountHandler.getTotalAmount.bind(amountHandler));

export{
    addAmount,
    getAmount,
    getTotalAmount
}