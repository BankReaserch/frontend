"use client";
export type Status =
  | "mehudar"
  | "compliant"
  | "conditional"
  | "questionable"
  | "noncompliant"
  | "undetermined";

export interface Bank {
  id: string;

  name: string;

  type: string;

  hq: string;

  assets: string;

  founded: string;

  status: Status;

  notes: string;

  summary: string;

  website: string;

  reportUrl?: string;

  poskim: string[];
}