export interface Account {
    id: number
    name: string
}

export interface AccountFullInfo {
    id: number
    name: string
    earning: number
    spending: number
}

export interface NewAccountRequest {
  name: string;
  startBalance: string;
}
