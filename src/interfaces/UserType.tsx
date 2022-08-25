import { QuoteType } from "./QuoteType";

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  quotes?: QuoteType[];
}
