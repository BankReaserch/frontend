export type OrderType = {
  _id: string;

  totalAmount: number;

  paymentMethod: string;

  paymentStatus: string;

  status: string;

  createdAt: string;

  items: {
    quantity: number;

    price: number;

    book: {
      _id: string;

      title: string;

      coverImage: string;
    };
  }[];
};

export type DashboardNavItem = {
  label: string;

  href: string;
};