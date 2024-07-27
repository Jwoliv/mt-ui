export interface Account {
    id: number
    name: string
}

export interface AccountFullInfo {
    id: number;
    name: number;
    spendMoney: number;
    earnMoney: number;
    currentBalance: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewAccountRequest {
  name: string;
  startBalance: string;
}

export interface AccountFormDto {
  id: number
  name: string
}
