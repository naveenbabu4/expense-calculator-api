import mongoose, { mongo } from "mongoose";

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    expenseType: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
},{
    toJSON : {
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret._v;
        }
    }
});

interface ExpenseAttr{
    name : string,
    expenseType : string,
    amount : Number,
    date: Date,
    id: string
}

interface ExpenseDoc extends mongoose.Document{
    name : string,
    expenseType : string,
    amount : Number,
    date: Date,
    id: string
}

interface ExpenseModel extends mongoose.Model<ExpenseDoc>{
    build(expense:ExpenseAttr) : ExpenseDoc;
}

expenseSchema.statics.build = (expense : ExpenseAttr) => {
    return new Expense(expense);
}

const Expense = mongoose.model<ExpenseDoc,ExpenseModel>('expense', expenseSchema);

export {Expense, ExpenseAttr}