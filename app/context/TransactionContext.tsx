"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type TransactionType = "income" | "expense";

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, "id">) => void;
    deleteTransaction: (id: string) => void;
    editTransaction: (id: string, updatedTransaction: Omit<Transaction, "id">) => void;
    summary: {
        totalIncome: number;
        totalExpense: number;
        balance: number;
    };
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("expense_manager_transactions");
        if (saved) {
            try {
                setTransactions(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse transactions", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever transactions change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("expense_manager_transactions", JSON.stringify(transactions));
        }
    }, [transactions, isLoaded]);

    const addTransaction = (transaction: Omit<Transaction, "id">) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const editTransaction = (id: string, updatedTransaction: Omit<Transaction, "id">) => {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
        );
    };

    const summary = transactions.reduce(
        (acc, curr) => {
            if (curr.type === "income") {
                acc.totalIncome += curr.amount;
                acc.balance += curr.amount;
            } else {
                acc.totalExpense += curr.amount;
                acc.balance -= curr.amount;
            }
            return acc;
        },
        { totalIncome: 0, totalExpense: 0, balance: 0 }
    );

    return (
        <TransactionContext.Provider
            value={{ transactions, addTransaction, deleteTransaction, editTransaction, summary }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error("useTransactions must be used within a TransactionProvider");
    }
    return context;
}
