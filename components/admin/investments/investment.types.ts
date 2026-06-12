export type Investment = {
  _id?: string;

  name: string;

  provider: string;

  type: string;

  minimumInvestment: string;

  riskLevel:
    | "Low"
    | "Moderate"
    | "High";

  status:
    | "Approved"
    | "Under Review"
    | "Restricted";

  website: string;

  description: string;

  reportUrl?: string;

  createdAt?: string;
  reportAvailable?: boolean;
};