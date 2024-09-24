import mongoose from "mongoose";

const amountSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        require: true
    },
    addedAmount: {
        type: Number,
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    expenseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "amount"
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret._v;
        }
    }
})

interface AmountAttr {
    totalAmount: Number,
    addedAmount: Number,
    date: Date,
    expenseId: string | undefined
}

interface AmountDoc extends mongoose.Document {
    totalAmount: Number,
    addedAmount: Number,
    date: Date,
    expenseId: string | undefined
}

interface AmountModel extends mongoose.Model<AmountDoc> {
    build(amount: AmountAttr): AmountDoc;
}

amountSchema.statics.build = (amount: AmountAttr) => {
    return new Amount(amount);
}

const Amount = mongoose.model<AmountDoc, AmountModel>('amount', amountSchema);

export { Amount, AmountAttr }