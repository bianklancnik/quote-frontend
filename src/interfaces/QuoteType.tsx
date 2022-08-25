import { VoteType } from "./VoteType";

export interface QuoteType {
  id: string;
  desc: string;
  firstName?: string;
  lastName?: string;
  uid?: string;
  votes: VoteType[];
}
