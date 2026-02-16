"use client";

import { useTransactions } from "../context/TransactionContext";
import { ArrowDownLeft, ArrowUpRight, Calendar, Trash2 } from "lucide-react";

export function TransactionList() {
    const { transactions, deleteTransaction } = useTransactions();

    if (transactions.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 text-center">
                <div className="rounded-full bg-secondary p-4 mb-3">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No transactions found</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                    Start by adding your first income or expense using the form.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {transactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${transaction.type === "income"
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                                }`}
                        >
                            {transaction.type === "income" ? (
                                <ArrowDownLeft className="h-6 w-6" />
                            ) : (
                                <ArrowUpRight className="h-6 w-6" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-foreground text-sm sm:text-base">{transaction.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <span className="rounded-full bg-secondary px-2 py-0.5">{transaction.category}</span>
                                <span>•</span>
                                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <p
                            className={`font-bold text-base sm:text-lg ${transaction.type === "income"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-foreground"
                                }`}
                        >
                            {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString('en-IN')}
                        </p>
                        <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-100 text-rose-500 rounded-lg transition-all"
                            title="Delete Transaction"
                            aria-label="Delete transaction"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
