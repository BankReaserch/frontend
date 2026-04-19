export type NavChild = {
  name: string;
  href?: string;
};

export type NavItem = {
  name: string;
  href?: string;
  children?: NavChild[];
};