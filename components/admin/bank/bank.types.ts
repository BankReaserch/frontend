
export type Status =
  | "mehudar"
  | "compliant"
  | "conditional"
  | "questionable"
  | "noncompliant"
  | "undetermined";
export type BankType = {
  _id: string;

  name: string;

  type: string;

  location: string;

  status: Status;

  website?: string;

  assets?: string;

  founded?: string;

  lastReviewed?: string;

  publicInfo?: string;

  reportAvailable?: boolean;

  reportUrl?: string;
  summary?:string;

  coverImage?: string;
  hq?: string;
};

