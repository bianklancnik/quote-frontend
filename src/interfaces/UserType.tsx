import { QuoteType } from "./QuoteType";

export interface UserType {
  firstName: string;
  lastName: string;
  quotes: Array<QuoteType>;
}
