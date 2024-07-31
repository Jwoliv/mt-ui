import {PageTransactionResponse} from "./transaction.model";

export interface CategoryFormDto {
  id: number
  name: string
}

export interface CategoryDto {
  id: number
  name: string
}

export interface PageCategoryResponse {
  id: number
  name: string
  transactions: PageTransactionResponse
}
