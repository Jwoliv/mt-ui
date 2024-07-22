export interface Account {
    id: number
    name: string
}

export interface AccountFullInfo {
    id: number
    name: string
    earnMoney: number
    spendMoney: number
}

export interface NewAccountRequest {
  name: string;
  startBalance: string;
}
