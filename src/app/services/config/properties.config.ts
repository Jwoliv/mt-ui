const BASE_URL: string = "http://localhost:9050";
const PREFIX_VERSION: string = "/api/v1"

export const DEFAULT_PAGE_NUMBER: number = 0;
export const DEFAULT_PAGE_SIZE: number = 5;


export function getBasePathUrl(): string {
  return BASE_URL + PREFIX_VERSION;
}
