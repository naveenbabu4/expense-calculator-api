

export interface Expense{
    name : string,
    expenseType : string,
    amount : Number,
    date: Date,
    id: string
}

export interface Amount{
    totalAmount : Number,
    addedAmount : Number,
    date: Date,
    expenseId: string | undefined
}