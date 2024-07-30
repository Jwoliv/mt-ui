export interface Account {
    id: number
    name: string
}

export interface AccountFullInfo {
    id: number;
    name: string;
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

export interface AccountUpdateDto {
  name: string;
  balance: number;
}


export interface PageAccountResponse {
  elements: AccountFullInfo[],
  isNextPage: boolean,
  isPrevPage: boolean
}
