export interface Wallet {
    id: number
    currency: string
    amount: number
    userId: number
}

export interface Transaction {
    id: number
    type: boolean
    created_at: string
    amount: number
    currency: string
    userId: number
}

export interface User {
    id: number
    telegram_id: string
    username: string
    created_at: string
    updated_at: string
    wallets: Wallet[]
    transactions: Transaction[]
}
